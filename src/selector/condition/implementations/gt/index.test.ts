import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/players";

const valid = [
  { name: 'William', _id: 'william', favorites: ['Mario'], age: 23}
];

const defaultTestSuit = {
  args : ["age"],
  execute : [{
    args: [22],
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "gt",
    selector : {
      age: {
        "$gt" : "$age"
      }
    },
    ...defaultTestSuit,
  },
];

describe("gt", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;