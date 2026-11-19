
const addTodo = require("./commands/add");
const listTodos = require("./commands/list");
const completeTodo = require("./commands/complete");
const deleteTodo = require("./commands/delete");
const updateTodo = require("./commands/update");
const searchTodos = require("./commands/search");
const showHelp = require("./utils/help");

const args = process.argv.slice(2);

const command = args[0];

const title = args.slice(1).join(" ");

const taskId = args[1];

async function main() {

    
    if (args.includes("--help") || args.includes("-h")) {
        showHelp();
        return;
    }


    switch (command) {

        case "add":
            await addTodo(title);
            break;

        case "list": {

            // Extract filter argument
            const filterArg = args.find((arg) =>
                [
                    "all",
                    "completed",
                    "pending",
                    "--all",
                    "--completed",
                    "--pending"
                ].includes(arg)
            );

            // Normalize filter
            const filter = filterArg
                ? filterArg.replace(/^--/, "")
                : "all";

            // Extract sorting argument
            const sortArg = args.find((arg) =>
                arg.startsWith("--sort=")
            );

            const sort = sortArg
                ? sortArg.split("=")[1]
                : null;

            // Call list function
            await listTodos(filter, sort);

            break;
        }

        case "done":
            await completeTodo(taskId);
            break;

        case "delete":
            await deleteTodo(taskId);
            break;

        case "update": {
            const newTitle = args.slice(2).join(" ");
            await updateTodo(taskId, newTitle);
            break;
        }

        case "search": {
            const keyword = args.slice(1).join(" ");
            await searchTodos(keyword);
            break;
        }

        default:
            console.log("Unknown command!");
            console.log(
                "Available commands: add, list, done, delete, update, search"
            );
    }
}

main();
