import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data, { peach, mario } from "~/selector/test-runner/data/hero-abilities";


const defaultTestSuit = {
  execute : [{
    data,
    expected: [ peach, mario ],
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "type",
    selector : {
      wears: {
        $type : "array"
      }
    },
    ...defaultTestSuit,
  },
];

describe("type", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;