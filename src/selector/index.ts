import Combinator from "~/selector/combinator/combinator";
import { ICombinatorType } from "~/selector/combinator/combinator.d";
import { ObjectProperty, ObjectExpression, Expression } from "@babel/types";
import iCreateSelector from "./index.d";
import conditions from "./condition";
import replaceVarnames from "~/helpers/replace-varnames";

const isCommand = /^\$/;

const selector: iCreateSelector = (objectAST, context, selectorNamespace) => {
  const { types } = context;

  const combinator = new Combinator();
  const and = combinator.and;

  objectAST.properties.forEach((property) => {
    //TODO: test for types like "objectProperty" + spreadElement
    const { key, value : valueObject } = property as ObjectProperty;

    const propertyName = key.name || key.value;

    if(isCommand.test(propertyName)) {
      const plainKey = propertyName.slice(1).toLowerCase();

      if(plainKey in combinator) {
        if(valueObject.type !== "ArrayExpression") {
          throw new TypeError(`Expected ${ plainKey } to be of type array!`)
        }

        combinator[plainKey as ICombinatorType].push(
          ...valueObject.elements.map(
            (element) => selector(element as ObjectExpression, context, selectorNamespace)
          )
        );

      }
      else if(plainKey in conditions) {
        and.push(
          conditions[plainKey](
            types,
            replaceVarnames(types, valueObject),
            context,
            selectorNamespace
          )
        )
      }
      else {
        throw new ReferenceError(`Could not find ${ plainKey }!`);
      }
    }
    else {
      //add key.name to namespace of data
      const namespace = selectorNamespace.descend(propertyName);

      if(valueObject.type === "ObjectExpression") {
        //dig deeper
        and.push(
          selector(valueObject, context, namespace)
        )
      } else {
        //implicit and
        and.push(
          //implicit equal
          conditions.eq(
            types,
            replaceVarnames(types, valueObject),
            context,
            namespace
          )
        );
      }
    }

  });

  return combinator.create(types);
};

export default selector;