# Node-blog :green_book:

Blog created with [Node.js](https://nodejs.org/en/) ([Express](https://expressjs.com/)) following the [MVC pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC). It uses the [Mongoose ODM](https://mongoosejs.com/) to connect to a [MongoDB Atlas](https://www.mongodb.com/atlas) [cloud database](https://www.ibm.com/cloud/learn/what-is-cloud-database) deployed on [AWS](https://aws.amazon.com/), and [EJS](https://ejs.co/) as a template engine (for [Server-Side Rendering](https://ageek.dev/server-side-rendering)). The user can create, display and delete articles. The server uses [morgan](https://www.npmjs.com/package/morgan) for its logs, [compresses its HTTP responses](https://en.wikipedia.org/wiki/HTTP_compression) in [gzip](https://en.wikipedia.org/wiki/Gzip) and secures their [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) with [helmet](https://helmetjs.github.io/).

![Demo gif](node-blog.gif)

## Requirements

* Node 
* Git
* CLI

## Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/pathei-kosmos/node-blog.git
cd node-blog
```

```bash
npm install
```

Note that for obvious security reasons the database connection file is not provided. You will have to replace it under the name `"dbURI.js"` at the root of the project.