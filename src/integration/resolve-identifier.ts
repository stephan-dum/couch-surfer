import { Identifier, VariableDeclarator, ObjectExpression } from "@babel/types";
import { IResolveIdentifier, IResolveTypes, NodeTypes } from "./resolve-identifier.d";


const resolveTypes: IResolveTypes = {
  ObjectExpression(objectExpression: ObjectExpression) {
    return objectExpression;
  },
  Identifier(identifier: Identifier, context) {
    const { scope } = context;
    const { name } = identifier;
    const binding = scope.getBinding(name);
    const node = binding.path.node;

    /* istanbul ignore next */
    if(node.type !== "VariableDeclarator") {
      throw new TypeError(`Expected variable declarator got '${ node.type }'!`);
    }

    const init = node.init;

    /* istanbul ignore next */
    if(init.type !== "ObjectExpression") {
      throw new TypeError(`Expected init type to be ObjectExpression, got "${ init.type }"!`);
    }

    //TODO: is this really save, also use process.development flag
    if(binding.references - 1 === 0) {
      binding.path.remove();
    }

    return init;
  }
};

const resolveIdentifier: IResolveIdentifier = (identifier, context) => {
  if(identifier.type in NodeTypes) {
    return resolveTypes[identifier.type as NodeTypes](identifier, context);
  }

  throw new TypeError(`Unknown type ${identifier.type}!`);
};

export default resolveIdentifier;