import express from "express";
import dotenv from "dotenv";
dotenv.config();
// Connection to DB
import connectDB from "./config/db/connect.js";

const app = express();

// middlewares
import notFound from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

app.use(express.static("./public"));
app.use(express.json());

// routes
import homeRoutes from "./routes/api-home.js";
import userRoutes from "./routes/users.js";

app.use("/", homeRoutes);
app.use("/users", userRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

/**
 * HANDLING UNCAUGHT EXCEPTION ERRORS
 * Process.traceDeprecation = true;
 */
process.on("uncaughtException", (err) => {
  console.log(
    `UNCAUGHT EXCEPTION! Server Shutting down...\n
      ${err.name} \n ${err.message} \n ${err.stack}`
  );
  process.exit(1);
});

const HOSTNAME =
  process.env.NODE_ENV === "production" ? process.env.HOST : "127.0.0.1";
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.DEV_DB_URL
    : process.env.PROD_DB_URL;

// Create and start server
const server_start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, HOSTNAME, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

server_start();
