import { ObjectExpression } from "@babel/types";
import { ISelectorCondition } from "~/selector/condition/index.d";
import index from "~/selector/index";

const notCondition: ISelectorCondition = (
  types,
  valueObject: ObjectExpression,
  context,
  selectorNamespace
) => types.unaryExpression(
  "!",
  index(valueObject, context, selectorNamespace)
);

export default notCondition;