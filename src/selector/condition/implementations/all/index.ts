import template from "@babel/template";
import { ISelectorCondition } from "~/selector/condition/index.d";
import createIdentifier from "~/helpers/create-identifier";
import { ExpressionStatement } from "@babel/types";

const allTemplate = template(
  `%%data%% && %%required%%.every((value) => %%data%%.indexOf(value) >= 0)`
);

/* Matches an array value if it contains all the elements of the argument array. */
const allCondition: ISelectorCondition = (
  t,
  valueObject,
  context,
  selectorNamespace
) => {
  const ast = allTemplate({
    required : valueObject,
    data : createIdentifier(t, selectorNamespace),
  });

  return (ast as ExpressionStatement).expression;
};

export default allCondition;