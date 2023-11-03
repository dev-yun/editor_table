import { DOMOutputSpec, NodeSpec } from "prosemirror-model";

const ulDOM: DOMOutputSpec = ["ul", 0];

export const bullet_list = {
  content: "list_item+",
  group: "block list",
  parseDOM: [{ tag: "ul" }],
  toDOM: () => {
    return ulDOM;
  },
} as NodeSpec;
