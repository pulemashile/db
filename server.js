const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create the table
const createTable = () => {
    const todoSql = `
    CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        priority TEXT
    )`;
    db.prepare(todoSql).run();
};

createTable();

// Insert a new todo
app.post('/todos', (req, res) => {
    const { description, priority } = req.body;
    const sql = `
    INSERT INTO todo (description, priority)
    VALUES (?, ?)
    `;
    const info = db.prepare(sql).run(description, priority);
    res.status(201).json({ id: info.lastInsertRowid });
});

// Get all todos
app.get('/todos', (req, res) => {
    const sql = `
    SELECT * FROM todo
    `;
    const rows = db.prepare(sql).all();
    res.json(rows);
});

// Get a todo by id
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
    SELECT * FROM todo
    WHERE id = ?
    `;
    const row = db.prepare(sql).get(id);
    if (row) {
        res.json(row);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Update a todo by id
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { description, priority } = req.body;
    const sql = `
    UPDATE todo
    SET description = ?, priority = ?
    WHERE id = ?
    `;
    const info = db.prepare(sql).run(description, priority, id);
    if (info.changes > 0) {
        res.json({ message: 'Todo updated successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Delete a todo by id
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
    DELETE FROM todo
    WHERE id = ?
    `;
    const info = db.prepare(sql).run(id);
    if (info.changes > 0) {
        res.json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
