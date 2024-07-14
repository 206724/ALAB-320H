import React, { useReducer, useState } from 'react';

const initialState = {
  todos: [],
  editTodo: null,
};

// Reducer function to manage state transitions
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': // Add a new todo item
      return { ...state, todos: [{ text: action.text, completed: false }, ...state.todos] };
    case 'TOGGLE_COMPLETE': // Toggle the completed state of a todo item
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.index ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO': // Delete a todo item
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.index),
      };
    case 'START_EDITING': // Start editing a todo item
      return {
        ...state,
        editTodo: { index: action.index, text: state.todos[action.index].text },
      };
    case 'SAVE_TODO': // Save the edited todo item
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === state.editTodo.index ? { ...todo, text: state.editTodo.text } : todo
        ),
        editTodo: null,
      };
    case 'UPDATE_EDIT_TODO': // Update the text of the todo item being edited
      return {
        ...state,
        editTodo: { ...state.editTodo, text: action.text },
      };
    case 'CANCEL_EDITING': // Cancel the editing of a todo item
      return {
        ...state,
        editTodo: null,
      };
    default:
      throw new Error();
  }
}

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    dispatch({ type: 'ADD_TODO', text: newTodo });
    setNewTodo('');
  };

  return (
    <div className="todo-container">
      <h1> ToDo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>cd .
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', index })}
            />
            {state.editTodo && state.editTodo.index === index ? (
              <>
                <input
                  type="text"
                  value={state.editTodo.text}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EDIT_TODO', text: e.target.value })
                  }
                />
                <button onClick={() => dispatch({ type: 'SAVE_TODO' })}>Save</button>
                <button onClick={() => dispatch({ type: 'CANCEL_EDITING' })}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => dispatch({ type: 'START_EDITING', index })}>Edit</button>
                <button
                  onClick={() => dispatch({ type: 'DELETE_TODO', index })}
                  disabled={!todo.completed}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
