const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


const createTables = () => {
    const userSql = `
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`;

    const todoSql = `
    CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        priority TEXT,
        userId INTEGER,
        FOREIGN KEY(userId) REFERENCES user(id)
    )`;

    db.prepare(userSql).run();
    db.prepare(todoSql).run();
};

createTables();

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret'; // Change this to a secure random string

app.use(express.json());

// Register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    try {
        db.prepare('INSERT INTO user (username, password) VALUES (?, ?)').run(username, hashedPassword);
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ error: 'Username already exists' });
    }
});

// Login and generate a JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    const user = db.prepare('SELECT * FROM user WHERE username = ? AND password = ?').get(username, hashedPassword);
    if (user) {
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Middleware for validating JWT
const authenticateToken = (req, res, next) => {
  console.log('Authenticating token...');

  const authHeader = req.headers['authorization'];
  console.log('Auth header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);

  if (token == null) {
    console.log('Token is null');
    return res.sendStatus(401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log('Error verifying token:', err);
      return res.sendStatus(403);
    }
    console.log('Token verified successfully');
    req.user = user;
    next();
  });
};
// Protect routes with authentication
app.use(authenticateToken);

// Add a new todo
app.post('/todos', (req, res) => {
    const { description, priority } = req.body;
    const userId = req.user.userId;

    if (!description || !priority) {
        return res.status(400).json({ error: 'Description and priority are required' });
    }

    const info = db.prepare('INSERT INTO todo (description, priority, userId) VALUES (?, ?, ?)').run(description, priority, userId);
    res.status(201).json({ id: info.lastInsertRowid });
});

// Get all todos for the current user
app.get('/todos', (req, res) => {
    const userId = req.user.userId;
    const rows = db.prepare('SELECT * FROM todo WHERE userId = ?').all(userId);
    res.json(rows);
});

// Update a todo by id
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { description, priority } = req.body;
    const userId = req.user.userId;
    
    const info = db.prepare('UPDATE todo SET description = ?, priority = ? WHERE id = ? AND userId = ?').run(description, priority, id, userId);
    
    if (info.changes > 0) {
        res.json({ message: 'Todo updated successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found or not authorized' });
    }
});

// Delete a todo by id
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const info = db.prepare('DELETE FROM todo WHERE id = ? AND userId = ?').run(id, userId);
    
    if (info.changes > 0) {
        res.json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found or not authorized' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});