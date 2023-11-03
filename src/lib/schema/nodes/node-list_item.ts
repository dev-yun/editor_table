import { DOMOutputSpec, NodeSpec } from "prosemirror-model";

const liDom: DOMOutputSpec = ["li", 0];

export const list_item: NodeSpec = {
  content: "paragraph (ordered_list | bullet_list)*",
  defining: true,
  parseDOM: [{ tag: "li" }],
  toDOM() {
    return liDom;
  },
};
