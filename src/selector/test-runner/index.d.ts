import { ISelector } from "~/selector/index.d"

interface IThrows {
  throws: string;
}

type IExecute = (
  {
    title?: string;
    args?: any[];
    data: any[];
  }
  & (
    { expected: any[]; }
    | IThrows
  )
);

interface ISelectorTestSuiteBasic {
  title: string;
  selector: ISelector;
  args?: string[];
}

interface IExecuteSuite {
  execute: IExecute[];
}

export type ISelectorTestSuite = (
  ISelectorTestSuiteBasic
  & (
    IExecuteSuite
    | IThrows
  )
);

export type ISelectorExecutionTest = ISelectorTestSuiteBasic & IExecuteSuite;

export type ISelectorThrowTest = ISelectorTestSuiteBasic & IThrows;

export type ITestFunction = (data: any, ...args: any) => void;
