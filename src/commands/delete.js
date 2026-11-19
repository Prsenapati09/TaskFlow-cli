
const { readTodos, saveTodos } = require("../utils/storage");

async function deleteTodo(id) {

    // Validate ID
    if (!id) {
        console.log("Please provide a task ID.");
        console.log("Example: node src/index.js delete <task-id>");
        return;
    }

    try {

        // Read existing tasks
        const todos = await readTodos();

        // Find the task before deleting
        const todo = todos.find(
            (item) => item.id === id
        );

        // Check whether task exists
        if (!todo) {
            console.log("Task not found!");
            return;
        }

        // Remove the task
        const updatedTodos = todos.filter(
            (item) => item.id !== id
        );

        // Save updated tasks
        await saveTodos(updatedTodos);

        // Confirmation
        console.log("\nTask deleted successfully!");
        console.log("--------------------------------");
        console.log("Title:", todo.title);
        console.log("Status: Deleted");
        console.log("--------------------------------");

    } catch (error) {
        console.error("Error deleting task:", error.message);
        process.exitCode = 1;
    }
}

module.exports = deleteTodo;
