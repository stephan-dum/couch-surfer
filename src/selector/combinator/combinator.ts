import * as types from '@babel/types';
import { ICombinator, ICombinatorResolve, ICombinatorType } from "./combinator.d";

import createLogicalExpression, { IOperator } from "~/helpers/create-logic-expression";

const resolve: ICombinatorResolve = new Map([
  [ICombinatorType.or, "||"],
  [ICombinatorType.and, "&&"],
]);

const keys = Array.from(resolve.keys()) as ICombinatorType[];
const order = Array.from(resolve.entries()).reverse() as [ICombinatorType, IOperator][];
const tail = order.pop();
const [ tailKey, tailValue ] = tail;

export default class implements ICombinator {
  public or: any[];
  public and: any[];

  constructor() {
    keys.forEach((key) => {
      this[key] = [];
    });
  }

  //will push always to the next level to allow binding power
  public create(t: typeof types): any {
    order.forEach(([key, value], i, array) => {
      const next = (array[i + 1] || tail);
      const [ nextKey ] = next;

      if(this[key].length) {
        this[nextKey].push(
          createLogicalExpression(t, this[key], value)
        );
      }
    });

    return createLogicalExpression(t, this[tailKey], tailValue);
  }
}
