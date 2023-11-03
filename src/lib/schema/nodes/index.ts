import { NodeSpec } from "prosemirror-model";
import OrderedMap from "orderedmap";
import { doc } from "./node-doc";
import { paragraph } from "./node-paragraph";
import tableNodes from "./node-tables";
import { text } from "./node-text";

export type NodeName =
  | "doc"
  | "paragraph"
  | "text"
  | "table"
  | "table_row"
  | "table_cell"
  | "table_header";

export const nodes = OrderedMap.from<NodeSpec>({
  doc,
})
  // paragraph must be first block node
  .append({
    paragraph,
  })
  .append({
    text,
    table: tableNodes.table,
    table_row: tableNodes.table_row,
    table_cell: tableNodes.table_cell,
    table_header: tableNodes.table_header,
  });
