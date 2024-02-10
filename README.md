# Travel App

You need to have MYSQL running on your machine and add a Database named "travel_db"
To create the tables simply make a get request to the route /createdb (f.e. in your browser open localhost:7000/createdb)
You will also need to create an .env in the backend. For that rename the .env.example to .env and paste your secret in there. To create a secret open your terminal and type in "node" + Enter. After that write in the following code:
```sh
var token = require('crypto').randomBytes(64).toString('hex'); console.log(token);
```

To run the Frontend navigate to the Frontend Folder and read the README there.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
