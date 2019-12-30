/*
* test-runner if
*   - move json declaration
*   - resolve identifier
*   - dynamic variables using t.identifier
*   - different replacement contexts ie. const decl vs function argument
*   - namespace
* */


import { expect as chaiExpect } from "chai";
import { transform } from "@babel/core";
import PPSelector from "~/integration/index";

function prepareTest(selector: any, data: any) {
  const rawCode = `
      import ppSelector from "pp-selector";
  
      ppSelector(
        ${ JSON.stringify(selector) },
        ${ JSON.stringify(data) }
      );
    `;

  return transform( rawCode, {plugins: [PPSelector]});

}

function tester(selector: any, data: any) {
  const { code } = prepareTest(selector, data);

  expect(code).toMatchSnapshot();
}

describe("integration", () => {
  const baseSelector = {
    age: {
      "$lte" : "23"
    }
  };

  const baseData = { age : 23 };

  it("move object declaration", () => {
    tester(baseSelector, baseData);
  });

  it("move array declaration", () => {
    tester(
      {
        $elemMatch : baseSelector
      },
      [baseData]
    )
  });

  it("remove unused const declaration", () => {
    const rawCode = `
      import ppSelector from "pp-selector";

      const selector = ${ JSON.stringify(baseSelector) };
      
      ppSelector(selector, ${ JSON.stringify(baseData) });
    `;

    const { code } = transform( rawCode, {plugins: [PPSelector]});

    expect(code).toMatchSnapshot();
  });

  it("dont remove const declaration", () => {
    const rawCode = `
      import ppSelector from "pp-selector";

      const selector = ${ JSON.stringify(baseSelector) };
      
      const lte = selector["$lte"];
      ppSelector(selector, ${ JSON.stringify(baseData) });
    `;

    const { code } = transform( rawCode, {plugins: [PPSelector]});

    expect(code).toMatchSnapshot();
  });

  it("move invalid declaration", () => {
    chaiExpect(
      prepareTest.bind(null, baseSelector, false)
    ).to.throw("Data type 'BooleanLiteral' unknown!");
  });

  it("resolve identifier", () => {
    chaiExpect(
      prepareTest.bind(null, false, {})
    ).to.throw("Unknown type BooleanLiteral!");
  });

  it("removes empty selector expressions", () => {
    tester({}, baseData);
  });

  it("deep object value identifier look up", () => {
    const rawCode = `
      import ppSelector from "pp-selector";

      const age = 23;
      
      const selector = {
        age : {
          "$lte" : age
        }
      };
      
      const result = ppSelector(selector, ${ JSON.stringify(baseData) });
    `;

    const { code } = transform( rawCode, {plugins: [PPSelector]});

    expect(code).toMatchSnapshot();
    const fn = new Function(code + "return result;");

    chaiExpect(fn()).to.be.true;
  });
});

