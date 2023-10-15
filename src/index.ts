import {Plugin} from "rollup";
import {readFileSync} from "fs";

interface Options {
    metadata: string;
}

export default function metadata(options: Options): Plugin {
    return {
        name: 'rollup-plugin-userscript-metadata',
        version: "1.0.0",
        async banner() {
            let metadataJson = readFileSync(options.metadata, "utf-8");
            let metadataObject: Map<string, string | string[]> = JSON.parse(metadataJson)
            let metadataArray: Array<string[]> = []

            // Push the metadata into the array
            for (let key in metadataObject) {
                let value = metadataObject[key];

                if (Array.isArray(value)) {
                    // the key contains multi values
                    value.forEach(data => {
                        metadataArray.push([key, data]);
                    });
                } else {
                    metadataArray.push([key, value]);
                }
            }

            // Get the max length of the key
            let maxLength = metadataArray.reduce((max, line) =>
                Math.max(max, line[0].split(" ")[0].length), 0);

            // Calc the padding size
            let metadataFormattedArray = metadataArray.map(([key, value]) => {
                const valuePadding = ' '.repeat(maxLength - key.length);
                return `// @${key} ${valuePadding}${value}`;
            });

            return "// ==UserScript==\n" + metadataFormattedArray.join("\n") + "\n// ==/UserScript==";
        }
    }
}