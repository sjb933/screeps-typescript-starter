# Screeps
This screeps project skeleton will help bootstrap your development in [Screeps](https://screeps.com/).

This project has been forked and simplified (Gulp dependency and tasks removed) from the public [https://github.com/screepers/screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter) project.

# Dev Setup
This is a standard NodeJS project, written in [Typescript 2](https://www.typescriptlang.org/).  Webpack is used to compile all the modules into a single `main.js` file and associated `main.js.map` file.

## Prerequisites
- **NodeJS**: A standard node environment should be installed from the [nodejs website](https://nodejs.org/en/).  The LTS build is recommended.  This will include the node runtime as well as NPM, the Node Package Manager.
- **GIT**: (recommended) Source code can and should be managed through source control.  For this, [GIT](https://git-scm.com/downloads) is recommended.

## Install NPM Dependencies
After cloning this project into a directory, all dependencies can be installed by running `npm install` at the command-line.

## Install Typings Dependencies
Typings need to be installed for the global Screeps and Lodash libraries made available in the Screeps runtime.  These can be installed by running `npm run typings -- install` at the command-line.

Typings dependencies are configured in the top-level `typings.json` file and will be installed to a local `./typings/` directory.

# Deploy To Screeps Server
This project makes available a simple module for deploying to the Screeps server via the [REST API](http://support.screeps.com/hc/en-us/articles/203022612-Committing-scripts-using-direct-API-access).

**NOTE**: Deployment via the API will override *all* files in the targeted branch.

## Configuration
The `deploy.js` script depends on a few configuration values for deployment (branch, auth email/pass).  These can be configured either with Environment Variables (recommended), or by altering the configuration file.

### Environment Variables (recommended)
Deployment configuration can be set via the following ENV VARS.  The variable names along with their default settings are shown below.

- **SCREEPS_ENDPOINT:** `https://screeps.com/api/user/code`

- **SCREEPS_BRANCH:** `test`

- **SCREEPS_EMAIL:** `''` *required*

- **SCREEPS_PASS:** `''` *required*


### Configuration File (alternative)
Alternatively to using environment variables, deploymen configuration default values can be overriden by altering the `config/default.yaml` file.

**NOTE**: This method is inhernetly less secure, and care should be taken to not commit your credentials to a public repository.

## Executing Deployment
A full build and deploy can be executed by running `npm run deploy` at the command-line.
