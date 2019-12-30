import { Node } from "@babel/types";
import { ISelectorContext } from "~/selector/index.d";

export default (data: Node, context: ISelectorContext): string => {
  const { types : t } = context;

  switch(data.type) {
    case "Identifier":
      return data.name;
    case "ObjectExpression":
    case "ArrayExpression":
      const dataName = context.scope.generateUid();

      context.scope.push({ id : t.identifier(dataName), init: data, kind : "const" });

      return dataName;
    default:
      throw new TypeError(`Data type '${ data.type }' unknown!`);
  }
};
