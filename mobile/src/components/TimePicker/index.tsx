import React, { useState } from 'react';
import { Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import styles from './styles'

interface TimePickerProps extends RectButtonProperties {
  defaultTime: Date,
  onChange(a: any): void
}

const TimePicker: React.FC<TimePickerProps> = ({ onChange, defaultTime, ...rest }) => {
  const [time, setTime] = useState(defaultTime)
  const [showPicker, setShowPicker] = useState(false)

  function handlePress() {
    setShowPicker(true)
    setTime(time)
  }

  async function uptimeTime(newTime: Date | undefined) {
    await setShowPicker(false)
    if(newTime !== undefined){
      await setTime(newTime)
      onChange(formatDate(newTime))
    }
  }

  function formatDate(time: Date) {
    const hours = time.getHours().toString().padStart(2,'0')
    const minutes = time.getMinutes().toString().padStart(2,'0')
    return `${hours}:${minutes}`
  }
  return (
    <RectButton {...rest} onPress={handlePress}>
      <Text style={styles.text}>{formatDate(time)}</Text>
      {showPicker &&
        <DateTimePicker
          value={defaultTime}
          mode='time'
          display='default'
          onChange={(e, newtime) => {
            uptimeTime(newtime)
          } }
          locale='pt-Br'
        />
      }
    </RectButton>
  );
}

export default TimePicker;