<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="./images/nest-image.png" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">This project developed by <a href="http://nestjs.com/" target="_blank">Nest.js</a> framework based on microservice architecture</p>
  <p align="center">you can find other services <a href="https://github.com/mehdiqor/nest-microservice" target="_blank">here</a></p>
    <p align="center">

## Description

This repsitory is our base service. Used for manage microservices and authentication.<br>
signup, signin, signout, forgot-password, reset-password, signin with google and Two-factor authentication

Other microservices include:

1. **Music-Service:** artists can add their albums and tracks<br>
And the music file is uploaded to google-storage

2. **Film-Service:** directors can add their movies<br>
And the cover of the movie is uploaded to google-storage

3. **Elasticsearch-Service:** In this project, the CQRS pattern is used<br>
Users can search and find the movie and music they want from elasticsearch<br>
If the music is not in our database, don't worry<br>
We have allocated a route to receive data from external APIs (Spotify)

you can access other services from this [link](https://github.com/mehdiqor/nest-microservice).

## Installation and Running the app

```bash
# run with Docker
$ docker build -t nest-auth .

# docker compose
$ docker-compose up -d

# install with yarn
$ yarn
$ yarn install

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# swagger
http://localhost:PORT/swagger
```

## Test

```bash
# e2e tests
$ yarn pretest:e2e
$ yarn test:e2e
```

## Stay in touch

- Author - [Mehdi Ghorbani](https://github.com/mehdiqor)
- Telegram - [Mehdi_qor](https://t.me/Mehdi_qor)
- Email - [mehdighorbanin@gmail.com](mailto:mehdighorbanin@gmail.com)
