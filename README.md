# Screeps Typescript Starter

A simple Screeps starter in Typescript

## Gettings Started

### Prerequisites

In order to use this starter

* Install [Node](https://nodejs.org/en/download/) to get the node package manager (NPM)

* Install global NPM packages:
    ```console
      npm install -g grunt
    ```
    ```console
      npm install -g typescript
    ```

### Install dependencies

To install the project dependencies, run the following command in the root of the project

```console
  npm install
```

### Add environment variables

In order to deploy code to the correct account, you need to add a `.env` file in the root of the project. This file should contain the following content:

```
EMAIL=<screeps email address>
PASSWORD=<screeps password>
BRANCH=<the screeps branch you would like to deploy to>
```

## Build

In order to compile the project, run the following command:

```console
  npm run build
```

This will compile your typescript project into the `dist` folder

## Deploy

In order to deploy your code to Screeps, run the following command:

```console
  npm run deploy
```

This command will first run the [build step](##build), and the push the code to your Screeps branch.

## Development

When creating Screeps code, deve

### src folder

// TODO

### Main.ts 

// TODO

### Imports

For this project to compile properly, all imports should be done with `@/`, which refers to the root of the src folder `./src`.

Eg:

```js
  import { myFunction } from './'                   // ❌ Dont do this
  import { myFunction } from '@/myFolder/myScript'  // ✔️ Do this

  import { rootFunction } from '../../rootScript'   // ❌ Dont do this
  import { rootFunction } from '@/rootScript'       // ✔️ Do this
```

The reason for this is that Screeps don't allow folder structures, and the `@/` is used during the compilation to flatten the folder structure and rename all imports.
