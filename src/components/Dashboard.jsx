import '../styles/Dashboard.css'

function Dashboard({ status, employees }) {
  const today = new Date()
  const dateStr = today.toLocaleDateString('th-TH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="dashboard">
      <div className="dashboard-date">
        {dateStr}
      </div>
      <div className="dashboard-status">
        <div className="status-card">
          <div className="status-icon">{status.icon}</div>
          <div className="status-text">{status.text}</div>
          <div className="status-count">{status.count} คน</div>
        </div>
      </div>
      <div className="dashboard-detail">
        <h2>รายละเอียด</h2>
        <div className="detail-list">
          {employees.map(emp => (
            <div key={emp.id} className="detail-item">
              <span className="emp-name">{emp.name}</span>
              <span className={`emp-status status-${emp.status.replace(/\s+/g, '-')}`}>
                {emp.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
