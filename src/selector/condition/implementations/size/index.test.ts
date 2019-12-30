import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data, { kerby } from "~/selector/test-runner/data/hero-abilities";

const defaultTestSuit = {
  execute : [{
    data,
    expected: [ kerby ],
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "size",
    selector : {
      eats: {
        $size : 1
      }
    },
    ...defaultTestSuit,
  },
];

describe("$size", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;