const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DB_CONN, client } = require("./configs/db.config");
const todoRouter = require("./routes/todoRoutes");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DB_CONN()
  .then(() => {
    app.listen(4000, () => {
      console.log("running on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes here
app.use("/api", todoRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.send("<h1>404 page not found</h1>");
});

process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("database closed");
  });
});

module.exports = { app };
