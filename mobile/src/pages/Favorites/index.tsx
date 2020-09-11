import React, { useState } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';


function Favorites() {
  const [favorites, setFavorites] = useState([])

  async function loadFavorites() {
    const response = await api.get('/favorite-teachers')
    const formatTeachers = await response.data?.map((teacher: any) => formatTeacherObj(teacher))
    setFavorites(formatTeachers)
  }

  function formatTeacherObj(teacher: any) {
    teacher.subject = teacher.classes?.map((cls: any) => cls.subject).join(', ')
    const costs = teacher.classes?.map((cls: any) => parseFloat(cls.cost.replace(',', '.')).toFixed(2))
    if (costs.length > 1) {
      teacher.cost = `${Math.min(...costs).toString().replace('.', ',')} - ${Math.max(...costs).toString().replace('.', ',')}`
    } else {
      teacher.cost = costs[0]
    }
    return teacher
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
      
      return () => setFavorites([])
    }, [])
    
  )

  return (
    <View style={styles.container}>
      <PageHeader topTitle="Favoritos" title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.length > 0 ?
          favorites.map((teacher: Teacher) => {
            return (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                favorited/>)
          }) : null}

      </ScrollView>
    </View>
  );
}

export default Favorites;