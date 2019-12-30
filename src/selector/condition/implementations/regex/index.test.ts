import { ISelectorTestSuite } from "~/selector/test-runner/index.d";
import executeSuite from "~/selector/test-runner";

import data from "~/selector/test-runner/data/heros";

const valid = [
  { "name": "donkey kong", "rank": 7, "_id": "dk", "series": "mario", "debut": 1981 },
];

const testSuiteCollection: ISelectorTestSuite[] = [
  {
    title : "basic",
    selector : {
      name : {
        $regex : "(?i)donkey"
      }
    },
    execute : [{
      data,
      expected: valid,
    }],
  },
  {
    title : "invalid regex",
    selector : {
      name : {
        $regexp : "(?g)abc", //option is not supported
      }
    },
    throws : "Could not find regexp!",
  }
];

describe("$regex", () => {
  executeSuite(testSuiteCollection)
});

export default testSuiteCollection;