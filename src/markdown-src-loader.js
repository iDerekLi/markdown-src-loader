/**
 * Copyright (c) 2019-present Derek Li
 * Released under the MIT License - https://opensource.org/licenses/mit
 *
 * https://github.com/iDerekLi/markdown-src-loader
 */
const validateOptions = require("schema-utils");
const { getOptions } = require("loader-utils");

function getExportString(exportTarget) {
  let exportsString = "";
  switch (exportTarget) {
    case "commonjs": {
      exportsString = "exports.default = ";
      break;
    }
    case "commonjs2": {
      exportsString = "module.exports = ";
      break;
    }
    case "es6": {
      exportsString = "export default ";
      break;
    }
  }
  return exportsString;
}

function renderExport(target, result) {
  const exportString = getExportString(target);
  if (exportString === "") return result;
  return `${exportString}${result};`;
}

const DefaultOptions = {
  exportTarget: "commonjs2",
  cacheable: true,
  render: null
};

const schema = {
  type: "object",
  properties: {
    exportTarget: {
      enum: ["commonjs", "commonjs2", "es6"]
    },
    cacheable: {
      type: "boolean"
    },
    render: {
      anyOf: [{ type: "null" }, { instanceof: "Function" }]
    }
  },
  additionalProperties: false
};

module.exports = function markdownSrcLoader(src) {
  const options = Object.assign({}, DefaultOptions, getOptions(this) || {});

  validateOptions(schema, options, {
    name: "Markdown Src Loader",
    baseDataPath: "options"
  });

  this.cacheable && this.cacheable(options.cacheable);

  const render = options.render;

  typeof render === "function" && (src = render(src));

  if (typeof src !== "string") {
    throw new Error("Input data should be a String");
  }

  const result = JSON.stringify(src)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return renderExport(options.exportTarget, result);
};
