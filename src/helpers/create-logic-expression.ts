import * as Types from "@babel/types";
import { Expression, LogicalExpression } from "@babel/types";

export type IOperator = "||" | "&&" | "??";

export default (types: typeof Types, expressions: Expression[], operator: IOperator): Expression | LogicalExpression => {
  let left = expressions[0];

  for(let i = 1; i < expressions.length; i++) {
    left = types.logicalExpression(operator, left, expressions[i]);
  }

  return left;
};
