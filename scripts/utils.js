import fs from "node:fs";
import path from "node:path";

const CONFIG_FILE = "scaffolding.json";
const PLACEHOLDER_FILES = ["package.json", "README.md"];
const IGNORE_FILES = ["gitignore"];

/**
 * @param {any} error
 */
export const exitOnError = (error) => {
  console.error("❌ Something went wrong :(\n\n", error);
  process.exit(1);
};

/**
 * @typedef ScaffoldingConfig
 * @type {object}
 * @property {string[]} [placeholderEntries]
 * @property {string[]} [ignoreEntries]
 */

/**
 * @param {string} dirPath
 * @param {Record<string, string>} replacements
 * @param {ScaffoldingConfig} config
 */
export const fillPlaceholders = (dirPath, replacements, config) => {
  const placeholderFiles = config.placeholderEntries
    ? [...PLACEHOLDER_FILES, ...config.placeholderEntries]
    : PLACEHOLDER_FILES;

  placeholderFiles.forEach((placeholderFile) => {
    const filePath = path.join(dirPath, placeholderFile);
    if (!fs.existsSync(filePath)) return;

    let fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    Object.entries(replacements).forEach(([placeholder, value]) => {
      fileContent = fileContent.replaceAll(placeholder, value);
    });
    fs.writeFileSync(filePath, fileContent);
  });
};

/**
 * @param {string} dirPath
 * @param {ScaffoldingConfig} config
 */
export const renameIgnoreFiles = (dirPath, config) => {
  const gitignoreFiles = config.ignoreEntries
    ? [...IGNORE_FILES, ...config.ignoreEntries]
    : IGNORE_FILES;

  gitignoreFiles.forEach((gitignoreFile) => {
    const filePath = path.join(dirPath, gitignoreFile);
    if (!fs.existsSync(filePath)) return;

    const newFilePath = path.join(
      path.dirname(filePath),
      `.${path.basename(filePath)}`
    );
    fs.renameSync(filePath, newFilePath);
  });
};

/**
 * @param {string} dirPath
 * @returns {ScaffoldingConfig}
 */
export const readScaffoldingConfigOnce = (dirPath) => {
  const filePath = path.join(dirPath, CONFIG_FILE);
  try {
    const config = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }));
    fs.rmSync(filePath, { force: true });
    return config;
  } catch {
    return {};
  }
};
