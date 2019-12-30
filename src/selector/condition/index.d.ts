import * as Types from "@babel/types";
import { Node } from "@babel/types";
import { ISelectorNamespace } from "~/selector/namespace.d";
import { ISelectorContext } from "~/selector/index.d";

export type ISelectorCondition = (
  types: typeof Types,
  node: Node,
  context: ISelectorContext,
  namespace: ISelectorNamespace
) => Node | Node[];

export interface ISelectorConditions {
  [index: string]: ISelectorCondition;
}