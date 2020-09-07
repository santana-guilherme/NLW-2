import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, Clipboard } from 'react-native';

import PageHeader from '../../components/PageHeader';

import background from '../../assets/images/logo-background.png'
import defaultAvatar from '../../assets/images/defaultAvatar.png'
import cameraIcon from '../../assets/images/icons/camera-icon.png'
import styles from './styles'
import { RectButton, TextInput } from 'react-native-gesture-handler';
import Fieldset from '../../components/Fieldset';
import Select from '../../components/Select';
import TimePicker from '../../components/TimePicker';
import { getAllTeacherInfo, ClassesInterface, TeacherInfoInterface } from '../../utils/teacher';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import classesJson from '../../resources/classes.json'
import week_days from '../../resources/week_days.json'
import convertMinutesToHours from '../../utils/convertMinutesToHour'
import { min } from 'react-native-reanimated';

function Profile() {
  const { goBack } = useNavigation()
  const { user, updateUserInfo } = useAuth()
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [editAvatar, setEditAvatar] = useState(false);

  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [classes, setClasses] = useState([{}] as ClassesInterface[])

  const [schedulesToDelete, setSchedulesToDelete] = useState<number[]>([])


  useEffect(() => {
    getTeacher()
    setUserInformation()
  }, [])

  async function handleSubmit() {
    const wasUpdated = await updateUserInfo(name, last_name, avatar)
    if (!wasUpdated) {
      alert('Error while updating user information')
      return
    }

    if (whatsapp) {
      const responseStatus = await updateTeacherInfo()
      if (responseStatus !== 204) {
        alert('Error while updating teacher information: ')
        return
      }
    }
    goBack()
  }

  async function updateTeacherInfo() {
    console.log('CLASSES', classes)
    const response = await api.put('/update-teacher', {
      whatsapp,
      bio,
      classes
    })

    return response.status
  }

  function setUserInformation() {
    if (user !== null) {
      setName(user.name)
      setLastName(user.last_name)
      setAvatar(user.avatar)
    }
  }

  function setTeacherInformation(response: TeacherInfoInterface) {
    /* Set local variables with teacher information */
    convertTimesInSchedule(response.classes)
    setBio(response.bio)
    setWhatsapp(response.whatsapp)
  }

  async function getTeacher() {
    const response = await getAllTeacherInfo()
    if (response) {
      setTeacherInformation(response)
    } else {
      console.log(classes[0].cost === undefined)
      console.log('not a teacher')
    }
  }

  function convertTimesInSchedule(classesObj: ClassesInterface[]) {
    const updatedClasses = classesObj.map(cls => {
      const updatedSchedules = cls.schedules?.map(schedule => {
        return {
          id: schedule.id,
          week_day: schedule.week_day,
          from: convertMinutesToHours(schedule.from),
          to: convertMinutesToHours(schedule.to),
          class_id: schedule.class_id
        }
      })
      return { ...cls, schedules: updatedSchedules }
    })

    setClasses(updatedClasses)
  }

  function updateClassField(updatedIndex: number, value: string | object, field: string) {
    const newClasses = classes.map((cls, index) => {
      if (index === updatedIndex) {
        return { ...cls, [field]: value }
      }
      return cls
    })
    setClasses(newClasses)
  }

  function updateClassSchedule(classIndex: number, scheduleIndex: number,
    field: string, value: string) {
    var newSchedules = classes[classIndex].schedules.map((schedule, index) => {
      if (scheduleIndex === index) {
        return { ...schedule, [field]: value }
      }
      return schedule
    })

    updateClassField(classIndex, newSchedules, 'schedules')
  }

  function dataFromString(date: string) {
    const [ hour, minute ] = date.split(':')
    return new Date(0,0,0, parseInt(hour), parseInt(minute))
  }

  function addEmptySchedule(classIndex: number) {
    classes[classIndex].schedules.push({
      week_day: "", to: 0, from: 0, class_id: classes[classIndex].id
    })

    const newEmptySchedule = classes[classIndex].schedules

    updateClassField(classIndex, newEmptySchedule, 'schedules')
  }

  function removeSchedule(classIndex: number, scheduleIndex: number) {
    const scheduleId = classes[classIndex].schedules[scheduleIndex].id
    if (scheduleId !== undefined) {
      setSchedulesToDelete([...schedulesToDelete, scheduleId])
    }

    const newSchedules = classes[classIndex].schedules.filter((s, index) => {
      return index !== scheduleIndex
    })

    updateClassField(classIndex, newSchedules, 'schedules')
  }

  function displaySchedule(schedule: any, index: number, scheduleIndex: number) {
    return (
      <Fieldset
        style={styles.fieldset}
        title='Horários disponíveis'
      >
        <Select
          options={week_days}
          defaultValue={schedule.week_day}
          onChange={value => updateClassSchedule(index, scheduleIndex, "week_day", value)}
        />
        <TimePicker
          defaultTime={schedule.from}
          onChange={value => updateClassSchedule(index, scheduleIndex, "from", value)}
        />

        <TimePicker
          defaultTime={schedule.to}
          onChange={value => updateClassSchedule(index, scheduleIndex, "from", value)}
        />
      </Fieldset>
    )
  }

  return (
    <View style={styles.container}>
      <PageHeader
        topTitle='Meu perfil'
      >
        <View style={styles.userInfoContainer}>
          <ImageBackground
            resizeMode="contain"
            style={styles.userInfo}
            source={background}
          >
            <View>
              <Image
                style={styles.userAvatar}
                source={user?.avatar ? user?.avatar : defaultAvatar}
              />
              <RectButton
                style={styles.cameraIcon}
                onPress={() => alert('Olá')}
              >
                <Image
                  resizeMode='contain'
                  source={cameraIcon}
                />
              </RectButton>
            </View>
            <Text style={styles.userName}>{user?.name} {user?.last_name}</Text>
            { classes.length > 0 
            ? <Text style={styles.teacherClasses}>
              {classes.map(cls => `${cls.subject}\n`)}
            </Text>
            : null}

          </ImageBackground>
        </View>
      </PageHeader>
      <ScrollView style={{ marginTop: -60 }}>
        <View style={styles.form}>
          <Fieldset
            style={styles.fieldset}
            title='Seus dados'>
            <TextInput
              placeholder='Nome'
              placeholderTextColor='#6A6180'
              style={styles.textInput}
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              placeholder='Sobrenome'
              placeholderTextColor='#6A6180'
              style={styles.textInput}
              value={last_name}
              onChangeText={text => setLastName(text)}
            />
            <TextInput
              placeholder='Email'
              placeholderTextColor='#6A6180'
              style={styles.textInput}
              value={user?.email}
              editable={false}
            />
            {(whatsapp && bio) ?
              <>
                <TextInput
                  placeholder='Whatsapp'
                  placeholderTextColor='#6A6180'
                  style={styles.textInput}
                  value={whatsapp}
                  contextMenuHidden={true}
                  onFocus={() => Clipboard.setString(whatsapp)}
                  keyboardType="numeric"
                  onChangeText={text => setWhatsapp(text)}
                />
                <TextInput
                  placeholder='Biografia'
                  placeholderTextColor='#6A6180'
                  style={[styles.textInput, styles.textArea]}
                  multiline={true}
                  value={bio}
                  onChangeText={text => setBio(text)}
                />
                
              </>
              : null}
          </Fieldset>
          {(classes.length && classes[0].cost) ? classes.map((cls, index) => {
            return (
              <>
                <Fieldset
                  key={index + 1}
                  style={styles.fieldset}
                  title='Sobre a aula'
                >
                  <Select
                    options={classesJson}
                    defaultValue={cls.subject}
                    onChange={(value) => updateClassField(index, value, 'subject')}
                  />
                  <TextInput
                    placeholder='Custo da sua hora por aula'
                    placeholderTextColor='#6A6180'
                    style={styles.textInput}
                    value={cls.cost}
                    onChange={(value) => { updateClassField(index, value, 'cost') }}
                  />
                </Fieldset>

                <Fieldset
                  style={styles.fieldset}
                  title='Horários disponíveis'
                >
                  {cls.schedules.map((scheduleItem, scheduleIndex) => {
                    return (
                      <>
                        <Select
                          options={week_days}
                          defaultValue={scheduleItem.week_day}
                          onChange={value => updateClassSchedule(index, scheduleIndex, "week_day", value)}
                        />
                        <View style={styles.timesDisplay}>
                          <TimePicker
                            defaultTime={dataFromString(scheduleItem.from)}
                            onChange={value => updateClassSchedule(index, scheduleIndex, "from", value)}
                          />

                          <TimePicker
                            defaultTime={dataFromString(scheduleItem.to)}
                            onChange={value => updateClassSchedule(index, scheduleIndex, "from", value)}
                          />
                        </View>
                      </>
                    )
                  })}
                </Fieldset>
              </>
            )
          }) : null}
          <View style={styles.footer}>
            <RectButton style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Salvar alterações</Text>
            </RectButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;