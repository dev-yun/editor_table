import { DOMOutputSpec, MarkSpec } from "prosemirror-model";

const subscriptDOM: DOMOutputSpec = ["sub", 0];

export const sub: MarkSpec = {
  parseDOM: [{ tag: "sub" }, { style: "vertical-align=sub" }],
  toDOM() {
    return subscriptDOM;
  },
  excludes: "sup",
};
