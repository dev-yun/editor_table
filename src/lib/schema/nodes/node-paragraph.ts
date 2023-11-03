import { NodeSpec } from "prosemirror-model";

export const paragraph = {
  content: "inline*",
  group: "block",
  marks:
    "link em s bold u font_size font_color background_color sub sup custom_strong",
  parseDOM: [
    {
      tag: "p",
    },
  ],
  toDOM() {
    return ["p", 0];
  },
} as NodeSpec;
