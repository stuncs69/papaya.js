# papaya.js
Webserver made for TypeScript, using TypeScript.

```ts
import { PapayaServer } from "Papaya";

const server = new PapayaServer(8080);

server.use(function testWare(req, res) {
    return new Promise((resolve, reject) => {
        resolve("TestData")
    })
})

server.listen();
```

## Functionality
- Full [Bun](https://bun.sh/) support
    - Made using standard Node.js libraries, purposed to be used with [Bun](https://bun.sh/)
- Asynchronous and promised
    - Middleware and routes are made using promises, ensuring a blazingly fast server.
    - Public files are served asynchronously alongside coded paths.
    - Easy filesystem layout instead of spaghetti-code files.

# Initiate a new project
To initiate a new project, make a new directory:
```
$ mkdir papaya-project
$ cd papaya-project
```
Set-up a new project using NPM:
```
$ npm create papaya@latest
```
Run your brand new project:
```
$ bun index.ts
```
Due to the nature of the framework, you can exclusively use [Bun](https://bun.sh/) for now.
## File structure
- 📁 server
    - 📁 get - GET endpoint controller files.
      - 🗒️main.ts - example GET controller.
    - 📁 post - POST endpoint controller files.
      - 🗒️hello.ts - example POST controller
    - 📁 public - Public files.
      - 🗒️moveButton.js - example served file.
      - 🗒️adminPage.html - example served file.
- 🗒️entry.ts - Entry point for server

‼️ Every folder **MUST** exist, but can be empty. ‼️
