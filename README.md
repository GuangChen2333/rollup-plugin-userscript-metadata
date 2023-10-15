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
yarn add --dev rollup-plugin-userscript-metadata
```

### Usage

Create a `rollup.config.mjs` configuration file and import the plugin:

```js
import metadata from 'rollup-plugin-userscript-metadata';

export default {
    input: 'src/index.js',
    output: {
        dir: 'output',
        format: 'iife'
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

It will generate the metadata into your output file and **auto-align**.

```js
// ==UserScript==
// @name    my-plugin
// @version 1.0.0
// @match   https://example.com/
// @match   https://example.net/
// ==/UserScript==
```

#### Using with @rollup/plugin-terser

Here's how you can modify your `rollup.config.mjs` file to include the rollup-plugin-terser plugin and preserve 
the metadata:

```js
import metadata from "rollup-plugin-userscript-metadata"
import teaser from "@rollup/plugin-terser"

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.min.js',
        format: 'iife'
    },
    plugins: [
        terser({
            format: {
                comments: [
                    "/\\/\\/ ==UserScript==\\n(?:\\/\\/ @[^\\n]+\\n)*\\/\\/ ==\\/UserScript==/\n/m"
                ]
            }
        }),
        metadata({
            metadata: "src/metadata.json"
        })
    ]
};
```

