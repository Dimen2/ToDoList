import { useState, useEffect } from 'react';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import Header from './Header';
import './Login.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [onlineCount, setOnlineCount] = useState(1);
  const [maxOnline1, setMaxOnline] = useState(
    parseInt(localStorage.getItem('maxOnline') || '1')
  );

  useEffect(() => {
  const saved = localStorage.getItem('lastUser');
  if (saved && !isLoggedIn) {
    const { username: savedName, password: savedPass } = JSON.parse(saved);
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[savedName] === savedPass) {
      const savedTodos = localStorage.getItem(`todos_${savedName}`);
      setUsername(savedName);
      setPassword(savedPass);
      setTodos(savedTodos ? JSON.parse(savedTodos) : []);
      setIsLoggedIn(true);
    }
  }
}, []);

const handleLogOut = () => {
  setIsLoggedIn(false);
  setUsername('');
  setPassword('');
  setTodos([]);
  localStorage.removeItem('lastUser');
};



  const total = todos.length;
  const done = todos.filter((todo) => todo.complete).length;
  const notDone = total - done;

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[username]) {
        if (users[username] === password) {
          const savedTodos = localStorage.getItem(`todos_${username}`);
          setTodos(savedTodos ? JSON.parse(savedTodos) : []);
          setIsLoggedIn(true);
        } else {
          alert('Incorrect password!');
        }
      } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        setTodos([]);
        setIsLoggedIn(true);
      }
    }
    localStorage.setItem('lastUser', JSON.stringify({ username, password }));
  };

  // 💾 Сохраняем ToDo
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(`todos_${username}`, JSON.stringify(todos));
    }
  }, [todos, isLoggedIn, username]);

  // ✅ Реальный онлайн трекер
  useEffect(() => {
    if (!isLoggedIn) return;

    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = Date.now().toString();
      sessionStorage.setItem('sessionId', sessionId);
    }

    const updateOnline = () => {
      const now = Date.now();
      const sessions = JSON.parse(localStorage.getItem('activeSessions') || '[]');

      const updatedSessions = sessions
        .filter((s) => now - s.time < 30000)
        .map((s) =>
          s.id === sessionId ? { id: s.id, time: now } : s
        );

      const exists = updatedSessions.some((s) => s.id === sessionId);
      if (!exists) {
        updatedSessions.push({ id: sessionId, time: now });
      }

      localStorage.setItem('activeSessions', JSON.stringify(updatedSessions));

      const current = updatedSessions.length;
      setOnlineCount(current);

      if (current > maxOnline1) {
        setMaxOnline(current);
        localStorage.setItem('maxOnline', current.toString());
      }
    };

    updateOnline();
    const interval = setInterval(updateOnline, 5000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const addTask = (taskText, dueDate) => {
    if (taskText.trim() && dueDate) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        task: taskText,
        complete: false,
        dueDate: new Date(dueDate),
      };
      setTodos([...todos, newItem]);
    }
  };

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const editTask = (id, newTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="page-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
     <Header
  onSettingsClick={() => setShowModal(true)}
  onLogOutClick={handleLogOut}
/>

      <div className="main-content">
        <div className="container">
          <h2>Hello, {username}!</h2>
          <header>
            <div className="total-container">
              <h4>All: {total}</h4>
              <h4 className="Done">Completed: {done}</h4>
              <h4>Active: {notDone}</h4>
            </div>
          </header>
          <h1>To Do List</h1>
          <ToDoForm addTask={addTask} />
          <h3>Task List</h3>
          {todos.map((todo) => (
            <ToDo
              key={todo.id}
              todo={todo}
              removeTask={removeTask}
              toggleTask={handleToggle}
              editTask={editTask}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <h2>📊 Website Status</h2>
            <p>👥 Онлайн: {onlineCount}</p>
            <p>📈 Максимальный онлайн: {maxOnline1}</p>
          </div>
        </div>
      )}
    </div>
  );
}
