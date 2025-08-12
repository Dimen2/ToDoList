import { useState, useEffect } from 'react';
import './ToDo.css';

function ToDo({ todo, toggleTask, removeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (todo.dueDate) {
        const diff = new Date(todo.dueDate) - new Date();
        if (diff <= 0) {
          setCountdown('Time’s up!');
        } else {
          const hours = Math.floor(diff / 1000 / 60 / 60);
          const mins = Math.floor((diff / 1000 / 60) % 60);
          const secs = Math.floor((diff / 1000) % 60);
          setCountdown(`${hours}h ${mins}m ${secs}s left`);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [todo.dueDate]);

  const handleEdit = () => {
    if (isEditing && editedTask.trim() !== '') {
      editTask(todo.id, editedTask);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="item-todo">
      <span
        onClick={() => toggleTask(todo.id)}
        style={{ marginRight: '10px', cursor: 'pointer' }}
      >
        {todo.complete ? (
          <svg width="18" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" transform="translate(0 0.5)" fill="#27AE60" />
            <path d="M6 14.5L10 17.5L19 6.5" stroke="white" stroke-width="2" />
          </svg>
        )
          : (
            <svg width="18" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" transform="translate(0 0.5)" fill="white"/>
            </svg>

          )}
      </span>

      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <span
          className={todo.complete ? 'item-text strike' : 'item-text'}
          onClick={() => toggleTask(todo.id)}
        >
          {todo.task}
        </span>
      )}

      <span className="item-tab" onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </span>
      <span className="item-delete" onClick={() => removeTask(todo.id)}>
        delete
      </span>

      {todo.dueDate && (
        <div style={{ fontSize: '12px', color: 'gray', marginTop: '5px' }}>
          {countdown}
        </div>
      )}
    </div>
  );
}

export default ToDo;
