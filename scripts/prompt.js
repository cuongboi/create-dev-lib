import prompts from "prompts";

/**
 * @param {string} defaultTargetDir
 * @returns {prompts.PromptObject<"targetDir">}
 */
const PROJECT_NAME = (defaultTargetDir) => ({
  type: "text",
  name: "targetDir",
  message: "Project Name:",
  initial: defaultTargetDir,
});

const onCancel = () => {
  console.error("Prompt canceled by the user.");
  process.exit(0);
};

/**
 * @param {string} defaultTargetDir
 * @returns {Promise<Options>}
 */
export const promptOptions = async (defaultTargetDir) => {
  try {
    return await prompts([PROJECT_NAME(defaultTargetDir)], { onCancel });
  } catch (error) {
    console.error("Error during prompt:", error);
    process.exit(1);
  }
};

/**
 * @param {string} defaultTargetDir
 */
export const promptOnMissingTargetDir = async (defaultTargetDir) => {
  try {
    const response = await prompts([PROJECT_NAME(defaultTargetDir)], {
      onCancel,
    });
    return response.targetDir;
  } catch (error) {
    console.error("Error during prompt:", error);
    process.exit(1);
  }
};
