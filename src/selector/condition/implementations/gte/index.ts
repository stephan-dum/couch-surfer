import { Expression } from "@babel/types";
import { ISelectorCondition } from "~/selector/condition/index.d";
import createIdentifier from "~/helpers/create-identifier";

const gteCondition: ISelectorCondition = (
  types,
  valueObject: Expression,
  context,
  selectorNamespace
) => types.binaryExpression(
  ">=",
  createIdentifier(types, selectorNamespace),
  valueObject
);

export default gteCondition;