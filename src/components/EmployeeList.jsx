import '../styles/EmployeeList.css'

function EmployeeList({ employees, onUpdateEmployee }) {
  const statuses = ['มา', 'ลา', 'หยุด', 'สลับวัน']

  return (
    <div className="employee-list">
      <div className="list-header">
        <h2>รายชื่อพนักงาน</h2>
      </div>

      <div className="list-container">
        {employees.map(emp => (
          <div key={emp.id} className="employee-item">
            <div className="emp-info">
              <div className="emp-name">{emp.name}</div>
              <div className="emp-id">ID: {emp.id}</div>
            </div>
            <div className="emp-actions">
              <select
                value={emp.status}
                onChange={(e) => onUpdateEmployee(emp.id, e.target.value)}
                className={`status-select status-${emp.status.replace(/\s+/g, '-')}`}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="emp-edit"
                onClick={() => console.log('Edit', emp.name)}
              >
                แก้ไข
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="list-stats">
        <div className="stat-item">
          <strong>ทั้งหมด:</strong> {employees.length} คน
        </div>
        <div className="stat-item">
          <strong>มา:</strong> {employees.filter(e => e.status === 'มา').length} คน
        </div>
        <div className="stat-item">
          <strong>ลา:</strong> {employees.filter(e => e.status === 'ลา').length} คน
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
