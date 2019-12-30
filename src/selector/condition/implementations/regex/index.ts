import { StringLiteral } from "@babel/types";
import { ISelectorCondition } from "~/selector/condition/index.d";

import template from "@babel/template";
import createIdentifier from "~/helpers/create-identifier";

const regexTemplate = template(
  `%%regex%%.test(%%field%%)`
);

const getRawRegExp = /^(?:[(][?]([ims]+)[)])?(.*)/i;

const regexCondition: ISelectorCondition = (
  types,
  valueObject: StringLiteral,
  context,
  selectorNamespace
) => {
  const match = getRawRegExp.exec(valueObject.value);

  const [/*all*/, flags, source] = match;

  return regexTemplate({
    field : createIdentifier(types, selectorNamespace),
    regex : types.regExpLiteral(source, flags),
  });
};

export default regexCondition;