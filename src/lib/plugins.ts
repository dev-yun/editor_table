import { columnResizing, tableEditing } from "prosemirror-tables";

import { Plugin } from "prosemirror-state";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";

interface OptionsType {
  className?: string;
}

/// real-world situations.
export default function setupPlugins(options: OptionsType) {
  let plugins = [dropCursor(), gapCursor(), columnResizing(), tableEditing()];

  return plugins.concat(
    new Plugin({
      props: {
        attributes: {
          class: options.className ? options.className : "ProseMirror-Editor",
        },
      },
    })
  );
}
