import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/players";

const valid = [
  { name: 'William', _id: 'william', favorites: ['Mario'], age: 23}
];

const defaultTestSuit = {
  args : ["age"],
  execute : [{
    args: [23],
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "basic",
    selector : {
      age: {
        "$gte" : "$age"
      }
    },
    ...defaultTestSuit,
  },
];

describe("gte", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;