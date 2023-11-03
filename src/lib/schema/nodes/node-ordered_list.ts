import { DOMOutputSpec, NodeSpec } from "prosemirror-model";

const olDOM: DOMOutputSpec = ["ol", 0];

export const ordered_list = {
  attrs: { order: { default: 1 } },
  content: "list_item+",
  group: "block list",
  parseDOM: [
    {
      tag: "ol",
      getAttrs(dom: HTMLElement) {
        return {
          order: +(dom.getAttribute("start") ?? 1),
        };
      },
    },
  ],
  toDOM(node) {
    return node.attrs.order == 1
      ? olDOM
      : ["ol", { start: node.attrs.order }, 0];
  },
} as NodeSpec;
