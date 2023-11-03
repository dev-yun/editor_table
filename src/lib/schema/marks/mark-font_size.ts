import { MarkSpec } from "prosemirror-model";

export const font_size: MarkSpec = {
  attrs: {
    size: {},
  },
  parseDOM: [
    {
      style: "font-size",
    },
  ],
  toDOM(mark) {
    const { size } = mark.attrs;
    return ["span", { style: `font-size: ${size}px` }, 0];
  },
};
