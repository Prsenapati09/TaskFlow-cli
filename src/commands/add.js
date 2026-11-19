
const crypto = require("crypto");

const { readTodos, saveTodos } = require("../utils/storage");

async function addTodo(title) {
    if (!title || !title.trim()) {
        console.log("Please provide a task title.");
        return;
    }

    try {
        const todos = await readTodos();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        todos.push(newTodo);

        await saveTodos(todos);

        console.log("\nTask added successfully!");
        console.log("Title:", newTodo.title);
        console.log("ID:", newTodo.id);

    } catch (error) {
        console.error("Error:", error.message);
        process.exitCode = 1;
    }
}

module.exports = addTodo;
