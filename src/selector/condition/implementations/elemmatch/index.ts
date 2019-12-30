import { ObjectExpression } from "@babel/types";
import arrayMatch from "../../array-match";

import { ISelectorCondition } from "~/selector/condition/index.d";

const elemMatchCondition: ISelectorCondition = (t, valueObject: ObjectExpression, context, selectorNamespace) => {
  return arrayMatch(t, valueObject, context, selectorNamespace, "some");
};

export default elemMatchCondition;