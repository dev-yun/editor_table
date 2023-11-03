import { DOMOutputSpec, MarkSpec } from "prosemirror-model";

export const bold = {
  attrs: {
    fontWeight: {},
  },
  parseDOM: [
    {
      tag: "strong",
      getAttrs: (node: HTMLElement) => {
        if (node.style.fontWeight != "normal") {
          return { fontWeight: node.style.fontWeight };
        }
        return false;
      },
    },
    {
      tag: "b",
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      getAttrs: (node: HTMLElement) => {
        if (node.style.fontWeight != "normal") {
          return { fontWeight: node.style.fontWeight };
        }
        return false;
      },
    },
    {
      style: "font-weight",
      getAttrs: (value: string) => {
        if (/^(bold(er)?|[5-9]\d{2,})$/.test(value)) {
          return { fontWeight: value };
        }
        return false;
      },
    },
  ],
  toDOM(mark) {
    const { fontWeight } = mark.attrs;
    return ["strong", { style: `font-weight: ${fontWeight}` }, 0];
  },
} as MarkSpec;
