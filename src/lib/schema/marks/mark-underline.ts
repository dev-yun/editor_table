import { DOMOutputSpec, MarkSpec } from "prosemirror-model";

export const u = {
  attrs: {
    textDecoration: {},
  },
  parseDOM: [
    {
      tag: "u",
      getAttrs: (node: HTMLElement) => {
        return {
          textDecoration: node.style.textDecoration,
        };
      },
    },
    {
      style: "text-decoration",
      getAttrs: (value: string) => {
        if (value === "underline") {
          return {
            textDecoration: value,
          };
        }
        return false;
      },
    },
  ],
  toDOM(mark) {
    const { textDecoration } = mark.attrs;
    return ["u", { style: `text-decoration: ${textDecoration}` }, 0];
  },
} as MarkSpec;
