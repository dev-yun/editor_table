import { DOMOutputSpec, MarkSpec } from "prosemirror-model";

const sDOM: DOMOutputSpec = ["s", 0];

export const s: MarkSpec = {
  parseDOM: [
    { tag: "s" },
    { tag: "strike" },
    { style: "text-decoration: line-through" },
  ],
  toDOM() {
    return sDOM;
  },
};
