# Hapi / MongoDB Starter Kit for Restful API's Development

This package provides a basic skeleton for an API development in Nodejs platform with Hapi framework and MongoDB.

## Features
  * Crud of users
  * Authentication with JWT
  * Swagger documentation

## Prerequisites

Make sure you have installed **Node 8.9+**, **Npm 5.4+** and **MongoDB**.

## Installation

### Cloning

These commands will download the repository and prepare it for you.

```ssh
git clone --depth 1 -b master git@github.com:cristianopacheco/hapi-start.git
cd hapi-start
rm -rf ./.git/
git init
git add --all
git commit -m "init"
```

### Setup
``` bash
 $ npm i && npm start
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


## License

Licensed under the MIT license.
