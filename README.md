![](./typescreeps.png)

# TypeScreeps

This project is a [Screeps](https://screeps.com/) starter in [Typescript](https://www.typescriptlang.org/). Clone this project, and start writing Screeps AI right away. To get started, see the [Screeps docs](https://docs.screeps.com/)

## Gettings Started

### Prerequisites

In order to use this starter you will need to:

* Install [Node](https://nodejs.org/en/download/) to get the node package manager (NPM)

* Install [lerna](https://lerna.js.org/)

```console
npm install --global lerna
```

### Install dependencies

To install the project dependencies, run the following command in the root of the project

```console
  lerna bootstrap
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

All you have to care about is what is happening in the `package/typescreeps/src/` folder. The files that are already in this folder, is just for demonstration purposes, and can be deleted. However, the file `main.ts` is the main module, and is neccessary for screeps to excecute your code, see [the docs](https://docs.screeps.com/game-loop.html) for mor details.
