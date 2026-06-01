import { useState } from 'react'
import '../styles/Calendar.css'

function Calendar({ employees }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = new Date()

  const getDayStatus = (day) => {
    const cycle = day % 3
    if (cycle === 1) {
      return { icon: '🟢', text: 'พอ', className: 'status-green' }
    } else if (cycle === 2) {
      return { icon: '🟡', text: 'เสี่ยง', className: 'status-yellow' }
    }
    return { icon: '🔴', text: 'ไม่พอ', className: 'status-red' }
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return (day + 6) % 7
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // เพิ่มช่องว่างสำหรับวันแรกของเดือน
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />)
    }

    // เพิ่มวันของเดือน
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getDayStatus(day)
      const isToday = day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${status.className}`}
          title={`${day} ${status.text}`}
        >
          <div className="day-number">{day}</div>
          <div className="day-status">
            <span className="status-icon">{status.icon}</span>
          </div>
        </div>
      )
    }

    return days
  }

  const monthName = currentDate.toLocaleDateString('th-TH', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
          ← ก่อนหน้า
        </button>
        <h2>{monthName}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          ถัดไป →
        </button>
      </div>

      <div className="calendar-weekdays">
        <div>จ</div>
        <div>อ</div>
        <div>พ</div>
        <div>พฤ</div>
        <div>ศ</div>
        <div>ส</div>
        <div>อา</div>
      </div>

      <div className="calendar-grid">
        {renderCalendar()}
      </div>
    </div>
  )
}

export default Calendar
