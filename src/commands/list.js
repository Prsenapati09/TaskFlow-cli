
const { readTodos } = require("../utils/storage");

async function listTodos(filter = "all", sort = null) {

    try {

        // Read all tasks
        const todos = await readTodos();

        // Apply filter
        let filteredTodos = todos;

        switch (filter) {

            case "completed":
                filteredTodos = todos.filter(
                    (todo) => todo.completed
                );
                break;

            case "pending":
                filteredTodos = todos.filter(
                    (todo) => !todo.completed
                );
                break;

            case "all":
                filteredTodos = [...todos];
                break;

            default:
                console.log("Invalid filter!");
                console.log("Available filters: all, completed, pending");
                return;
        }

        // Apply sorting
        switch (sort) {

            case "newest":
                filteredTodos.sort(
                    (a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;

            case "oldest":
                filteredTodos.sort(
                    (a, b) =>
                        new Date(a.createdAt) - new Date(b.createdAt)
                );
                break;

            case "az":
                filteredTodos.sort(
                    (a, b) =>
                        a.title.localeCompare(b.title)
                );
                break;

            case "za":
                filteredTodos.sort(
                    (a, b) =>
                        b.title.localeCompare(a.title)
                );
                break;

            case null:
                break;

            default:
                console.log("Invalid sort option!");
                console.log("Available options: newest, oldest, az, za");
                return;
        }

        // Calculate statistics
        const totalTasks = filteredTodos.length;

        const completedTasks = filteredTodos.filter(
            (todo) => todo.completed
        ).length;

        const pendingTasks = filteredTodos.filter(
            (todo) => !todo.completed
        ).length;

        // Check whether tasks exist
        if (totalTasks === 0) {
            console.log("\nNo tasks found!");
            console.log(`Filter: ${filter}`);
            return;
        }

        // Format tasks
        const formattedTodos = filteredTodos.map((todo, index) => ({
            No: index + 1,
            ID: todo.id,
            Title: todo.title,
            Status: todo.completed ? "Completed" : "Pending",
            Created: new Date(todo.createdAt).toLocaleDateString()
        }));

        // Display tasks
        console.log("\n========== MY TODO LIST ==========\n");

        console.table(formattedTodos);

        // Display statistics
        console.log("\n========== STATISTICS ============\n");

        console.log("Total Tasks:     ", totalTasks);
        console.log("Completed Tasks: ", completedTasks);
        console.log("Pending Tasks:   ", pendingTasks);

        console.log("\n==================================");

    } catch (error) {
        console.error("Error displaying tasks:", error.message);
        process.exitCode = 1;
    }
}

module.exports = listTodos;
