import executeSuite from "~/selector/test-runner";
import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import data from "~/selector/test-runner/data/heros";

const valid = [
  { "name": "yoshi", "_id": "yoshi", "rank": 6, "series": "mario", "debut": 1990 },
];

const defaultTestSuit = {
  args : ["series", "debut"],
  execute : [{
    args: ["mario", 1990],
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "implicit and",
    selector : {
      series : "$series",
      debut : "$debut"
    },
    ...defaultTestSuit,
  },
  {
    title : "half explicit and",
    selector : {
      debut: "$debut",
      "$and": [{
        series: "$series",
      }],
    },
    ...defaultTestSuit,
  },
  {
    title : "explicit and",
    selector : {
      "$and" : [{
        debut : "$debut",
        series : "$series",
      }]
    },
    ...defaultTestSuit,
  },
  {
    title : "throws type error",
    selector : {
      debut : "$debut",
      "$and" : {
        //@ts-ignore we know it is incorrect ;)
        series : "$series",
      }
    },
    throws : "Expected and to be of type array!",
  }
];

describe("and", () => {
  executeSuite(testSuiteCollection)
});


export default testSuiteCollection;
