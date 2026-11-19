
const { readTodos, saveTodos } = require("../utils/storage");

async function updateTodo(id, newTitle) {

    // Validate task ID
    if (!id) {
        console.log("Please provide a task ID.");
        console.log("Example: node src/index.js update <task-id> <new-title>");
        return;
    }

    // Validate new title
    if (!newTitle || !newTitle.trim()) {
        console.log("Please provide a new task title.");
        return;
    }

    try {

        // Read existing tasks
        const todos = await readTodos();

        // Find task using ID
        const todo = todos.find(
            (item) => item.id === id
        );

        // Check whether task exists
        if (!todo) {
            console.log("Task not found!");
            return;
        }

        // Store old title
        const oldTitle = todo.title;

        // Update title
        todo.title = newTitle.trim();

        // Save updated tasks
        await saveTodos(todos);

        // Confirmation
        console.log("\nTask updated successfully!");
        console.log("--------------------------------");
        console.log("Old Title:", oldTitle);
        console.log("New Title:", todo.title);
        console.log("--------------------------------");

    } catch (error) {
        console.error("Error updating task:", error.message);
        process.exitCode = 1;
    }
}

module.exports = updateTodo;
