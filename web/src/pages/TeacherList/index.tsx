import React, { useState, FormEvent, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'
import api from '../../services/api'

function TeacherList() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [subject, setSubject] = useState("")
  const [week_day, setWeekDay] = useState("")
  const [time, setTime] = useState("")

  useEffect(
    () => {
      window.addEventListener('scroll', onScroll, false);
      return () => {
        window.removeEventListener('scroll', onScroll, false);
      }
    }
  )

  async function onScroll() {
    if( ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 300))
    && teachers.length > 0 && !isLoading) {
      
      setIsLoading(true)
      const teachersResponse = await fetchClasses()
      if(await teachersResponse.length > 0){
        setTeachers([...teachers, ...teachersResponse])
        setIsLoading(false)
      } else {
        setIsLoading(true)
        setPage(1)
      }
    }
  }

  async function fetchClasses() {
    const response = await api.get(`classes?limit=5&page=${page}`, {
      params: {
        subject,
        week_day,
        time
      }
    })

    if(response.status !== 200){
      alert(response.data.error)
    }
    setPage(page+1)
    return await response.data
  }


  async function handleSearchTeachers(e: FormEvent) {
    e.preventDefault()
    const teachersResponse = await fetchClasses()
    setTeachers(teachersResponse)
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
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Química", label: "Química" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação física", label: "Educação física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "Históra", label: "Históra" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" }
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
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
        {page === 1 && <p className='finalMessage'>Estes são todos os resultados</p>}
      </main>
    </div>
  );
}

export default TeacherList;