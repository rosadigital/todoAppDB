import Todo from '../models/todo.js';

const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title: req.body.title, description: req.body.description, status: req.body.status },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createTodo, getTodos, updateTodo, deleteTodo };
