import React from 'react';
import { RiAddLine, RiDeleteBin7Line, RiPencilLine, RiSaveLine } from '@remixicon/react';

const Todo = ({
    todos, description, setDescription, priority, setPriority, editing, setEditing, editingId,
    setEditingId, searchTerm, setSearchTerm, addTodo, updateTodo, deleteTodo, handleEdit, handleLogout
}) => {
    return (
        <div className="todo-container">
            {/* Todo Management */}
            <div className="todo-controls">
                <h1 className="title">Todo List</h1>
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="What do you want to do?"
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
                {editing ? (
                    <button className="add" onClick={updateTodo}><RiSaveLine /></button>
                ) : (
                    <button className="add" onClick={addTodo}><RiAddLine /></button>
                )}
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="todo-list">
                <ul>
                    {todos.filter(todo => todo.description.toLowerCase().includes(searchTerm.toLowerCase())).map(todo => (
                        <li key={todo.id} className={todo.priority.toLowerCase() + '-priority'}>
                            {todo.description} - {todo.priority}
                            <button className="delete" onClick={() => deleteTodo(todo.id)}><RiDeleteBin7Line /></button>
                            <button className="edit" onClick={() => handleEdit(todo)}><RiPencilLine /></button>
                        </li>
                    ))}
                </ul>  
            </div>
        </div>
    );
};

export default Todo;
