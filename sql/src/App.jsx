import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./login.jsx";
import Register from './register.jsx';
import Todo from "./todo.jsx";
import "./App.css"

const App = () => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        if (loggedIn) {
            fetchTodos();
        }
    }, [loggedIn]);

    const fetchTodos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3001/todos', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        if (!description || !priority) {
            alert('Description and priority are required');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/todos', { description, priority }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDescription('');
            setPriority('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3001/todos/${editingId}`, { description, priority }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTodos();
            setDescription('');
            setPriority('');
            setEditing(false);
            setEditingId(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3001/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEdit = (todo) => {
        setDescription(todo.description);
        setPriority(todo.priority);
        setEditing(true);
        setEditingId(todo.id);
    };

    const filteredTodos = todos.filter((todo) =>
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={!loggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/todo" />}
                    />
                    <Route
                        path="/register"
                        element={!loggedIn ? <Register /> : <Navigate to="/todo" />}
                    />
                    <Route
                        path="/todo"
                        element={loggedIn ? (
                            <Todo
                                todos={todos}
                                description={description}
                                setDescription={setDescription}
                                priority={priority}
                                setPriority={setPriority}
                                editing={editing}
                                setEditing={setEditing}
                                editingId={editingId}
                                setEditingId={setEditingId}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                addTodo={addTodo}
                                updateTodo={updateTodo}
                                deleteTodo={deleteTodo}
                                handleEdit={handleEdit}
                                handleLogout={handleLogout}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )}
                    />
                    <Route path="/" element={<Navigate to={loggedIn ? "/todo" : "/login"} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
