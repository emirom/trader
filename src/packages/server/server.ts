import express from "express";
import mongoose, { ConnectOptions } from "mongoose";

const mongooseOptions: ConnectOptions = {
  useNewUrlParser: true, // omit depricated Uri
  useUnifiedTopology: true, // allow new document
  useCreateIndex: true,
};

export const startServer = async () => {
  console.log("inside start server", process.env.DB_URI);

  mongoose.connect(process.env.DB_URI, mongooseOptions);
  const mongo = mongoose.connection;
  mongo.on("error", (err) => onError(err));
  // mongo.once("open", (app) => {
  //   console.log("connection ready", app);
  //   app.emit("ready");
  // });
  // app.on("ready", (app) => onReady(app));
  const app = express();
  // app.use(cors());;
  // router(app);
  app.listen(process.env.APP_PORT, () =>
    console.log("app is ready and listening on port:", process.env.APP_PORT)
  );
  return mongo;
};

/**
 * -------------events :
 * waiting for db connections before app listen
 * @link https://blog.cloudboost.io/waiting-for-db-connections-before-app-listen-in-node-f568af8b9ec9
 */
// / const OnConnection = () => {
//   console.log("established initial mongo connection !");
// };

// const onReady = (app) => {
//   app.listen(process.env.APP_PORT, () =>
//     console.log("app is ready and listening on port:")
//   );
// };
const onError = (err) => {
  console.error.bind(console, "connection error :", err);
  // logger.error('connection to mongo failed ' + err);
};
