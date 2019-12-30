import { ObjectExpression } from "@babel/types";
import { ISelectorCondition } from "~/selector/condition/index.d"
import arrayMatch from "../../array-match";

/*Matches and returns all documents that contain an array field with all its elements matching all the specified query criteria.*/
const allMatchCondition: ISelectorCondition = (types, valueObject: ObjectExpression, context, selectorNamespace) => {
  return arrayMatch(types, valueObject, context, selectorNamespace, "every");
};

export default allMatchCondition;