import { MarkSpec } from "prosemirror-model";
import { alignment } from "./mark-alignment";
import { background_color } from "./mark-background_color";
import { bold } from "./mark-bold";
import { em } from "./mark-em";
import { font_color } from "./mark-font_color";
import { font_size } from "./mark-font_size";
import { link } from "./mark-link";
import { s } from "./mark-s";
import { sub } from "./mark-subscript";
import { sup } from "./mark-superscript";
import { u } from "./mark-underline";
import { custom_strong } from "./mark-custom_strong";

export type MarkName =
  | "link"
  | "em"
  | "s"
  | "bold"
  | "u"
  | "font_size"
  | "font_color"
  | "background_color"
  | "sub"
  | "sup"
  | "custom_strong";

// :: Object
// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const marks: { [name in MarkName]: MarkSpec } = {
  font_color,
  font_size,
  link,
  em,
  s,
  bold,
  u,
  background_color,
  sub,
  sup,
  custom_strong,
};
