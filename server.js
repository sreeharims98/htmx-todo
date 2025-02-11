const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// In-memory database
let todos = [];
let idCounter = 1;

// GET / - Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// GET /todos - Return the list of todos
app.get("/todos", (req, res) => {
  const todoList = todos
    .map(
      (todo) => `
        <div id="todo-${todo.id}" class="todo-item">
            <input
                type="checkbox"
                ${todo.completed ? "checked" : ""}
                hx-patch="/toggle/${todo.id}"
                hx-target="#todo-${todo.id}"
                hx-swap="outerHTML">
            <span
                class="${todo.completed ? "completed" : ""}">
                ${todo.text}
            </span>
            <button
                hx-delete="/todos/${todo.id}"
                hx-target="#todo-${todo.id}"
                hx-swap="outerHTML">
                Delete
            </button>
        </div>
    `
    )
    .join("");
  res.send(todoList);
});

// POST /todos - Add a new todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: idCounter++,
    text: req.body.todo,
    completed: false,
  };
  todos.push(newTodo);
  res.send(`
        <div id="todo-${newTodo.id}" class="todo-item">
            <input
                type="checkbox"
                hx-patch="/toggle/${newTodo.id}"
                hx-target="#todo-${newTodo.id}"
                hx-swap="outerHTML">
            <span>${newTodo.text}</span>
            <button
                hx-delete="/todos/${newTodo.id}"
                hx-target="#todo-${newTodo.id}"
                hx-swap="outerHTML">
                Delete
            </button>
        </div>
    `);
});

// PATCH /toggle/:id - Toggle the completed status of a todo
app.patch("/toggle/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    res.send(`
            <div id="todo-${todo.id}" class="todo-item">
                <input
                    type="checkbox"
                    ${todo.completed ? "checked" : ""}
                    hx-patch="/toggle/${todo.id}"
                    hx-target="#todo-${todo.id}"
                    hx-swap="outerHTML">
                <span
                    class="${todo.completed ? "completed" : ""}">
                    ${todo.text}
                </span>
                <button
                    hx-delete="/todos/${todo.id}"
                    hx-target="#todo-${todo.id}"
                    hx-swap="outerHTML">
                    Delete
                </button>
            </div>
        `);
  } else {
    res.status(404).send("Todo not found");
  }
});

// DELETE /todos/:id - Delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.send("");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
