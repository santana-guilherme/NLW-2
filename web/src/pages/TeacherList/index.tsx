import React, { useState, FormEvent, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'

import week_days from '../../resources/week_days.json'
import classes from '../../resources/classes.json'

import './styles.css'

function TeacherList() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [subject, setSubject] = useState("")
  const [week_day, setWeekDay] = useState("")
  const [time, setTime] = useState("")
  const [noMoreResults, setNoMoreResults] = useState(false)

  useEffect(
    () => {
      window.addEventListener('scroll', onScroll, false);
      return () => {
        window.removeEventListener('scroll', onScroll, false);
      }
    })

  useEffect(() => {
    if (page > 0)
      fetchClasses()
  }, [page])

  useEffect(() => {
    if (teachers.length === 0 && page === 1)
      fetchClasses()
  }, [teachers])


  async function onScroll() {
    if (((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 300))
      && teachers.length > 0 && !isLoading && !noMoreResults) {
      setIsLoading(true)
      setPage(page + 1)
    }
  }

  async function fetchClasses() {
    try {
      const response = await api.get(`classes?limit=5&page=${page}`, {
        params: {
          subject,
          week_day,
          time
        }
      })

      const newTeachers = response.data.classes
      if (newTeachers.length > 0) {
        setTeachers([...teachers, ...newTeachers])
        setIsLoading(false)
      } else {
        setPage(0)
        setNoMoreResults(true)
      }
    } catch (err) {
      console.log('REQUEST ERROR:', err)
      setPage(0)
      setNoMoreResults(true)
    }
  }



  async function handleSearchTeachers(e: FormEvent) {
    e.preventDefault()
    setNoMoreResults(false)
    setTeachers([])
    setPage(1)
    setIsLoading(false)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis."
        topTitle="Estudar"
      >
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={classes}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={week_days}
          />
          <Input
            name='time'
            label='Hora'
            type='time'
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button type='submit'>
            Buscar
          </button>

        </form>
      </PageHeader>

      <main>
        {teachers.map((teacherItem: Teacher) => {
          return <TeacherItem key={teacherItem.id} teacher={teacherItem} />
        })}
        {(noMoreResults && teachers.length > 0) && <p className='finalMessage'>Estes são todos os resultados</p>}
        {(noMoreResults && teachers.length === 0) && <p className='finalMessage'>Nenhum professor encontrado<br /> com sua pesquisa.</p>}
      </main>
    </div>
  );
}

export default TeacherList;