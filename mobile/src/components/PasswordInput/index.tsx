import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Image, TextInputProps } from 'react-native';

import eyeIcon from '../../assets/images/icons/eye.png'
import eyeSlashIcon from '../../assets/images/icons/eye-slash.png'

import styles from './styles'

const PasswordInput: React.FC<TextInputProps> = ({...rest}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View
      style={styles.container}
    >
      <TextInput
        style={styles.input}
        secureTextEntry={!showPassword}
        placeholderTextColor='#9C98A6'
        {...rest}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Image
          style={styles.image}
          source={showPassword ? eyeSlashIcon : eyeIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default PasswordInput;