import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        try {
            await axios.post('http://localhost:3001/todos', { description, priority });
            setDescription('');
            setPriority('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (id) => {
        try {
            await axios.put(`http://localhost:3001/todos/${id}`, { description, priority });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="form">
            <div className="register">
                <h1 className="title">Todo List</h1>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} className={todo.priority.toLowerCase() + '-priority'}>
                            {todo.description} - {todo.priority}
                            <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button className="add" onClick={addTodo}>Add</button>
            </div>
        </div>
    );
};

export default App;
