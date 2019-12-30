import createIdentifier from "~/helpers/create-identifier";
import Namespace from "~/selector/namespace";
import { Node, ObjectProperty, Expression } from "@babel/types";
import * as types from "@babel/types";

const getVarname = /^[$](\w+(?:[.]\w+)*)$/;

export default function replaceVarnames(t: typeof types, valueObject: Node): Expression {
  if(valueObject.type === "StringLiteral") {
    const match = getVarname.exec(valueObject.value);

    if(match === null) {
      return valueObject;
    }

    const [ /*all*/, rawNamespace ] = match;

    return createIdentifier(t, new Namespace(rawNamespace));
  }

  if(valueObject.type === "ArrayExpression") {
    valueObject.elements = valueObject.elements.map((element) => {
      return replaceVarnames(t, element);
    });
  }

  if(valueObject.type === "ObjectExpression") {
    valueObject.properties.forEach((property) => {

      /* istanbul ignore else */
      if(property.type === "ObjectProperty") {
        property.value = replaceVarnames(t, property.value);
      }

    });
  }

  return valueObject as Expression;
}