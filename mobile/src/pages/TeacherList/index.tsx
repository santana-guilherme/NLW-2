import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton, RectButton, FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles';
import classes from '../../resources/classes.json'
import week_days from '../../resources/week_days.json'
import { useFocusEffect } from '@react-navigation/native';
import Select from '../../components/Select';
import TimePicker from '../../components/TimePicker';

function TeacherList() {

  const [teachers, setTeachers] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0)

  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [week_day, setWeekDay] = useState("");


  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const teachers = JSON.parse(response);
        const favoritedTeachersIds = teachers.map((teacher: Teacher) => {
          return teacher.id
        })
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )

  useEffect(() => {
    if(page > 0)
      fetchClasses()
  }, [page])

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit() {
    setIsLoading(true)
    setTeachers([])
    setPage(1)
    setIsFiltersVisible(false);
    setIsLoading(false)
  }

  function renderItem({ item }: any) {
    return (
      <TeacherItem
        key={parseInt(item.id)}
        teacher={item}
        favorited={favorites.includes(item.id)}
      />
    )
  }

  async function fetchClasses(fromFirst: boolean = false) {
    const response = await api.get(`classes?limit=5&page=${fromFirst ? 1 : page}`, {
      params: {
        subject,
        week_day,
        time
      }
    })

    if (response.status !== 200) {
      alert(response.data.error)
    }

    const newTeachers = response.data
    if(newTeachers.length > 0) {
      setTeachers([...teachers, ...newTeachers])
    } else{
      setPage(0)
    }
  }

  async function onScroll() {
    if (!isLoading) {
      setIsLoading(true)
      setPage(page+1)
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        topTitle='Estudar'
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color='#FFF' />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Select
              label='Matéria'
              options={classes}
              onChange={text => setSubject(text)}
              style={styles.label}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Select
                  label='Dia da semana'
                  style={styles.label}
                  onChange={text => setWeekDay(text)}
                  options={week_days}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TimePicker
                  defaultTime={new Date()}
                  onChange={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>
                Filtrar
              </Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <FlatList
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
        data={teachers}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        onEndReached={onScroll}
        onEndReachedThreshold={.1}
      />

    </View>
  );
}

export default TeacherList;