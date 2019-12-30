import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/heros";

const valid = [
  { "name": "jigglypuff", "_id": "puff", "rank": 8, "debut": 1996, "retired": true },
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
      $not : {
        series : "mario",
      },
      $and : [{
        $not : {
          debut : {
            $lt : 1996
          }
        }
      }]

    },
    ...defaultTestSuit,
  },
];

describe("$not", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;