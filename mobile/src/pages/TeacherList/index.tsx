import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
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

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

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

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit() {
    loadFavorites()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  function renderItem({ item }: any) {
    return (
      <TeacherItem
        key={item.id}
        teacher={item}
        favorited={favorites.includes(item.id)}
      />
    )
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
      />

    </View>
  );
}

export default TeacherList;