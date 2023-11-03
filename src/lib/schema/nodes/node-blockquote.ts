import { NodeSpec } from "prosemirror-model";

export const blockquote = {
  content: "block+",
  group: "block",
  defining: true,
  parseDOM: [{ tag: "blockquote" }],
  toDOM(node) {
    return ["blockquote", 0];
  },
} as NodeSpec;
