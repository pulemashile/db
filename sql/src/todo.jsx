import React from 'react';
import { RiAddLine, RiDeleteBin7Line, RiPencilLine, RiSaveLine } from '@remixicon/react';

const Todo = ({
  todos,
  description,
  setDescription,
  priority,
  setPriority,
  editing,
  setEditing,
  editingId,
  setEditingId,
  searchTerm,
  setSearchTerm,
  addTodo,
  updateTodo,
  deleteTodo,
  handleEdit,
  handleLogout
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">MyTasks</h1>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-all"
            >
              Logout
            </button>
          </div>
          
          {/* Search bar */}
          <div className="mt-6 relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 bg-white/10 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>

        {/* Input area */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Add a new task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:bg-white transition-all"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:bg-white text-gray-700"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-all ${
                editing 
                  ? "bg-emerald-500 hover:bg-emerald-600" 
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
              onClick={editing ? updateTodo : addTodo}
            >
              {editing ? <RiSaveLine size={20} /> : <RiAddLine size={20} />}
            </button>
          </div>
        </div>

        {/* Todo list */}
        <div className="max-h-96 overflow-y-auto p-1">
          {todos.filter(todo => 
            todo.description.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {searchTerm ? (
                <p>No matching tasks found</p>
              ) : (
                <p>Your task list is empty</p>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {todos
                .filter(todo => todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(todo => (
                  <li 
                    key={todo.id} 
                    className="group relative p-4 hover:bg-gray-50 transition-colors duration-150 rounded-lg my-1"
                  >
                    <div className="flex items-center">
                      <div 
                        className={`w-2 h-12 rounded-full mr-4 ${
                          todo.priority === 'High' 
                            ? 'bg-red-400' 
                            : todo.priority === 'Medium' 
                              ? 'bg-amber-400' 
                              : 'bg-emerald-400'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{todo.description}</p>
                        <span 
                          className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                            todo.priority === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : todo.priority === 'Medium' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {todo.priority}
                        </span>
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(todo)}
                          className="p-2 text-violet-500 hover:bg-violet-50 rounded-full transition-colors"
                        >
                          <RiPencilLine size={18} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <RiDeleteBin7Line size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;