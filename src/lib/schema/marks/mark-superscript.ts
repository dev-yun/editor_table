import { DOMOutputSpec, MarkSpec } from "prosemirror-model";

const superscriptDOM: DOMOutputSpec = ["sup", 0];

export const sup: MarkSpec = {
  parseDOM: [{ tag: "sup" }, { style: "vertical-align=super" }],
  toDOM() {
    return superscriptDOM;
  },
  excludes: "sub",
};
