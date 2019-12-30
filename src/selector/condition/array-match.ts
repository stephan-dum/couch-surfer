import * as Types from "@babel/types";
import { ExpressionStatement, Expression, ObjectExpression } from "@babel/types";
import Namespace from "~/selector/namespace";
import createIdentifier from "~/helpers/create-identifier";
import createSelector from "~/selector";
import { ISelectorContext } from "~/selector/index.d";
import { ISelectorNamespace } from "~/selector/namespace.d";
import template from "@babel/template";

export type IIteratorType = "some" | "every";

const matchTemplate = template(`
  %%array%% && %%array%%[%%iterationType%%]((%%id%%) => %%selector%%)
`);

export default (
  types: typeof Types,
  valueObject: ObjectExpression,
  context: ISelectorContext,
  selectorNamespace: ISelectorNamespace,
  iterationType: IIteratorType
): Expression => {
  const id = context.scope.generateUid("data");

  const selector = createSelector(
    valueObject,
    context,
    new Namespace(id)
  );

  const ast = matchTemplate({
    array : createIdentifier(types, selectorNamespace),
    iterationType : types.stringLiteral(iterationType),
    id : createIdentifier(types, [id]),
    selector
  });

  return (ast as ExpressionStatement).expression;
};