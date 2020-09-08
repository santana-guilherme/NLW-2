import React, { useEffect, useState } from 'react';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { View, Image, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';

import Fieldset from '../../components/Fieldset';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import { getAllTeacherInfo, TeacherInfoInterface, getTeacherInfo } from '../../utils/teacher';
import InputText from '../../components/InputText';

import defaultAvatar from '../../assets/images/defaultAvatar.png'
import classes from '../../resources/classes.json'
import week_days from '../../resources/week_days.json'
import styles from './styles'
import TimePicker from '../../components/TimePicker';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

function TeacherForm() {
  const { navigate } = useNavigation()
  const { user } = useAuth()
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')
  const [bio, setBio] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [isAlreadyATeacher, setIsAlreadyATeacher] = useState(false)

  const [schedule, setSchedule] = useState([{
    week_day: '', from: '0:0', to: '0:0'
  }])

  useEffect(() => {
    async function populateTeacherInfo() {
      const response = await getTeacherInfo()
      if (response.status === 200) {
        setIsAlreadyATeacher(true)
        setWhatsapp(response.data.whatsapp)
        setBio(response.data.bio)
      }
    }
    populateTeacherInfo()
  }, [])

  function addEmptySchedule() {
    setSchedule([
      ...schedule,
      { week_day: '', from: '8:00', to: '10:00' }
    ])
  }

  function displaySchedule(schedule: any, index: number) {
    return (
      <>
        <Select
          options={week_days}
          defaultValue={schedule.week_day}
          onChange={value => setScheduleItemValue(index, "week_day", value)}
        />
        <View style={styles.timesDisplay}>
          <TimePicker
            defaultTime={dateFromString(schedule.from)}
            onChange={value => setScheduleItemValue(index, "from", value)}
          />

          <TimePicker
            defaultTime={dateFromString(schedule.to)}
            onChange={value => setScheduleItemValue(index, "to", value)}
          />
        </View>
        <View style={styles.deleteItem}>
          <View style={styles.horizontalLine} />
          <Text
            style={styles.deleteText}
            onPress={() => removeSchedule(index)}
          >
            Excluir horário
          </Text>
          <View style={styles.horizontalLine} />
        </View>
      </>
    )
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = schedule.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem;
    })
    setSchedule(updatedScheduleItems)
  }

  function removeSchedule(index: number) {
    setSchedule(schedule.splice(index, 1))
  }

  function dateFromString(date: string) {
    const [hour, minute] = date.split(':')
    return new Date(0, 0, 0, parseInt(hour), parseInt(minute))
  }

  function handleSubmit() {
    api.post('classes', {
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    }).then(() => {
      navigate('SuccessTeacherRegistration')
    }).catch((err: ErrorEvent) => {
      alert('Erro no cadastro ' + err)
    })
  }


  return (
    <View style={styles.container}>
      <PageHeader
        topTitle='Lecionar'
        title={`Que incrível que você${'\n'}quer dar aulas.`}
      >
        <Text style={styles.headerText}>
          O primeiro passo, é preencher esse{'\n'}formulário de inscrição.
        </Text>
      </PageHeader>
      <ScrollView style={styles.form}>
        <Fieldset title='Seus dados' style={styles.fieldset}>
          <View style={styles.userInfo}>
            <Image
              source={user?.avatar ? { uri: user.avatar } : defaultAvatar}
              style={styles.userAvatar}
            />
            <View style={styles.userTextInfo}>
              <Text style={styles.userName}>{user?.name} {user?.last_name}</Text>
            </View>
          </View>

          <InputText
            label='Whatsapp'
            value={whatsapp}
            editable={!isAlreadyATeacher}
            keyboardType='numeric'
            onChangeText={text => setWhatsapp(text)}
          />

          <InputText
            label='Biografia'
            value={bio}
            editable={!isAlreadyATeacher}
            style={styles.bio}
            multiline={true}
            onChangeText={text => setBio(text)}
          />
        </Fieldset>
        <Fieldset
          style={styles.fieldset}
          title='Sobre a aula'
        >
          <Select
            options={classes}
            onChange={value => setSubject(value)}
          />

          <InputText
            label="Custo da sua hora por aula"
            value={cost}
            onChangeText={text => setCost(text)}
            keyboardType='numeric'
            placeholder='R$ 20,00'
          />
        </Fieldset>
        <Fieldset
          style={styles.fieldset}
          title='Horários disponíveis'
          rightButton={(
            <Text
              onPress={() => addEmptySchedule()}
              style={styles.newScheduleButton}
            >
              + Novo
            </Text>
          )}
        >
          {
            schedule.map((schedule, index) => displaySchedule(schedule, index))
          }
        </Fieldset>
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar alterações</Text>
          </RectButton>
        </View>
      </ScrollView>
    </View >
  );
}

export default TeacherForm;