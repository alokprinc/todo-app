const express = require("express");
const { Todo } = require("./db");
const { createTodo, updateTodo } = require("./type");
const app = express();
app.use(express.json());

// GET
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(201).json(todos);
});
// POST
app.post("/todo", async (req, res) => {
  // getting data from body
  const inputTodo = req.body;

  // validation
  const valid = createTodo.safeParse(inputTodo);
  if (!valid.success) {
    res.status(400).json({ message: "Invalid input" });
  }
  // creating data into db
  await Todo.create({
    title: inputTodo.title,
    description: inputTodo.description,
    completed: false,
  });
  // sending response
  res.status(201).json({ message: "Todo Created" });
});
// PUT
app.put("/done", async (req, res) => {
  // geting id from body
  const todo_id = req.body._id;

  // input validation
  const valid = updateTodo.safeParse({ _id: todo_id });
  if (!valid.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  // updating data into db
  try {
    const updatedTodo = await Todo.updateOne(
      { _id: todo_id },
      { completed: true }
    );
    // checking if update happened successfully or not
    if (updatedTodo.nModified === 0) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    // if update was successful
    res.json({ msg: "Todo updated successfully" });
  } catch (error) {
    // if there was an error
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
