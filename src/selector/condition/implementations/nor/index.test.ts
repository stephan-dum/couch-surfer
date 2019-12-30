import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/players";

const valid = [
  { name: 'Link', _id: 'link', favorites: ['Zelda', 'Pokemon'], age: 22},
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
      $nor : [
        {
          favorites: {
            $elemMatch : {
              $in : ["Mario"]
            }
          }
        },
        {
          age : {
            $lte : 21
          }
        }
      ],

    },
    ...defaultTestSuit,
  },
];

describe("$nor", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;