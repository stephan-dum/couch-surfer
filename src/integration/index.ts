import { Identifier, ImportDeclaration } from "@babel/types";
import selector from "~/selector/index";
import resolveIdentifier from "~/integration/resolve-identifier";
import Namespace from "~/selector/namespace";
import moveJSONDeclaration from "~/integration/move-json-declaration";
import { PluginObj } from "@babel/core";

import { ISelectorContext } from "~/selector/index.d";
import * as types from "@babel/types";

const isPPImport = /^pp-selector/;

export const PLUGIN_NAME = "pp-selector";

export default (): PluginObj => {
  return {
    name: PLUGIN_NAME,
    visitor: {
      CallExpression(path) {
        const { node, scope, parentPath } = path;
        const { bindings } = scope;

        //get the name of the called function
        //TODO: check if its really there otherwise throw error
        const { callee } = node;
        const { name : calleeName } = callee as Identifier;


        const binding = scope.getBinding(calleeName);

        /* istanbul ignore next */
        if(!binding) {
          return; //TODO: could throw ReferenceError
        }

        /* istanbul ignore next */
        if(binding.kind !== "module") {
          return;
        }
        //TODO: check if its really an import declaration

        const parent = binding.path.parent as ImportDeclaration;

        const {
          source : { value : uri }
        } = parent;

        //check if uri matches ^pp-selector
        /* istanbul ignore next */
        if(!isPPImport.test(uri)) {
          return;
        }

        //remove import if unused now
        /* istanbul ignore else*/
        if(binding.references - 1 === 0) {
          binding.path.parentPath.remove();
        }

        const [ rawSelector, data ] = node.arguments;

        const context: ISelectorContext = {
          types,
          scope : path.scope,
        };

        const dataDeclaration = moveJSONDeclaration(data, context);

        const resultNode = selector(
          resolveIdentifier(rawSelector, context),
          context,
          new Namespace(dataDeclaration)
        );

        if(resultNode) {
          path.replaceWith(resultNode);
        } else {
          path.remove();
        }
      },
    }
  };
};