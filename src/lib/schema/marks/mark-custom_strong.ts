import { MarkSpec } from "prosemirror-model";

export const custom_strong: MarkSpec = {
  attrs: {
    color: {},
    textDecoration: {},
    fontWeight: {},
  },
  parseDOM: [
    {
      tag: "custom",
      getAttrs: (node: HTMLElement) => {
        return {
          color: node.style.color,
          textDecoration: node.style.textDecoration,
          fontWeight: node.style.fontWeight,
        };
      },
    },
  ],
  toDOM(mark) {
    const { color, textDecoration, fontWeight } = mark.attrs;
    return [
      "custom",
      {
        style: `color: ${color}; text-decoration: ${textDecoration}; font-weight: ${fontWeight}`,
      },
      0,
    ];
  },
  excludes: "u bold font_color",
} as MarkSpec;
