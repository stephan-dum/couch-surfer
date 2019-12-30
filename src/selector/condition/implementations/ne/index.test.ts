import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/players";

const valid = [
  { name: 'William', _id: 'william', favorites: ['Mario'], age: 23}
];

const defaultTestSuit = {
  execute : [{
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "ne",
    selector : {
      favorites: {
        $allMatch : {
          $ne : "Pokemon"
        }
      }
    },
    ...defaultTestSuit,
  },
];

describe("$ne", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;