import { Expression } from "@babel/types";
import { ISelectorCondition } from "~/selector/condition/index.d";
import inExpression from "../in";

const ninCondition: ISelectorCondition = (
  types,
  valueObject,
  context,
  selectorNamespace
) => types.unaryExpression(
  "!",
  inExpression(types, valueObject, context, selectorNamespace) as Expression
);

export default ninCondition;