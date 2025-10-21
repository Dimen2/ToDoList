import './Profile.css';

export default function Profile({ username, xp, streak, totalTasks, doneTasks }) {
  return (
    <div className="profile-wrapper">
      <h2 className="profile-title">Профіль</h2>

      {/* 🔥 Блок с именем, огоньком и XP */}
      <div className="profile-card">
        <div className="streak-icon">🔥 {streak}</div>
        <div className="profile-info">
          <h3 className="profile-name">@{username}</h3>
          <p className="profile-xp">XP: {xp}</p>
        </div>
      </div>

      {/* 📊 Статистика заданий */}
      <div className="profile-stats">
        <p>Всего твоих заданий: {totalTasks}</p>
        <p>Сделаных заданий: {doneTasks}</p>
      </div>
    </div>
  );
}
