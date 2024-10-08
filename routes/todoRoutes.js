const todoRouter = require("express").Router();
const {
  todo_get,
  todo_delete,
  todo_post,
  todo_update,
} = require("../controller/todoController");
todoRouter.get('/',(req,res)=>{
    res.redirect('/todo')
})
// todoRouter.post("/signup", signUpTodo);
// todoRouter.get("/login", loginTodo);
todoRouter.get("/todo", todo_get);
todoRouter.post("/todo", todo_post);
todoRouter.patch("/todo/:id", todo_update);
todoRouter.delete("/todo/:id", todo_delete);

module.exports = todoRouter;
