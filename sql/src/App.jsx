import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import {RiSaveLine,RiAddLine,RiDeleteBin7Line,RiPencilLine } from '@remixicon/react'

const App = () => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const updateTodo = async () => {
        try {
            await axios.put(`http://localhost:3001/todos/${editingId}`, { description, priority });
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
            await axios.delete(`http://localhost:3001/todos/${id}`);
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

    return (
        <div className="form">
            {/* 1st Column */}
            <div className="register">
                <h1 className="title">Todo List</h1>
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="what do you want todo ?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option id='priority_value' value="High">High</option>
                    <option id='priority_value'value="Medium">Medium</option>
                    <option id='priority_value'value="Low">Low</option>
                </select>
                {editing ? (
                    <button className="add" onClick={updateTodo}><RiSaveLine/></button>
                ) : (
                    <button className="add" onClick={addTodo}><RiAddLine/></button>
                )}
                
            </div>

            {/* 2nd Column */}
            <div className=''>
                <div>
                <ul>
                    {filteredTodos.map(todo => {
                        return (
                            <li key={todo.id} className={todo.priority.toLowerCase() + '-priority'}>
                                {todo.description} - {todo.priority}
                                <button className="delete" onClick={() => deleteTodo(todo.id)}><RiDeleteBin7Line /></button>
                                <button className="edit" onClick={() => handleEdit(todo)}><RiPencilLine /></button>
                            </li>
                        );
                    })}
                </ul>  
                </div>
            </div>
        </div>
    );
};

export default App;