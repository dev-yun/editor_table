import { NodeSpec } from "prosemirror-model";

function makeGetAttrs(level: number) {
  return () => ({ level });
}

export const heading = {
  attrs: {
    level: { default: 1 },
  },
  content: "inline*",
  group: "block",
  marks: "em sub sup",
  defining: true,
  parseDOM: [
    { tag: "h1", getAttrs: makeGetAttrs(1) },
    { tag: "h2", getAttrs: makeGetAttrs(2) },
    { tag: "h3", getAttrs: makeGetAttrs(3) },
    { tag: "h4", getAttrs: makeGetAttrs(4) },
    { tag: "h5", getAttrs: makeGetAttrs(5) },
    { tag: "h6", getAttrs: makeGetAttrs(6) },
  ],
  toDOM(node) {
    const h = "h" + node.attrs.level;
    return [h, 0];
  },
} as NodeSpec;
