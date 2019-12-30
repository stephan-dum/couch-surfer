import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/heros";

const valid = [
  { "name": "link", "rank": 10, "_id": "link", "series": "zelda", "debut": 1986 },
  { "name": "pikachu", "series": "pokemon", "_id": "pikachu", "rank": 1, "debut": 1996 },
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
      series: {
        "$in" : ["zelda", "pokemon"]
      }
    },
    ...defaultTestSuit,
  },
];

describe("$in", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;