import express from "express";
import dotenv from "dotenv";
dotenv.config();
// Connection to DB
import connectDB from "./config/db/connect.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// import middlewares
import notFound from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

// import routes
import homeRoutes from "./routes/api-home.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import schoolRoutes from "./routes/schools.js";
import msgRoutes from "./routes/messages.js";

// ADDING CORS MIDDLEWARE
const allowlist = ["http://localhost:3000"];

function corsOptionsDelegate(req, callback) {
  let corsOptions = {
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  };
  let requestOrigin = req.header("Origin");
  if (allowlist.indexOf(requestOrigin) !== -1)
    corsOptions = { ...corsOptions, origin: requestOrigin };
  callback(null, corsOptions);
}
app.use(cors(corsOptionsDelegate));
app.use(morgan("tiny"));

app.use(express.static("./public"));
app.use(express.json());

// routes
const apiPath = "/api";
app.use(apiPath + "/", homeRoutes);
app.use(apiPath + "/", authRoutes);
app.use(apiPath + "/users", userRoutes);
app.use(apiPath + "/schools", schoolRoutes);
app.use(apiPath + "/messages", msgRoutes);

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

const HOSTNAME = process.env.HOST;
const PORT = process.env.PORT;
const MONGO_URI =
  process.env.NODE_ENV !== "production"
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
