import { Attrs, Node, NodeType, ResolvedPos } from "prosemirror-model";
import {
  CellSelection,
  Rect,
  TableMap,
  tableNodeTypes,
} from "prosemirror-tables";
import { EditorState, NodeSelection, PluginKey } from "prosemirror-state";

import schema from "../schema";

/**
 * @public
 */
export type MutableAttrs = Record<string, unknown>;

/**
 * @public
 */
export interface CellAttrs {
  colspan: number;
  rowspan: number;
  colwidth: number[] | null;
}

/**
 * @public
 */
export const tableEditingKey = new PluginKey<number>("selectingCells");

/**
 * @public
 */
export function cellAround($pos: ResolvedPos): ResolvedPos | null {
  for (let d = $pos.depth - 1; d > 0; d--)
    if ($pos.node(d).type.spec.tableRole == "row")
      return $pos.node(0).resolve($pos.before(d + 1));
  return null;
}

export function cellWrapping($pos: ResolvedPos): null | Node {
  for (let d = $pos.depth; d > 0; d--) {
    // Sometimes the cell can be in the same depth.
    const role = $pos.node(d).type.spec.tableRole;
    if (role === "cell" || role === "header_cell") return $pos.node(d);
  }
  return null;
}

/**
 * @public
 */
export function isInTable(state: EditorState): boolean {
  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--)
    if ($head.node(d).type.spec.tableRole == "row") return true;
  return false;
}

/**
 * @internal
 */
export function selectionCell(state: EditorState): ResolvedPos {
  const sel = state.selection as CellSelection | NodeSelection;
  if ("$anchorCell" in sel && sel.$anchorCell) {
    return sel.$anchorCell.pos > sel.$headCell.pos
      ? sel.$anchorCell
      : sel.$headCell;
  } else if (
    "node" in sel &&
    sel.node &&
    sel.node.type.spec.tableRole == "cell"
  ) {
    return sel.$anchor;
  }
  const $cell = cellAround(sel.$head) || cellNear(sel.$head);
  if ($cell) {
    return $cell;
  }
  throw new RangeError(`No cell found around position ${sel.head}`);
}

function cellNear($pos: ResolvedPos): ResolvedPos | undefined {
  for (
    let after = $pos.nodeAfter, pos = $pos.pos;
    after;
    after = after.firstChild, pos++
  ) {
    const role = after.type.spec.tableRole;
    if (role == "cell" || role == "header_cell") return $pos.doc.resolve(pos);
  }
  for (
    let before = $pos.nodeBefore, pos = $pos.pos;
    before;
    before = before.lastChild, pos--
  ) {
    const role = before.type.spec.tableRole;
    if (role == "cell" || role == "header_cell")
      return $pos.doc.resolve(pos - before.nodeSize);
  }
}

/**
 * @public
 */
export function pointsAtCell($pos: ResolvedPos): boolean {
  return $pos.parent.type.spec.tableRole == "row" && !!$pos.nodeAfter;
}

/**
 * @public
 */
export function moveCellForward($pos: ResolvedPos): ResolvedPos {
  return $pos.node(0).resolve($pos.pos + $pos.nodeAfter!.nodeSize);
}

/**
 * @internal
 */
export function inSameTable($cellA: ResolvedPos, $cellB: ResolvedPos): boolean {
  return (
    $cellA.depth == $cellB.depth &&
    $cellA.pos >= $cellB.start(-1) &&
    $cellA.pos <= $cellB.end(-1)
  );
}

/**
 * @public
 */
export function findCell($pos: ResolvedPos): Rect {
  return TableMap.get($pos.node(-1)).findCell($pos.pos - $pos.start(-1));
}

/**
 * @public
 */
export function colCount($pos: ResolvedPos): number {
  return TableMap.get($pos.node(-1)).colCount($pos.pos - $pos.start(-1));
}

/**
 * @public
 */
export function nextCell(
  $pos: ResolvedPos,
  axis: "horiz" | "vert",
  dir: number
): ResolvedPos | null {
  const table = $pos.node(-1);
  const map = TableMap.get(table);
  const tableStart = $pos.start(-1);

  const moved = map.nextCell($pos.pos - tableStart, axis, dir);
  return moved == null ? null : $pos.node(0).resolve(tableStart + moved);
}

/**
 * @public
 */
export function removeColSpan(attrs: CellAttrs, pos: number, n = 1): CellAttrs {
  const result: CellAttrs = { ...attrs, colspan: attrs.colspan - n };

  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    result.colwidth.splice(pos, n);
    if (!result.colwidth.some((w) => w > 0)) result.colwidth = null;
  }
  return result;
}

/**
 * @public
 */
export function addColSpan(attrs: CellAttrs, pos: number, n = 1): Attrs {
  const result = { ...attrs, colspan: attrs.colspan + n };
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    for (let i = 0; i < n; i++) result.colwidth.splice(pos, 0, 0);
  }
  return result;
}

/**
 * @public
 */
export function columnIsHeader(
  map: TableMap,
  table: Node,
  col: number
): boolean {
  const headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (let row = 0; row < map.height; row++)
    if (table.nodeAt(map.map[col + row * map.width])!.type != headerCell)
      return false;
  return true;
}

interface CreateCellProps {
  content?: Node;
  type: NodeType;
}

function createCell(props: CreateCellProps) {
  const { content, type } = props;

  if (content) {
    return type.createChecked(null, content);
  }

  return type.createAndFill();
}

export interface CreateTableCommand {
  rowsCount?: number;
  columnsCount?: number;
  withHeaderRow?: boolean;
  cellContent?: Node;
}
export interface CreateTableProps extends CreateTableCommand {}

export function createTable(props: CreateTableProps): Node {
  const {
    cellContent,
    columnsCount = 3,
    rowsCount = 3,
    withHeaderRow = true,
  } = props;

  const {
    cell: tableCell,
    header_cell: tableHeaderCell,
    row: tableRow,
    table,
  } = tableNodeTypes(schema);

  const cells: Node[] = [];
  const headerCells: Node[] = [];

  for (let i = 0; i < columnsCount; i++) {
    cells.push(createCell({ type: tableCell, content: cellContent }) as Node);

    if (withHeaderRow) {
      headerCells.push(
        createCell({
          type: tableHeaderCell,
          content: cellContent,
        }) as Node
      );
    }
  }

  const rows: Node[] = [];

  for (let i = 0; i < rowsCount; i++) {
    const rowNodes = withHeaderRow && i === 0 ? headerCells : cells;
    rows.push(tableRow.createChecked(null, rowNodes));
  }

  return table.createChecked(null, rows);
}
