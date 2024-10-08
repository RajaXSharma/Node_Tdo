const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DB_CONN } = require("./configs/db.config");
const todoRouter = require("./routes/todoRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));app.use(express.urlencoded({ extended: true, limit: "20kb" }));

DB_CONN()
  .then(() => {
    app.listen(4000, () => {
      console.log("running on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", todoRouter);

app.use((req, res) => {
  res.send("<h1>404 page not found</h1>");
});

module.exports = {app}
