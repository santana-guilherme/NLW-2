import React from 'react';
import week_days from '../../resources/week_days.json'
import './styles.css'

interface Schedule {
  to: number;
  from: number;
  week_day: number;
  class_id: number;
}

interface ScheduleItemProps {
  schedule: Schedule
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule }) => {

  function getWeekDay(week_day: number) {
    for (let day of week_days) {
      if (day.value === week_day.toString()) {
        return day.label.split('-')[0]
      }
    }
  }

  function getHours(from: number, to: number) {
    if (from && to) {
      const start = (Math.floor(from / 60)).toString()
      const end = (Math.floor(to / 60)).toString()
      return `${start}h - ${end}h`
    } else {
      return '-'
    }
  }

  return (
    <div
      key={schedule.class_id + schedule.week_day}
      className={`scheduleItem ${schedule.to ? null : 'scheduleItem-disabled'}`}
      aria-disabled={true}
    >
      <div className='day-info'>
        <p>Dia</p>
        <h2>{getWeekDay(schedule.week_day)}</h2>
      </div>
      
      <div className='time-info'>
        <p>Horário</p>
        <h2>{getHours(schedule.from, schedule.to)}</h2>
      </div>

    </div>)
}

export default ScheduleItem;