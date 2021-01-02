import mongoose, { ConnectOptions } from "mongoose";
import express from "express";

export const startServer = async () => {
  const app = express();
  app.on("ready", (app) => onReady(app));

  await mongoose.connect(process.env.DB_URI, expressOptions);
  const mongo = mongoose.connection;
  mongo.on("error", (err) => onError(err));
  mongo.on("connected", OnConnection);
  mongo.once("open", (app) => app.emit("ready"));

  return mongo;
};
//-------------events :

const OnConnection = () => {
  console.log("established initial mongo connection !");
};

/**
 * waiting for db connections before app listen
 * @link https://blog.cloudboost.io/waiting-for-db-connections-before-app-listen-in-node-f568af8b9ec9
 * @param app
 */
const onReady = (app) => {
  app.listen(process.env.APP_PORT, () =>
    console.log("app is ready and listening on port:")
  );
};

const onError = (err) => {
  console.error.bind(console, "connection error :", err);
  // logger.error('connection to mongo failed ' + err);
};

const expressOptions: ConnectOptions = {
  useNewUrlParser: true, // omit depricated Uri
  useUnifiedTopology: true, // allow new document
  useCreateIndex: true,
};
