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
    title : "allMatch primitive",
    selector : {
      results : {
        $allMatch : {
          $gte : 82,
          $lte : 88,
        }
      }
    },
    ...defaultTestSuit,
  },
  {
    title : "allMatch complex",
    selector : {
      wears : {
        $allMatch : {
          defense : {
            $gte: 1,
            $lt: 3
          }
        }
      }
    },
    ...defaultTestSuit,
  }
];

describe("$allMatch", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;