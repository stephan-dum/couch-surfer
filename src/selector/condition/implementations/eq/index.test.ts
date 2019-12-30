import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";
import data from "~/selector/test-runner/data/players";

const valid = [
  { name: 'James', _id: 'james',  favorites: ['Mario', 'Pokemon'], age: 20},
];

const defaultTestSuit = {
  args : ["name", "series"],
  execute : [{
    args: ["James", ["Mario"]],
    data,
    expected: valid,
  }]
};

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "eq",
    selector : {
      name: "$name"
    },
    ...defaultTestSuit,
  },
  {
    title : "eq implicity and combinator",
    selector : {
      favorites : {
        $all : "$series"
      },
      name: "$name"
    },
    ...defaultTestSuit,
  },
  {
    title : "eq or combinator",
    selector : {
      $or : [{
        favorites : {
          $all : "$series"
        },
      }],
      name: "$name"
    },
    args : ["name", "series"],
    execute : [{
      args: ["James", ["Mario"]],
      data,
      expected: [
        ...valid,
        { name: 'William', _id: 'william', favorites: ['Mario'], age: 23}
      ],
    }],
  },
];

describe("eq", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;