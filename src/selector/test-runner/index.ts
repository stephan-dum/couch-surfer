import { expect as chaiExpect } from "chai";
import { transform } from "@babel/core";
import PPSelector from "~/integration/index";

import { ITestFunction, ISelectorTestSuite, ISelectorExecutionTest, ISelectorThrowTest } from "./index.d";
import { BabelFileResult } from "@babel/core";

function createWrapperFunction(rawCode: string, args: string[]): ITestFunction {
  const code = `return data.filter(${ rawCode.replace(/;$/, "") });`;
  return new Function("data", ...args, code) as ITestFunction;
}

function prepareTest(testSuite: ISelectorTestSuite): BabelFileResult {
  const { selector, args } = testSuite;
  const rawCode = `
    import ppSelector from "pp-selector";
    const selector = ${ JSON.stringify(selector) };
    
    (doc) => {
      return ppSelector(selector, doc)
    };
  `;

  return transform(rawCode, {plugins: [PPSelector]});
}

function executionTest(testSuite: ISelectorExecutionTest) {
  const { args : wrapperArgs = [], execute } = testSuite;
  const { code } = prepareTest(testSuite);

  expect(code).toMatchSnapshot();

  const fn = createWrapperFunction(code, wrapperArgs);

  execute.forEach((context) => {
    const {
      title : executionTitle = "should work",
      data,
      args = [],
    } = context;

    it(executionTitle, () => {
      if("expected" in context) {
        chaiExpect(
          fn(data, ...args)
        ).to.be.deep.equal(context.expected);
      } else if("throws" in context) {
        chaiExpect(
          fn.bind(null, data, ...args)
        ).to.throw(context.throws);
      } else {
        throw new TypeError("Either 'expected' or 'throws' is required for execution.")
      }
    });
  });
}

function throwTest(testSuite: ISelectorThrowTest) {
  chaiExpect(
    prepareTest.bind(null, testSuite)
  ).to.throw(testSuite.throws);
}

export default (rawTests: ISelectorTestSuite | ISelectorTestSuite[]) => {
  const tests = Array.isArray(rawTests)?rawTests:[rawTests];

  tests.forEach((test) => {
    const { title : fixtureTitle } = test;

    describe(fixtureTitle, () => {
      if("execute" in test) {
        executionTest(test);
      } else if("throws" in test) {
        throwTest(test);
      } else {
        throw new TypeError("Either 'execute' or 'throws' is required for execution.")
      }
    });
  });
};
