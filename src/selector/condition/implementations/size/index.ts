import { ISelectorCondition } from "~/selector/condition/index.d";
import { NumericLiteral } from "@babel/types";

import template from "@babel/template";
import createIdentifier from "~/helpers/create-identifier";

const sizeTemplate = template(
  `%%field%%.length === %%size%%`
);

const sizeCondition: ISelectorCondition = (
  types,
  valueObject: NumericLiteral,
  context,
  selectorNamespace
) => sizeTemplate({
  field : createIdentifier(types, selectorNamespace),
  size : valueObject,
});

export default sizeCondition;