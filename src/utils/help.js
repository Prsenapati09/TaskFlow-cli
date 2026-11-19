
function showHelp() {

    console.log(`
========================================
             TODO CLI
========================================

USAGE:
  node index.js <command> [options]

AVAILABLE COMMANDS:

  add <title>
      Add a new task.

  list [options]
      Display all tasks.

      Options:
        --all             Show all tasks
        --completed       Show completed tasks
        --pending         Show pending tasks
        --sort=newest     Sort by newest
        --sort=oldest     Sort by oldest
        --sort=az         Sort alphabetically (A-Z)
        --sort=za         Sort alphabetically (Z-A)

  done <task-id>
      Mark a task as completed.

  delete <task-id>
      Delete a task.

  update <task-id> <title>
      Update an existing task.

  search <keyword>
      Search tasks by title.

HELP:
  --help, -h
      Display this help information.

EXAMPLES:

  node index.js add Learn Node.js

  node index.js list --all

  node index.js list --pending

  node index.js list --completed --sort=newest

  node index.js done <task-id>

  node index.js delete <task-id>

  node index.js update <task-id> Learn Express

  node index.js search JavaScript

========================================
`);
}

module.exports = showHelp;
