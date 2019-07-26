const loader = require("../src/markdown-src-loader");

describe("loader", () => {
  it("should convert to requires", () => {
    expect(loader.call({}, "# markdown-raw-loader!\n <div>rule</div>")).toBe(
      `module.exports = "# markdown-raw-loader!\\n <div>rule</div>";`
    );
  });

  it("should markdown source rendering result", () => {
    expect(
      loader.call(
        {
          query: {
            render(src) {
              const H = /(\#)(\s+)(.+)(\s)/g;
              const result = src.replace(H, "<h1>$3</h1>$4");
              return result;
            }
          }
        },
        "# markdown-raw-loader!\n <div>rule</div>"
      )
    ).toBe(
      `module.exports = "<h1>markdown-raw-loader!</h1>\\n <div>rule</div>";`
    );
  });

  it("should markdown source error rendering result", () => {
    expect(() => {
      loader.call(
        {
          query: {
            render: () => undefined
          }
        },
        "# markdown-raw-loader!\n <div>rule</div>"
      );
    }).toThrow();
  });

  it("should export as commonjs default export", () => {
    expect(
      loader.call(
        {
          query: "?exportTarget=commonjs"
        },
        "# markdown-raw-loader!\n <div>rule</div>"
      )
    ).toBe(`exports.default = "# markdown-raw-loader!\\n <div>rule</div>";`);
  });

  it("should export as commonjs2 export", () => {
    expect(
      loader.call(
        {
          query: "?exportTarget=commonjs2"
        },
        "# markdown-raw-loader!\n <div>rule</div>"
      )
    ).toBe(`module.exports = "# markdown-raw-loader!\\n <div>rule</div>";`);
  });

  it("should export as es6 default export", () => {
    expect(
      loader.call(
        {
          query: "?exportTarget=es6"
        },
        "# markdown-raw-loader!\n <div>rule</div>"
      )
    ).toBe(`export default "# markdown-raw-loader!\\n <div>rule</div>";`);
  });
});
