const signUpTodo = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
};

const loginTodo = () => {
  console.log("login");
};

const todo_get = () => {
  console.log("get the todos");
};

const todo_post = () => {
  console.log("post the todo");
};

const todo_update = () => {
  console.log("update todo");
};

const todo_delete = () => {
  console.log("delete todo");
};

module.exports = {
  signUpTodo,
  loginTodo,
  todo_get,
  todo_delete,
  todo_post,
  todo_update,
};
