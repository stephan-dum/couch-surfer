import * as types from "@babel/types";
import { Node } from "@babel/types";
import { Scope } from "@babel/traverse";
import { Expression, LogicalExpression, ObjectExpression } from "@babel/types";
import { ISelectorNamespace } from "~/selector/namespace.d";
import { ISelectorCondition } from "~/selector/condition/index.d";

export interface ISelectorContext {
  types: typeof types;
  scope: Scope;
}

export type SelectorValue = string | number | boolean | null | ISelector;

export type ISelector = ({
  //TODO: research a better way for partial index
  [index: string]: SelectorValue | any;
  $and?: ISelector[];
  $or?: ISelector[];
  $all?: any[];
});


export interface IConditions {
  [index: string]: ISelectorCondition;
}

type ICreateSelector = (
  node: ObjectExpression,
  context: ISelectorContext,
  namespace: ISelectorNamespace
) => Expression | LogicalExpression;

export default ICreateSelector;
