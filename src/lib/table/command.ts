import { CreateTableCommand, createTable } from "./util";

import { Command } from "prosemirror-state";

export const createTableCommand =
  (options: CreateTableCommand = {}): Command =>
  (state, dispatch) => {
    if (!state.selection.empty) {
      return false;
    }

    const nodes = createTable({ ...options });

    dispatch?.(state.tr.replaceSelectionWith(nodes).scrollIntoView());
    return true;
  };

export const createTables = createTableCommand({
  rowsCount: 2,
  columnsCount: 2,
});
