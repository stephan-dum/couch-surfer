import { Node } from "@babel/types";
import { ISelectorNamespace } from "../../src/selector/namespace";
import { ISelectorContext } from "../../src/selector";

type ICreateSelectorValue = (
  node: Node,
  context: ISelectorContext,
  namespace: ISelectorNamespace
) => Node;

export default ICreateSelectorValue;