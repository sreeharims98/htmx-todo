# HTMX Todo App

A simple todo application demonstrating HTMX integration with Express.js. This app showcases how to perform CRUD operations without writing any JavaScript.

## Project Structure

```
htmx-todo/
├── public/
│   └── index.html
├── server.js
├── package.json
└── README.md
```

## HTMX Properties Explained

### Frontend (index.html)

The frontend uses several HTMX attributes to handle user interactions:

1. **Todo List Loading**

```html
<div id="todo-list" hx-get="/todos" hx-trigger="load"></div>
```

- `hx-get="/todos"`: Makes a GET request to /todos endpoint
- `hx-trigger="load"`: Triggers the request automatically when the element loads
- This combination loads the initial todo list when the page loads

2. **Adding New Todos**

```html
<form hx-post="/todos" hx-target="#todo-list" hx-swap="beforeend"></form>
```

- `hx-post="/todos"`: Sends a POST request to /todos endpoint when the form is submitted
- `hx-target="#todo-list"`: Specifies where the response should be inserted
- `hx-swap="beforeend"`: Adds the new todo at the end of the target element
- Form submission is automatically handled by HTMX - no JavaScript needed

3. **Todo Item Toggle**

```html
<input
  type="checkbox"
  hx-post="/toggle/${todo.id}"
  hx-target="#todo-${todo.id}"
  hx-swap="outerHTML"
/>
```

- `hx-post="/toggle/${todo.id}"`: Sends a POST request to toggle the todo's completion status
- `hx-target="#todo-${todo.id}"`: Targets the specific todo item for updating
- `hx-swap="outerHTML"`: Replaces the entire todo item with the server's response

4. **Deleting Todos**

```html
<button
  hx-delete="/todos/${todo.id}"
  hx-target="#todo-${todo.id}"
  hx-swap="outerHTML"
></button>
```

- `hx-delete="/todos/${todo.id}"`: Sends a DELETE request for the specific todo
- `hx-target="#todo-${todo.id}"`: Targets the specific todo item
- `hx-swap="outerHTML"`: Removes the todo item from the DOM when the server responds

### Backend (server.js)

The backend responds to HTMX requests with HTML fragments:

1. **GET /todos**

```javascript
app.get("/todos", (req, res) => {
  // Returns HTML for all todos
});
```

- Returns the complete list of todos as HTML fragments
- Each todo includes its own HTMX attributes for updates and deletion

2. **POST /todos**

```javascript
app.post("/todos", (req, res) => {
  // Returns HTML for a single new todo
});
```

- Creates a new todo and returns its HTML representation
- The response includes all necessary HTMX attributes for future interactions

3. **POST /toggle/:id**

```javascript
app.post("/toggle/:id", (req, res) => {
  // Returns updated HTML for the toggled todo
});
```

- Toggles a todo's completion status
- Returns the updated HTML fragment for the specific todo

4. **DELETE /todos/:id**

```javascript
app.delete("/todos/:id", (req, res) => {
  // Returns empty response
});
```

- Removes the todo from the server
- Empty response causes HTMX to remove the element from the DOM

## Key HTMX Concepts Demonstrated

1. **Server-Side Rendering**: All HTML is generated on the server
2. **Partial Updates**: Only the necessary parts of the page are updated
3. **Progressive Enhancement**: The app works without JavaScript (except for HTMX library)
4. **Declarative Approach**: Behavior is defined in HTML attributes
5. **Out-of-Band Updates**: Elements are updated based on server responses

## Running the Application

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
node server.js
```

3. Visit `http://localhost:3000` in your browser

## Dependencies

- Express.js: Web framework for Node.js
- HTMX: Browser library for AJAX requests
- Body Parser: Middleware for parsing request bodies
