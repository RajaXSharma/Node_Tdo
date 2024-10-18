const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DB_CONN, client } = require("./configs/db.config");
const todoRouter = require("./routes/todoRoutes");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const logger = require("./Utils/logger");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Establishes a database connection and starts a server on port 4000 upon successful connection. Logs any errors encountered during the process.
DB_CONN()
  .then(() => {
    app.listen(4000, () => {
      logger.info("server running on port 4000");
    });
  })
  .catch((err) => {
    logger.error("error while running server :", err);
  });

// routes here
app.use("/api", todoRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.send("<h1>404 page not found</h1>");
});

process.on("SIGINT", () => {
  client.close().then(() => {
    logger.info("database closed");
  });
});

module.exports = { app };
