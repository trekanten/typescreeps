![](./typescreeps.png)

# TypeScreeps

This project is a different way to play [Screeps](https://screeps.com/). Clone the project, and start playing, or start expanding on the project. To get started, see the [Screeps docs](https://docs.screeps.com/)

## Gettings Started

### Prerequisites

In order to set up this priject you will need to:

1. Install [Node](https://nodejs.org/en/download/) to get the node package manager (NPM)

2. Install [lerna](https://lerna.js.org/), with the following command:

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
BRANCH=<the screeps branch you are deploy to>
SHARD=<the shard you are deploying to>
API_TOKEN=<screeps api token>
```

## Deploy

In order to deploy your code to Screeps, run the following command:

```console
  npm run deploy
```

## Serve / Play

To start the frontend application, run the following command:

```console
  npm run serve
```

This will start:

* The backend server at http://localhost:3000
* The frontend server at http://localhost:8008
