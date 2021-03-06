jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("transform-merge-sibling-variables-plugin", () => {
  it("concat vars", () => {
    const source = unpad(`
      var i = 0;
      var x = 0;
      var y = 0;
    `);
    const expected = unpad(`
      var i = 0,
          x = 0,
          y = 0;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("concat vars in for loops", () => {
    const source = unpad(`
      var i = 0;
      var j = 0;
      for (var x = 0; x < 10; x++) console.log(i + x);
    `);
    const expected = "for (var i = 0, j = 0, x = 0; x < 10; x++) console.log(i + x);";

    expect(transform(source).trim()).toBe(expected);
  });
});
