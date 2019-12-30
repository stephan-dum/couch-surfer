import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/players";

const valid = [
  { name: 'James', _id: 'james',  favorites: ['Mario', 'Pokemon'], age: 20},
  { name: 'William', _id: 'william', favorites: ['Mario'], age: 23}
];

const defaultTestSuit = {
  args : ["series"],
  execute : [{
    args: [["Mario"]],
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "all",
    selector : {
      favorites: {
        $all: "$series"
      }
    },
    ...defaultTestSuit,
  },
];

describe("$all", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;