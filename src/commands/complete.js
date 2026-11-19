
const { readTodos, saveTodos } = require("../utils/storage");

async function completeTodo(id) {

    // Validate ID
    if (!id) {
        console.log("Please provide a task ID.");
        console.log("Example: node src/index.js done <task-id>");
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

        // Check whether already completed
        if (todo.completed) {
            console.log("This task is already completed!");
            return;
        }

        // Update task status
        todo.completed = true;

        // Save updated tasks
        await saveTodos(todos);

        // Confirmation
        console.log("\nTask completed successfully!");
        console.log("--------------------------------");
        console.log("Title:", todo.title);
        console.log("Status: Completed");
        console.log("--------------------------------");

    } catch (error) {
        console.error("Error completing task:", error.message);
        process.exitCode = 1;
    }
}

module.exports = completeTodo;
