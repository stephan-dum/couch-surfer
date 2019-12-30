import {ArrayExpression, ExpressionStatement} from "@babel/types";
import { ISelectorCondition } from "~/selector/condition/index.d";

import template from "@babel/template";
import createIdentifier from "~/helpers/create-identifier";

const modTemplate = template(
  `%%field%% % %%divisor%% === %%remainder%%`
);

const modCondition: ISelectorCondition = (
  types,
  valueObject: ArrayExpression,
  context,
  selectorNamespace
) => {
  const [ divisor, remainder ] = valueObject.elements;

  const ast = modTemplate({
    field : createIdentifier(types, selectorNamespace),
    divisor,
    remainder,
  });

  return (ast as ExpressionStatement).expression;
};

export default modCondition;