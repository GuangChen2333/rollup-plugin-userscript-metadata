# rollup-plugin-userscript-metadata

A Rollup.js plugin that enables automatic generation of userscript metadata from JSON.

## Quick Start

### Installation

#### npm

```shell
npm install --save-dev rollup-plugin-userscript-metadata
```

#### pnpm

```shell
pnpm install --save-dev rollup-plugin-userscript-metadata
```

#### yarn

```shell
yarn add postcss rollup-plugin-userscript-metadata --dev
```

### Usage

Create a `rollup.config.mjs` configuration file and import the plugin:

```js
import metadata from 'rollup-plugin-userscript-metadata';

export default {
    input: 'src/index.js',
    output: {
        dir: 'output',
        format: 'cjs'
    },
    plugins: [
        metadata({
            metadata: "src/metadata.json"
        })
    ]
};
```

Create a `metadata.json` metadata file like this:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "match": [
    "https://example.com/",
    "https://example.net/"
  ]
}
```

It will generate the metadata into your output file. It will **auto-align**.

```js
// ==UserScript==
// @name    my-plugin
// @version 1.0.0
// @match   https://example.com/
// @match   https://example.net/
// ==/UserScript==
```
