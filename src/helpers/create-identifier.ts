import * as Types from "@babel/types";
import { Identifier, MemberExpression } from "@babel/types";

const createIdentifier = (
  types: typeof Types,
  namespace: string[],
  computed: boolean = false,
  optional: boolean = null
): Identifier | MemberExpression => {
  const ns = namespace.slice();
  const property = ns.pop();

  if(ns.length === 0) {
    return types.identifier(property);
  }

  return types.memberExpression(
    createIdentifier(types, ns, computed, optional),
    types.identifier(property),
    computed,
    optional
  );
};

export default createIdentifier;