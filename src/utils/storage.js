
const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(
    __dirname,
    "../../data/todos.json"
);

// Read all tasks
async function readTodos() {
    try {
        const data = await fs.readFile(DATA_FILE, "utf-8");

        return JSON.parse(data);

    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }

        throw error;
    }
}

// Save all tasks
async function saveTodos(todos) {
    await fs.writeFile(
        DATA_FILE,
        JSON.stringify(todos, null, 2)
    );
}

module.exports = {
    readTodos,
    saveTodos
};
