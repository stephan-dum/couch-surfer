import { ArrayExpression, ObjectExpression } from "@babel/types";
import { ISelectorCondition } from "~/selector/condition/index.d";
import createLogicalExpression from "~/helpers/create-logic-expression";
import createSelector from "~/selector";

const norCondition: ISelectorCondition = (
  types,
  valueObject: ArrayExpression,
  context,
  selectorNamespace
) => {
  const or = createLogicalExpression(
    types,
    valueObject.elements.map(
      (rawSelector) => {
        const selector = createSelector(
          rawSelector as ObjectExpression,
          context,
          selectorNamespace
        );

        return selector;
      }
    ),
    "||"
  );

  return types.unaryExpression("!", or);
};

export default norCondition;