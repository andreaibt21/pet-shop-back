const mongoose = require("mongoose");
const db_uri = process.env.db_uri;

const options = {
  maxPoolSize: 10 
};

mongoose.connect(db_uri, options, (err) => {
  err ? console.log("error ", err) : console.log("Mongo Atlas connected");
});
