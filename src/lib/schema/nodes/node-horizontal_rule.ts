import { NodeSpec, DOMOutputSpec } from "prosemirror-model";

const hrDOM: DOMOutputSpec = ["hr"];

export const horizontal_rule = {
  group: "block",
  parseDOM: [{ tag: "hr" }],
  toDOM() {
    return hrDOM;
  },
} as NodeSpec;
