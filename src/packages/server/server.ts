import { mongo } from "mongoose";
import express from "express";

export const startServer = () => {
  const app = express();
  let db;

  mongo.connect(
    process.env.DB_NAME,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        throw new Error("_________mongoErr:" + err.message);
      } else {
        db = client.db();
        app.listen(5000);
        console.log("db", db);
      }
    }
  );

  return db;
};
