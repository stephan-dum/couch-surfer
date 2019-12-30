import { ISelectorCondition } from "~/selector/condition/index.d";
import template from "@babel/template";
import createIdentifier from "~/helpers/create-identifier";
import { Expression } from "@babel/types";

const eqCondition: ISelectorCondition = (
  types,
  valueObject: Expression,
  context,
  selectorNamespace
) => types.binaryExpression(
  "===",
  createIdentifier(types, selectorNamespace),
  valueObject
);

export default eqCondition;