import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import Select from '../../components/Select';
import TimePicker from '../../components/TimePicker';
import FilterButton from '../../components/FilterButton';

import styles from './styles';
import classes from '../../resources/classes.json'
import week_days from '../../resources/week_days.json'
import { useFocusEffect } from '@react-navigation/native';
import smileIcon from '../../assets/images/icons/smile.png';
import { RectButton, FlatList } from 'react-native-gesture-handler';

function TeacherList() {

  const [teachers, setTeachers] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0)
  const [totalTeachers, setTotalTeachers] = useState(0)
  const [endValues, setEndValues] = useState(false)

  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [week_day, setWeekDay] = useState("");


  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )

  useEffect(() => {
    if (page > 0)
      fetchClasses()
  }, [page])

  useEffect(() => {//improve page state
    if (teachers.length === 0 && page === 1)
      fetchClasses()
  }, [teachers])

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

  function renderItem({ item }: any) {
    return (
      <TeacherItem
        key={parseInt(item.id)}
        teacher={item}
        favorited={favorites.includes(item.id)}
      />
    )
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit() {
    setIsLoading(true)
    setEndValues(false)
    setTeachers([])
    setPage(1)
    handleToggleFiltersVisible()
    setIsLoading(false)
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
      } else {
        setPage(0)
        setEndValues(true)
      }

      if (page === 1) {
        setTotalTeachers(response.data.total)
      }
    } catch (err) {
      console.log('REQUEST ERROR:', err)
      setPage(0)
      setEndValues(true)
    }
  }

  async function onScroll() {
    if (!isLoading && !endValues) {
      setIsLoading(true)
      setPage(page + 1)
      setIsLoading(false)
    }
  }

  function footerComponent() {
    if (endValues) {
        if(teachers.length > 0)
          return (
            <Text style={styles.flFooterComponent}>
              Estes são todos os resultados
            </Text>)
        else
          return (
            <Text style={[styles.flFooterComponent, {marginTop: 80}]}>
              Não há professores para sua busca
            </Text>)
    }
    else
      return null
  }

  return (
    <View style={styles.container}>
      <PageHeader
        topTitle='Estudar'
        title={`Proffys${'\n'}Disponíveis`}
        headerRight={(
          <View style={styles.totalProffys}>
            <Image source={smileIcon} style={styles.totalProffysIcon} />
            <Text style={styles.totalProffysText}>{totalTeachers} proffys</Text>
          </View>
        )}
      >
        <FilterButton
          onPress={handleToggleFiltersVisible}
          isFilterVisible={isFiltersVisible}
        />
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
        onEndReachedThreshold={.2}
        ListFooterComponent={footerComponent}
      />

    </View>
  );
}

export default TeacherList;