export type RawSegments = string[] | string;

export class ISelectorNamespace extends Array {
  constructor(rawSegments: RawSegments);
  public descend(rawSegments: string): ISelectorNamespace;
}