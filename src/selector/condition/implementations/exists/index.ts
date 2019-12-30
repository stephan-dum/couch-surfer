import { Expression } from "@babel/types";
import { ISelectorCondition } from "~/selector/condition/index.d";
import createIdentifier from "~/helpers/create-identifier";
import { template } from "@babel/core";

const existTemplate = template(`
  (%%key%% in %%object%%) === %%expected%%
`);

const existsCondition: ISelectorCondition = (
  types,
  valueObject: Expression,
  context,
  selectorNamespace
) => {
  // types.binaryExpression(
  //   "in",
  //   valueObject,
  //   createIdentifier(types, selectorNamespace)
  // );

  const ns = selectorNamespace.slice();

  return existTemplate({
    key : types.stringLiteral(ns.pop()),
    object : createIdentifier(types, ns),
    expected : valueObject,
  })

};

export default existsCondition;