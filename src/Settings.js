export default function Settings({ onlineCount, maxOnline, totalDone }) {
  return (
    <div className="profile-page">
      <h2>⚙️ Settings</h2>
      <p>🟢 Online now: {onlineCount}</p>
      <p>📈 Max online: {maxOnline}</p>
      <p>✅ Tasks completed: {totalDone}</p>
    </div>
  );
}
