import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/hero-abilities";

const valid = [
  {
    hero : "mario",
    wears : [
      {
        name : "red shirt",
        defense: 2,
      },
      {
        name : "blue pants",
        defense: 2,
      }
    ],
    eats : ["coins", "mushrooms"],
    strength : 15,
    speed: 10,
    results: [ 82, 85, 88 ],
  },
];

const defaultTestSuit = {
  execute : [{
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "elemMatch primitive",
    selector : {
      results : {
        $elemMatch : {
          $gte : 88,
        }
      }
    },
    ...defaultTestSuit,
  },
  {
    title : "elemMatch complex",
    selector : {
      wears : {
        $elemMatch : {
          defense : 2
        }
      }
    },
    ...defaultTestSuit,
  }
];

describe("$elemMatch", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;