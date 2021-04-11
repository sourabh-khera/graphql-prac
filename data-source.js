const Mongoose = require("mongoose");

Mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mcda2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

(() => {
  Mongoose.connection.on("open", (err, data) => {
    console.log("Mongo connection successful");
  });

  Mongoose.connection.on("error", (err, data) => {
    console.log("Mongo connection not successful---", err);
  });
})();
