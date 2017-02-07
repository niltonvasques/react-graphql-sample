# Rails Graphql Sample 
## Ticket System Client

### [Server Project](https://github.com/niltonvasques/react-graphql-sample)

## Architecture

![Frontend Architecture](https://github.com/niltonvasques/rails-graphql-sample/raw/master/docs/Frontend%20Arquitecture.jpg)

The main goal that I have in mind, when are thinking about the frontend archictecture, was design it in way that
maximize the amount of code and logic, and minimize the efforts for build a hybrid app for web and mobile clients. Therefore,
considering the recent advances in web development and the **Single Page Application pattern** that emerged in the last
years and all the ecosystem that are arising around that, and my background experience, I have decide to use the **Redux** 
to handle app state logic, by considering it to be easy and predictive approach for the job. In the client view layer, the
**react-native** framework was used, because it provide a easy and very elegant way to build hybrid applications. By the way,
the communication layer between the rails graphql api and the client app was assigned to awesome **apollo-client**, that has
a strong integration with redux.

React native view components was organized in way that allows we share almost all of them between web, android and in the
future also IOS code. Since, this approach for build a frontend client is very new, and still don't have a solid and default
organization of the modules, I decided to organize them in such way that increase the isolation between modules and thus
increasing the single responsability too much as possible. The full organization is showed below:

```
app/
├── components // shared components between web and mobile
│   └── *.js
├── constants // holds static variables
│   └── *.js
├── native // specific mobile components
│   └── components
│       └── *.js
├── scenes // application pages
│   └── *.js
├── store // app state and communication layer
│   └── *.js
└── web // specific web components
    └── components
        └── *.js
 ```
 
## Setup

#### Requirements

* [docker](https://docs.docker.com/engine/installation/)
* [docker-compose](https://docs.docker.com/compose/install/)

#### Run with docker

    docker-compose up --build
