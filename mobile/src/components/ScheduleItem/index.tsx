import React from 'react';
import { View, Text, Image } from 'react-native';

import longArrowImg from '../../assets/images/icons/long-arrow.png'
import week_days from '../../resources/week_days.json'
import styles from './styles';

interface ScheduleItemProps {
  to: number;
  from: number;
  week_day: number;
  class_id: number;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ week_day, from, to }) => {

  function getWeekDay(): string {
    for (let day of week_days) {
      if (day.value === week_day.toString()) {
        return day.label.split('-')[0]
      }
    }
    return ''
  }

  function getHours() {
    if (from && to) {
      const start = (Math.floor(from / 60)).toString()
      const end = (Math.floor(to / 60)).toString()
      return `${start}h - ${end}h`
    } else {
      return '-'
    }
  }

  return (
    <View 
    style={[
      styles.container,
      to ? null : styles.scheduleItemDisabled]}
    >
      <Text style={styles.text}>{getWeekDay()}</Text>
      <Image source={longArrowImg}/>
      <Text style={[styles.text, styles.timeText]}>{getHours()}</Text>
    </View>
  );
}

export default ScheduleItem;