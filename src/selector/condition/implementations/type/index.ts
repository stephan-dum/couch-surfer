import { StringLiteral } from "@babel/types";
import template from "@babel/template";

import { ISelectorCondition } from "~/selector/condition/index.d";
import createIdentifier from "~/helpers/create-identifier";

const typeTemplate = template(
  `Object.prototype.toString.call(%%toCheck%%).toLowerCase() === %%expected%%`
);

export type IAllowedTypes = "null" | "boolean" | "number" | "string" | "array" | "object";

const typeCondition: ISelectorCondition = (
  types,
  valueObject: StringLiteral,
  context,
  selectorNamespace
) => typeTemplate({
  toCheck : createIdentifier(types, selectorNamespace),
  expected : types.stringLiteral(
    `[object ${valueObject.value.toLowerCase()}]`
  )
});

export default typeCondition;