<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">user-crud-api</h3>

This project was generated using [NestJs](https://nestjs.com/).

[![DonNy88](https://circleci.com/gh/DonNy88/nestjs-user-crud-typeormsql-api.svg?branch=main&style=svg)](https://app.circleci.com/pipelines/github/DonNy88/nestjs-user-crud-typeormsql-api?branch=main&filter=all)

---

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This is a simple NestJs app that create a CRUD for the users entity and resolve the following problem:
- Create an endpoint to create new user (check if the user exist)
- Create an endpoint to provide full user info by id (check if the user exist)  
- Create an endpoint to get users with queries parameter: pageIndex, pageSize, search, sort

The User entity has this fields: id, name, middleName, surname, birthPlace, birthDate. The middleName is optional and the format of the birthDate is [UNIX Epoch time](https://en.wikipedia.org/wiki/Unix_time).

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

You need to install these packages:

- [NestJs](https://nestjs.com/)
- [Yarn](https://yarnpkg.com/) or [Npm](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started/)

### Installing

For install all deps you need to perform this command:

```sh
yarn
```

or

```sh
npm install
```

### Local environments variables settings

This NestJs uses some environments variables. To let you coding without set them on your local machine you can simple copy the file ```.env.example``` into ```.env```.


## 🔧 Running the tests <a name = "tests"></a>

This porject use Jest as testing tools. To run all test use this command:

```sh
yarn test
```

or

```sh
npm run test
```

If you would like to run test while you are coding you can use the command:

```sh
yarn test:watch
```

or

```sh
npm run test:watch
```

## 🎈 Usage <a name="usage"></a>

Before to run this NestJs app you need a postgres db. You can have an instance of postgres db with docker and running this command:

```sh
docker compose up
```

NB: the first time it may take a while, please, patient.

You can run this project in development mode with these command:

```sh
yarn start:dev
```

or

```sh
npm run start:dev
```

If you do not need run this is in development mode you can simply run:

```sh
yarn start
```

or

```sh
npm run start
```

After the start up, you can find Swagger doc of the backend at http://localhost:3000/docs.

## ✍️ Authors <a name = "authors"></a>

- [@donny88](https://github.com/DonNy88) - Initial work