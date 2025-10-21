import { useState, useRef } from 'react';
import './ToDo.css';
import calendarIcon from './calendar-249.png'; // убедись, что файл есть

function ToDoForm({ addTask }) {
  const [userInput, setUserInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dateInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput, dueDate);
    setUserInput('');
    setDueDate('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const openCalendar = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.();
      dateInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container-input">
      <div className="input-row">
        <input
          className="into-input flex-grow"
          value={userInput}
          type="text"
          onChange={(e) => setUserInput(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
          placeholder="Write the task..."
        />

        <input
          type="datetime-local"
          ref={dateInputRef}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ display: 'none' }}
        />

        <img
          src={calendarIcon}
          alt="calendar"
          className="calendar-image"
          onClick={openCalendar}
          title="Choose date"
        />
      </div>

      <button className="button-add full-width">Add</button>
    </form>
  );
}

export default ToDoForm;
