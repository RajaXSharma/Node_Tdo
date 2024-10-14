//import this for objectID if not it will give object error
const { ObjectId } = require("mongodb");
const { client } = require("../configs/db.config.js");
const db = client.db("todo_db");
const todoCol = db.collection("todo");
const logger = require("../Utils/logger.js");

// get todo from database
const todo_get = async (req, res) => {
  const _id = req.user;

  try {
    const fetchedTodo = await todoCol.find({ userId: _id }).toArray();

    res.status(200).json(fetchedTodo);
  } catch (error) {
   return res.status(500).json({
      message: "some error occured while fetching todo",
      error: error,
    });
  }
};

// post todo to database
const todo_post = async (req, res) => {
  const { title, body } = req.body;
  const _id = req.user;
  if (!title) {
    res.status(400).json({
      error: "require Title field",
    });
  }

  const todo = {
    title,
    body,
    completed: false,
    userId: _id,
  };
  // insert into database
  try {
    const result = await todoCol.insertOne(todo);
    res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "error while adding todo try again",
      error,
    });
  }
};

// update todo
const todo_update = async (req, res) => {
  const { id } = req.params;
  const { title, body, completed } = req.body;
  const objectId = new ObjectId(id);
  if (!title) {
    res.status(400).json({
      message: "please give title",
      _id: id,
    });
  }

  //update document
  try {
    const updatedTodo = await todoCol.updateOne(
      { _id: objectId },
      {
        $set: { title: title, body: body, completed: completed },
      }
    );
    res.status(200).json({
      message: "todo updated successfully",
      _id: id,
    });
  } catch (error) {
    res.status(500).json({
      message: "some server error occured try again",
      error: error,
    });
  }
};

// delete todo
const todo_delete = async (req, res) => {
  const { id } = req.params;
  const objectId = new ObjectId(id);

  try {
    const result = await todoCol.deleteOne({ _id: objectId });
    res.status(200).json({
      message: "successfully deleted the todo",
    });
  } catch (error) {
    res.status(500).json({
      message: "error while deleting try again",
      error: error,
    });
  }
};

module.exports = {
  todo_get,
  todo_delete,
  todo_post,
  todo_update,
};
