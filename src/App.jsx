import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Calendar from './components/Calendar'
import EmployeeList from './components/EmployeeList'

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [employees, setEmployees] = useState([
    { id: 1, name: 'หัวหน้า - แตง', status: 'มา' },
    { id: 2, name: 'แป้ง', status: 'มา' },
    { id: 3, name: 'มี่', status: 'มา' },
    { id: 4, name: 'ฟ้า', status: 'มา' },
    { id: 5, name: 'ปราง - พาร์ทไทม์', status: 'ลา' },
  ])

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const saved = localStorage.getItem('employees')
    if (saved) {
      setEmployees(JSON.parse(saved))
    }
  }, [])

  // บันทึกข้อมูลลง localStorage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees))
  }, [employees])

  const handleUpdateEmployee = (id, newStatus) => {
    setEmployees(employees.map(emp =>
      emp.id === id ? { ...emp, status: newStatus } : emp
    ))
  }

  const getTodayStatus = () => {
    const present = employees.filter(e => e.status === 'มา').length
    const required = 4

    if (present >= required) {
      return { icon: '🟢', text: 'พอ', count: `${present}/${required}` }
    } else if (present === required - 1) {
      return { icon: '🟡', text: 'เสี่ยง', count: `${present}/${required}` }
    }
    return { icon: '🔴', text: 'ไม่พอ', count: `${present}/${required}` }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Manpower Planner</h1>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${currentTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${currentTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setCurrentTab('calendar')}
        >
          ปฏิทิน
        </button>
        <button
          className={`nav-btn ${currentTab === 'employees' ? 'active' : ''}`}
          onClick={() => setCurrentTab('employees')}
        >
          รายชื่อ
        </button>
      </nav>

      <main className="app-main">
        {currentTab === 'dashboard' && (
          <Dashboard status={getTodayStatus()} employees={employees} />
        )}
        {currentTab === 'calendar' && (
          <Calendar employees={employees} />
        )}
        {currentTab === 'employees' && (
          <EmployeeList 
            employees={employees} 
            onUpdateEmployee={handleUpdateEmployee}
          />
        )}
      </main>
    </div>
  )
}

export default App
