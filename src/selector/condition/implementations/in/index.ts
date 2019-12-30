import { ISelectorCondition } from "~/selector/condition/index.d";
import template from "@babel/template";
import createIdentifier from "~/helpers/create-identifier";
import {ArrayExpression, ExpressionStatement } from "@babel/types";

const inTemplate = template(
  `%%list%%.indexOf(%%needle%%) >= 0`
);

/*
  valueObject: Array of JSON values
  returns true if field exist any is in the valueObject provided
*/
const inCondition: ISelectorCondition = (
  t,
  valueObject: ArrayExpression,
  context,
  selectorNamespace
) => {
  const ast = inTemplate({
    list : valueObject,
    needle : createIdentifier(t, selectorNamespace),
  });

  return (ast as ExpressionStatement).expression;
};

export default inCondition;