const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const dbName = "appdb";
const host = "0.0.0.0";
const port = "27017";

const url = `mongodb://${host}:${port}/${dbName}`

const username = "";
const password = "";
// const uri = "mongodb+srv://${username}:${password}@${host}:${port}/${dbName}";

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('database connection successful'))
    .catch((err) => console.error(err));