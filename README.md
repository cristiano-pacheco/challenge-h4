# Coding Challenge for Immersion in Development of APIS Training - Horizon 4

This package contains the code developed to solve the final challenge proposed in the API's immersion training

## Features
  * Crud of users
  * Crud of companies
  * Crud of employees
  * Authentication with JWT
  * Swagger documentation

## Stack (Backend)
  * Nodejs 8.9+
  * Hapijs framework
  * MongoDB
  * Swagger
  * Standard style guide
  * Jest
  * PM2

## Stack (Frontend)
  * React
  * React Router
  * Redux
  * Axios
  * Semantic UI React
  * Standard style guide
  * Jest

## Prerequisites

Make sure you have installed **Node 8.9+**, **Npm 5.4+** and **MongoDB**.

## Installation

### Cloning

These commands will download the repository and prepare it for you.

```ssh
git clone --depth 1 -b master git@github.com:cristianopacheco/challenge-h4.git
cd challenge-h4
rm -rf ./.git/
git init
git add --all
git commit -m "init"
```

## Setup server side
``` bash
 $ cd api && npm i && npm start
```

## Usage
* API endpoint is: **http://localhost:8080**
* API documentation is: **http://localhost:8080/documentation**

## Commands
### To run tests:

``` bash
$ npm run test
```

### To run the linter:

``` bash
$ npm run lint
```

### To run and fix the code with linter:

``` bash
$ npm run lint:fix
```

## Things worth mentioning
* The Standard style guide was used in this project
* Jest was used for unit and acceptance tests

## Setup client side
``` bash
 $ cd client && npm i && npm start
```

## Usage
* APP address is: **http://localhost:3000**

## Commands
### To run tests:

``` bash
$ npm run test
```

### To run the linter:

``` bash
$ npm run lint
```

### To run and fix the code with linter:

``` bash
$ npm run lint:fix
```

## Things worth mentioning
* The Standard style guide was used in this project
* Jest was used for unit and acceptance tests

## License

Licensed under the MIT license.
