#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import "./scripts/deno-polyfills.js";
import {
  exitOnError,
  fillPlaceholders,
  renameIgnoreFiles,
  readScaffoldingConfigOnce,
} from "./scripts/utils.js";
import { promptOptions } from "./scripts/prompt.js";

const DEFAULT_TARGET_DIR = "lib";
const __filename = fileURLToPath(import.meta.url);
const TEMPLATE_PATH = path.resolve(path.dirname(__filename), "template");

const main = async () => {
  try {
    const packageManager = path.basename(process.argv[0]);

    const options = await promptOptions(DEFAULT_TARGET_DIR);
    const targetDir = options.targetDir || DEFAULT_TARGET_DIR;
    const targetDirPath = path.resolve(process.cwd(), targetDir);

    console.log(`\nScaffolding project in ${targetDirPath}...`);
    if (targetDir !== ".") {
      fs.mkdirSync(targetDirPath, { recursive: true });
    }

    fs.cpSync(TEMPLATE_PATH, targetDirPath, { recursive: true });

    const config = readScaffoldingConfigOnce(targetDirPath);
    const packageName = path.basename(targetDirPath);
    const packageTitle = packageName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    fillPlaceholders(
      targetDirPath,
      {
        $PACKAGE_NAME$: packageName,
        $PACKAGE_TITLE$: packageTitle,
      },
      config
    );

    renameIgnoreFiles(targetDirPath, config);

    console.log(`To start developing, run the following commands:
    cd ${targetDir}
    ${packageManager} install
    ${packageManager} dev
`);
  } catch (err) {
    exitOnError(err);
  }
};

main();
