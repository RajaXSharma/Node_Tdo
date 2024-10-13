const todoRouter = require("express").Router();
const {
  todo_get,
  todo_delete,
  todo_post,
  todo_update,
} = require("../controller/todoController");

const verifyToken = require("../middleware/verifyToken");

todoRouter.get("/", (req, res) => {
  res.redirect("/todo");
});
todoRouter.get("/todo",verifyToken, todo_get);
todoRouter.post("/todo",verifyToken, todo_post);
todoRouter.patch("/todo/:id",verifyToken, todo_update);
todoRouter.delete("/todo/:id",verifyToken, todo_delete);

module.exports = todoRouter;
