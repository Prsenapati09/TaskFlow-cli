# Todo Cli App

A command-line Todo application built with **Node.js**. It lets you create, view, update, complete, delete, and search tasks directly from your terminal. It also supports filtering and sorting tasks.

## Features

- Add a task
- List all tasks
- Filter completed and pending tasks
- Sort tasks by creation date or title
- Mark a task as completed
- Update a task title
- Delete a task
- Search tasks by keyword
- Display command help with `--help` or `-h`
- Store tasks locally in a JSON file

## Requirements

Install the following before using the application:

- **Node.js** (LTS version recommended)
- **Git** (only required if you are cloning the repository)

Check that they are installed:

```bash
node --version
npm --version
git --version
```

## Clone the repository

Replace `<repository-url>` with your Git repository URL:

```bash
git clone https://github.com/Prsenapati09/Todo-cli.git
cd todo-cli
```

If your repository uses a different folder name, change the `cd` command accordingly.

## Install dependencies

This project currently uses **only Node.js built-in modules**. It does not require any external npm packages.

You can therefore run it without `npm install`.

If you later add external packages, install them with:

```bash
npm install
```

## Built-in Node.js modules and APIs used

| Module / API | Purpose |
|---|---|
| `node:fs/promises` | Read and write the JSON task file asynchronously |
| `node:path` | Build a file path that works across operating systems |
| `node:crypto` | Generate a unique ID for each task using `randomUUID()` |
| `process.argv` | Read commands and options entered in the terminal |
| `process.exitCode` | Set a non-zero process exit code when an operation fails |
| `console.log()` | Print messages and command output |
| `console.error()` | Print error messages |
| `console.table()` | Display tasks in a readable table |

These are provided by Node.js. They are not packages that need to be installed separately.

## Project structure

```text
todo-cli/
├── src/
│   ├── commands/
│   │   ├── add.js
│   │   ├── list.js
│   │   ├── complete.js
│   │   ├── delete.js
│   │   ├── update.js
│   │   └── search.js
│   ├── utils/
│   │   ├── storage.js
│   │   └── help.js
│   └── index.js
├── data/
│   └── todos.json
└── package.json
```

The `data/todos.json` file stores tasks. It should initially contain an empty JSON array:

```json
[]
```

The `src/index.js` file is the CLI entry point. It reads the terminal arguments and routes each command to the appropriate command module.

## Run the application

From the project root, run:

```bash
node src/index.js --help
```

If your `index.js` is in the project root instead, use:

```bash
node index.js --help
```

The command examples below assume the entry point is `src/index.js`. Adjust the path if your project layout differs.

## Commands

### 1. Help

Display all available commands and examples:

```bash
node src/index.js --help
node src/index.js -h
```

If the `help` command is registered in `index.js`, this also works:

```bash
node src/index.js help
```

### 2. Add a task

```bash
node src/index.js add Learn Node.js
```

Task titles containing spaces do not need quotation marks because the CLI joins the remaining arguments into one title.

### 3. List tasks

Show all tasks:

```bash
node src/index.js list
node src/index.js list --all
```

Show only completed tasks:

```bash
node src/index.js list --completed
```

Show only pending tasks:

```bash
node src/index.js list --pending
```

### 4. Sort tasks

Sort all tasks by creation date, newest first:

```bash
node src/index.js list --sort=newest
```

Oldest first:

```bash
node src/index.js list --sort=oldest
```

Alphabetical order (A–Z):

```bash
node src/index.js list --sort=az
```

Reverse alphabetical order (Z–A):

```bash
node src/index.js list --sort=za
```

Combine filtering and sorting:

```bash
node src/index.js list --pending --sort=newest
node src/index.js list --completed --sort=az
```

### 5. Complete a task

Use the task ID displayed by the list command:

```bash
node src/index.js done <task-id>
```

### 6. Update a task

```bash
node src/index.js update <task-id> Learn Node.js modules
```

### 7. Delete a task

```bash
node src/index.js delete <task-id>
```

### 8. Search tasks

Search task titles by keyword:

```bash
node src/index.js search JavaScript
```

The search is case-insensitive.

## Example workflow

```bash
# Add tasks
node src/index.js add Learn Node.js
node src/index.js add Build a REST API
node src/index.js add Practice JavaScript

# Display all tasks
node src/index.js list --all

# Complete a task (replace with an actual task ID)
node src/index.js done <task-id>

# Display pending tasks
node src/index.js list --pending

# Search tasks
node src/index.js search Node

# Display help
node src/index.js --help
```

## Data storage

Tasks are stored locally in `data/todos.json`. Each task follows this general structure:

```json
{
  "id": "unique-task-id",
  "title": "Learn Node.js",
  "completed": false,
  "createdAt": "2026-11-19T05:00:00.000Z"
}
```

- `id`: unique identifier generated with `crypto.randomUUID()`
- `title`: task description
- `completed`: whether the task is complete
- `createdAt`: creation timestamp in ISO 8601 format

Do not delete `data/todos.json` if you want to keep your saved tasks. If the file is missing, the storage utility can return an empty task list; ensure the `data` directory exists before saving tasks.

## Troubleshooting

### `Cannot find module`

Make sure you are running the command from the project root and using the correct entry-point path:

```bash
node src/index.js --help
```

### `No tasks found`

Add a task first, then run the list command:

```bash
node src/index.js add My first task
node src/index.js list
```

### A filter does not work

Use the supported filter options exactly:

- `--all`
- `--completed`
- `--pending`

Check that `src/index.js` passes the selected filter to `listTodos(filter, sort)` and that `src/commands/list.js` uses the matching filter names.
