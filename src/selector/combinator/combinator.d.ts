import * as types from "@babel/types";
import { IOperator } from "~/helpers/create-logic-expression";

export enum ICombinatorType {
  or = "or",
  and = "and"
}

export type ICombinatorResolve = Map<ICombinatorType, IOperator>;

export type ICombinator = {
  create: (t: typeof types) => any;
} & {
  [key in ICombinatorType]?: any[];
};
