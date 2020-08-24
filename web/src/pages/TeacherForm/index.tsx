import React, { useState, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select'
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

import warningIcon from '../../assets/images/icons/warning.svg'
import defaultUserAvatar from '../../assets/images/default-user-avatar.png'
import classes from '../../resources/classes.json';
import week_days from '../../resources/week_days.json';

import './styles.css'

function TeacherForm() {
  const { user } = useAuth()
  const history = useHistory();

  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  const [isAlreadyTeacher, setIsAlreadyTeacher] = useState(false)

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "", from: '', to: '' }
  ]);

  useEffect(() => {
    getTeacherInfo()
  }, [])

  async function getTeacherInfo() {
    const response = await api.get('/teacher-info')
    if (response.status === 200) {
      setIsAlreadyTeacher(response.data.error === undefined)
      setWhatsapp(response.data.whatsapp)
      setBio(response.data.bio)
    }
  }

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: "", from: '', to: '' }
    ])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem;
    })
    setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    api.post('classes', {
      whatsapp,
      bio,
      subject,
      cost,
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      history.push("/complete-teacher");
    }).catch((err: ErrorEvent) => {
      alert('Erro no cadastro ' + err)
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        topTitle="Lecionar"
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="teacher-basic">
              <div id="teacher-picture">
                <img src={user?.avatar ? user.avatar : defaultUserAvatar} alt="" />
                <p>{user?.name} {user?.last_name}</p>
              </div>

              <Input
                name='whatsapp'
                label="Whatsapp"
                value={whatsapp}
                readOnly={isAlreadyTeacher}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              readOnly={isAlreadyTeacher}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <div className='subject-info'>
              <Select
                name="subject"
                value={subject}
                label="Matéria"
                options={classes}
                onChange={(e) => { setSubject(e.target.value) }}
              />
              <Input
                name="cost"
                value={cost}
                label="Custo da sua hora por aula"
                onChange={(e) => { setCost(e.target.value) }}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>

            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                    <Select
                      name="week_day"
                      value={scheduleItem.week_day}
                      label="Dia da semana"
                      options={week_days}
                      onChange={e => setScheduleItemValue(index, "week_day", e.target.value)}
                    />
                    <Input
                      name="from"
                      label="Das"
                      type="time"
                      value={scheduleItem.from}
                      onChange={e => setScheduleItemValue(index, "from", e.target.value)}
                    />
                    <Input
                      name="to"
                      label="Até"
                      type="time"
                      value={scheduleItem.to}
                      onChange={e => setScheduleItemValue(index, "to", e.target.value)}
                    />
                  </div>
                );
              })
            }
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type='submit'>
              Salvar Cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;