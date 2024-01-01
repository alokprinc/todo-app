const mongo = require("mongoose");
path = "mongodb+srv://admin:9877800644@cluster0.0m61xfx.mongodb.net/todo-app";
mongo
  .connect(path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB at ${path}`);
  });

const todoSchema = mongo.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongo.model("Todo", todoSchema);
module.exports = { Todo: Todo };
