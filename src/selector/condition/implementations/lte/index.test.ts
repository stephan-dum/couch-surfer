import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/players";

const valid = [
  { name: 'James', _id: 'james',  favorites: ['Mario', 'Pokemon'], age: 20 },
];

const defaultTestSuit = {
  args : ["age"],
  execute : [{
    args: [20],
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "lte",
    selector : {
      age: {
        "$lte" : "$age"
      }
    },
    ...defaultTestSuit,
  },
];

describe("lte", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;