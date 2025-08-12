import { useState } from 'react';

function ToDoForm({ addTask }) {
  const [userInput, setUserInput] = useState('');
  const [dueDate, setDueDate] = useState('');

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

  return (
    <form onSubmit={handleSubmit} className='container-input'>
      <div className='input-center'>
      <input
        className="into-input"
        value={userInput}
        type="text"
        onChange={(e) => setUserInput(e.currentTarget.value)}
        
        onKeyDown={handleKeyPress}
        placeholder="Write the text..."
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="into-input"
      />
      </div>
      <button className='button-add'>Add</button>
    </form>
  );
}

export default ToDoForm;
