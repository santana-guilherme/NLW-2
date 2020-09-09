import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import defaultAvatar from '../../assets/images/defaultAvatar.png'

import styles from './styles';
import api from '../../services/api';
import ScheduleItem from '../ScheduleItem';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: string;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
  schedules: any[];
}

interface TeacherProps {
  teacher: Teacher;
  favorited: boolean;
}


const TeacherItem: React.FC<TeacherProps> = ({ teacher, favorited }) => {

  const [isFavorited, setIsFavorited] = useState(favorited)
  const [schedules, setSchedules] = useState<any[]>([])

  useEffect(() => {
    completeSchedule()
  })

  function completeSchedule() {
    const schedulesDays = teacher.schedules.map(schedule => schedule.week_day)
    for (let day of [1, 2, 3, 4, 5]) {
      if (!(schedulesDays.includes(day))) {
        teacher.schedules.push({ week_day: day })
      }
    }
    teacher.schedules.sort(function (x, y) {
      return parseInt(x.week_day) - parseInt(y.week_day)
    })
    setSchedules(teacher.schedules)
  }

  async function handleLinkToWhatsapp() {
    await api.post('connections', {
      user_id: teacher.id
    })

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites')
    let favoritesArray = []

    if (favorites) {
      favoritesArray = JSON.parse(favorites)
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      favoritesArray.splice(favoriteIndex, 1)

    } else {
      favoritesArray.push(teacher)
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    /* console.log('Nova lista de favoritos', favoritesArray)
    console.log('Novos favoritos do banco', await AsyncStorage.getItem('favorites')) */
    setIsFavorited(!isFavorited)
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={teacher.avatar ? { uri: teacher.avatar }: defaultAvatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}> {teacher.bio}</Text>

      <View style={styles.horizontalLine}/>

      <View style={styles.scheduleBoard}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleHeaderText}>Dia</Text>
          <Text style={styles.scheduleHeaderText}>Horário</Text>
        </View>
        {schedules.map(schedule => {
          return <ScheduleItem key={schedule.week_day} {...schedule} />
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.price}>
          <Text style={styles.textPrice}>Preço da minha hora:</Text>
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}]}
          >
            {isFavorited
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;