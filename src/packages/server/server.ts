import express from "express";
import mongoose, { ConnectOptions } from "mongoose";

const mongooseOptions: ConnectOptions = {
  useNewUrlParser: true, // omit depricated Uri
  useUnifiedTopology: true, // allow new document
  useCreateIndex: true,
};

export const startServer = async () => {
  try {
    mongoose.connect(process.env.DB_URI, mongooseOptions);
    const mongo = mongoose.connection;
    mongo.on("error", (err) => onError(err));
    console.log("server started :", process.env.DB_URI);

    const app = express();
    // app.use(cors());;
    // app.use(express.static(path.join(__dirname, 'public')));
    ``;
    app.listen(process.env.APP_PORT, () =>
      console.log(
        `app is ready and listening on http://localhost:${process.env.APP_PORT}`
      )
    );

    app.get("/", (req, res) => {
      console.log(req);
      return res.send("Welcome to our amazing trader app!");
    });

    return { mongo, app };
  } catch (error) {
    console.log("\nError on start server: " + error);
    return error;
  }
};

const onError = (err) => {
  console.error.bind(console, "connection error :", err);
};
