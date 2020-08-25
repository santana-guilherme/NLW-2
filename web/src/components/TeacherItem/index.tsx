import React, { useEffect, useState } from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import defaultTeacherAvatar from '../../assets/images/default-user-avatar.png'
import ScheduleItem from '../../components/ScheduleItem';

import './styles.css'
import api from '../../services/api';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: string;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
  schedules: any[]
}

interface TeacherItemProps {
  teacher: Teacher

}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const [schedules , setSchedules] = useState<any[]>([])

  function createNewConnection() {
    api.post('connections', { user_id: teacher.id })
  }

  useEffect(() => {
    completeSchedule()
  }, [])

  function completeSchedule() {
    const schedulesDays = teacher.schedules.map(schedule => schedule.week_day)
  
    for(let day of [1,2,3,4,5]) {
      if(!(schedulesDays.includes(day))) {
        teacher.schedules.push({week_day: day})
      }
    }
    teacher.schedules.sort(function(x, y){
      return parseInt(x.week_day) - parseInt(y.week_day)
    })
    setSchedules(teacher.schedules)
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar ? teacher.avatar : defaultTeacherAvatar}
          alt="foto de perfil"
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <div className='schedule-board'>
        {schedules.map(schedule => {
          return <ScheduleItem schedule={schedule}/>
        })}
      </div>

      <footer>
        <p>
          Preço/hora <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;