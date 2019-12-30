import { ISelectorNamespace, RawSegments } from "./namespace.d";

export default class Namespace extends Array implements ISelectorNamespace {
  constructor(rawSegments: RawSegments) {
    const splitSegments = (Array.isArray(rawSegments)?rawSegments:[rawSegments]).map(
        (segment) => segment.split(".")
    );


    //TODO: ts support for super(...segments.flat())
    const segments = [].concat(...splitSegments);

    super(...segments);
  }

  static get [Symbol.species]() { return Array; }

  descend(rawSegments: string) {
    return new Namespace(
      [].concat(...this, rawSegments)
    );
  }
}