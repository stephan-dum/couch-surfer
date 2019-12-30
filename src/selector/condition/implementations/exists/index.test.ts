import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/heros";

const valid = [
  { "name": "jigglypuff", "_id": "puff", "rank": 8, "debut": 1996, "retired" : true },
];

const defaultTestSuit = {
  execute : [{
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "exists",
    selector : {
      retired: {
        $exists : true,
      }
    },
    ...defaultTestSuit,
  },
];

describe("exists", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;