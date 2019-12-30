import executeSuite from "~/selector/test-runner";
import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import data from "~/selector/test-runner/data/heros";

const valid = [
  { "name": "pikachu", "series": "pokemon", "_id": "pikachu", "rank": 1, "debut": 1996 },
  { "name": "captain falcon", "_id": "falcon", "rank": 4, "series": "f-zero", "debut": 1990 },
  { "name": "yoshi", "_id": "yoshi", "rank": 6, "series": "mario", "debut": 1990 },
];

const defaultTestSuit = {
  args : ["series", "debut"],
  execute : [{
    args: ["pokemon", 1990],
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "half explicit or",
    selector : {
      debut: "$debut",
      "$or": [{
        series: "$series",
      }],
    },
    ...defaultTestSuit,
  },
  {
    title : "explicit or",
    selector : {
      "$or" : [
        { debut : "$debut" },
        { series : "$series" },
      ]
    },
    ...defaultTestSuit,
  }
];

describe("or", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;
