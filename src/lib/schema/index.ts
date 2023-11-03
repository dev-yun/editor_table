import { MarkName, marks } from "./marks";
import { NodeName, nodes } from "./nodes";

import { Schema as BaseSchema } from "prosemirror-model";

const schema = new BaseSchema<NodeName, MarkName>({ nodes, marks });
export default schema;

export type Schema = typeof schema;
