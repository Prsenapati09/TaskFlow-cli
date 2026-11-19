
const { readTodos } = require("../utils/storage");

async function searchTodos(keyword) {

    // Validate keyword
    if (!keyword || !keyword.trim()) {
        console.log("Please provide a search keyword.");
        console.log("Example: node src/index.js search JavaScript");
        return;
    }

    try {

        // Read existing tasks
        const todos = await readTodos();

        // Normalize keyword
        const searchKeyword = keyword.trim().toLowerCase();

        // Search matching tasks
        const results = todos.filter((todo) =>
            todo.title.toLowerCase().includes(searchKeyword)
        );

        // Check search results
        if (results.length === 0) {
            console.log("\nNo matching tasks found!");
            return;
        }

        // Format search results
        const formattedResults = results.map((todo, index) => ({
            No: index + 1,
            ID: todo.id,
            Title: todo.title,
            Status: todo.completed ? "Completed" : "Pending"
        }));

        // Display results
        console.log("\n========== SEARCH RESULTS ==========\n");

        console.table(formattedResults);

        console.log(`Found ${results.length} matching task(s).`);

        console.log("\n====================================");

    } catch (error) {
        console.error("Error searching tasks:", error.message);
        process.exitCode = 1;
    }
}

module.exports = searchTodos;
