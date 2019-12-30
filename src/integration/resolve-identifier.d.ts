import { Node, ObjectExpression } from "@babel/types";
import { ISelectorContext } from "~/selector/index.d";

export enum NodeTypes {
  ObjectExpression = "ObjectExpression",
  Identifier = "Identifier"
}

export type IResolveTypes = {
  [prop in NodeTypes]: (identifier: Node, context: ISelectorContext) => ObjectExpression;
}

export type IResolveIdentifier = (
  identifier: Node,
  context: ISelectorContext
) => ObjectExpression;

export default IResolveIdentifier;