# CREATE DEV LIB

## Overview

`create-dev-lib` is a scaffolding tool for creating modern ESM and CJS libraries. It helps developers quickly set up a project with a consistent structure, TypeScript support, and essential configurations.

## Features

- Supports both ESM and CJS module formats.
- Includes TypeScript configuration for strict type checking.
- Scaffolds a project with customizable templates.
- Provides prompts for interactive project setup.
- Includes polyfills for Node.js compatibility.

## Usage

Run the following command to scaffold a new library:

```bash
npx create-dev-lib

```

OR

```bash
pnpm create dev-lib
```

OR

```bash
yarn create dev-lib

```

Follow the prompts to configure your project name.

## Project Structure

The generated project will have the following structure:

```
project/
├── src/
│ ├── [index.ts]
│ ├── [hello.ts]
│ └── [index.css]
├── .gitignore
├── [package.json]
├── [README.md]
└── [tsconfig.json]
```

## Scripts

The following scripts are available in the generated project:

- dev: Starts the development server with hot-reloading.
- build: Builds the library for production.

## License

This project is licensed under the MIT License.
