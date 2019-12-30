import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/heros";

const valid = [
  { "name": "pikachu", "series": "pokemon", "_id": "pikachu", "rank": 1, "debut": 1996 },
  { "name": "ness", "rank": 9, "_id": "ness", "series": "earthbound", "debut": 1994 },
];

const defaultTestSuit = {
  execute : [{
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "basic",
    selector : {
      debut : {
        "$mod" : [2, 0]
      },
      rank : {
        "$mod" : [2, 1]
      }
    },
    ...defaultTestSuit,
  },
];

describe("$mod", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;