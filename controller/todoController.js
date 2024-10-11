//import this for objectID if not it will give object error
const ObjectId = require("mongodb").ObjectId;


const { client } = require("../configs/db.config.js");
const db = client.db("todo_db");
const todoCol = db.collection("todo");
// get todo from database
const todo_get = async (req, res) => {
  try {
    const fetchedTodo = await todoCol.find({}).toArray();
    // console.log(fetchedTodo)
    res.status(200).json(fetchedTodo);
  } catch (error) {
    // console.log(err);
    res.status(500).json({
      message: "some error occured while fetching todo",
      error: err,
    });
  }
};

// post todo to database
async function todo_post(req, res) {
  const { title, body } = req.body;
  console.log(req.body);
  if (!title) {
    res.status(400).json({
      error: "reqire Title field",
    });
  }

  const todo = {
    title,
    body,
    completed: false,
  };
  // insert into database
  try {
    const result = await todoCol.insertOne(todo);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log("error while inserting todo in db", error);
  }
}

// update todo
const todo_update = async (req, res) => {
  const { id } = req.params;
  const objectID = new ObjectId(id);
  const { title, body, completed } = req.body;
  if (!title) {
    res.status(400).json({
      message: "please give title",
      _id: id,
    });
  }

  try {
    const updatedTodo = await todoCol.updateOne({_id:objectID}, {
      $set: { title: title, body: body, completed: completed },
    });

    console.log(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "some server error occured",
      error: error,
    });
  }
};

// delete todo
const todo_delete = () => {
  console.log("delete todo");
};

module.exports = {
  todo_get,
  todo_delete,
  todo_post,
  todo_update,
};
