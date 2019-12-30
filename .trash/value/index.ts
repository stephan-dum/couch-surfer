import selector from "../../src/selector/index";
import ICreateSelectorValue from "./index.d";
import { ObjectExpression, Identifier } from "@babel/types";

const selectorValue: ICreateSelectorValue = (valueObject, context, selectorNamespace) => {
  const { scope } = context;
  const { bindings } = scope;
  const { type } = valueObject;

  switch(type) {
    case "ObjectExpression":
      return selector(
        valueObject as ObjectExpression,
        context,
        selectorNamespace
      );
    case "Identifier":
      const binding = scope.getBinding((valueObject as Identifier).name);

      /* istanbul ignore next */
      if(!binding) {
        return; //TODO: could throw ReferenceError
      }

      const node = binding.path.node;

      if(node.type === "VariableDeclarator") {
        /* istanbul ignore else*/
        if(binding.references - 1 === 0) {
          binding.path.parentPath.remove();
        }

        return selectorValue(node.init, context, selectorNamespace);
      }

      /* istanbul ignore next */
      throw new ReferenceError(`Unknown selector value type!`);
    default:
      return valueObject;
  }
};

export default selectorValue;
