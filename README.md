# Markdown Src Loader

<div align="center">
  <a href="https://www.markdownguide.org/">
    <img width="200" height="200"
      src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/205_Markdown-512.png">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![Build Status](https://travis-ci.com/iDerekLi/markdown-src-loader.svg?branch=master)](https://travis-ci.com/iDerekLi/markdown-src-loader)
[![npm version](https://img.shields.io/npm/v/markdown-src-loader.svg?style=flat-square)](https://www.npmjs.com/package/markdown-src-loader)
[![npm downloads](https://img.shields.io/npm/dm/markdown-src-loader.svg?style=flat-square)](https://www.npmjs.com/package/markdown-src-loader)
[![npm license](https://img.shields.io/npm/l/markdown-src-loader.svg?style=flat-square)](https://github.com/iderekli/markdown-src-loader)

A loader for webpack that lets you import files in Markdown format.

## Installation

Using npm:

```shell
$ npm install markdown-src-loader --dev
```

or Yarn:

```shell
$ yarn add markdown-src-loader --dev
```

## Usage

**webpack.config.js**
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [{
      test: /\.(md)$/,
      use: [{
        loader: "markdown-src-loader",
        options: {
          /* your options here */
        }
      }]
    }]
  }
};
```

## Example

**file.js**
```javascript
import md from "./file.md";
// => # markdown-src-loader\n rule
```

**or specify the `render` property in the rule's options in your webpack.config.js.**

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [{
      test: /\.(md)$/,
      use: [{
        loader: "markdown-src-loader",
        options: {
           render: src => `Parse ${src} Parse`
        }
      }]
    }]
  }
};
```

```javascript
import md from "./file.md";
// => Parse # markdown-src-loader\n rule Parse
```

**Using markdown class library to output formatted result.**

MarkdownIt Demo
```javascript
// webpack.config.js
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();

module.exports = {
  module: {
    rules: [{
      test: /\.(md)$/,
      use: [{
        loader: "markdown-src-loader",
        options: {
          render: md.render.bind(md)
        }
      }]
    }]
  }
};
```

```javascript
import md from "./file.md";
// => <h1>markdown-raw-loader!</h1>\n rule
```

Marked Demo
```javascript
// webpack.config.js
const marked = require("marked");

module.exports = {
  module: {
    rules: [{
      test: /\.(md)$/,
      use: [{
        loader: "markdown-src-loader",
        options: {
          render: marked
        }
      }]
    }]
  }
};
```

```javascript
import md from "./file.md";
// => <h1>markdown-raw-loader!</h1>\n rule
```

**other target export**

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.(md)$/,
      use: [{
        loader: "markdown-src-loader",
        options: {
          exportTarget: "commonjs2" // ["commonjs" | "commonjs2" | "es6"], default: "commonjs2"
        }
      }]
    }]
  }
};
```

## License

[MIT](https://opensource.org/licenses/mit)
