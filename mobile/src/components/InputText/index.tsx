import React from 'react'
import { TextInputProperties, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import styles from './styles'

interface InputTextProps extends TextInputProperties {
  label: string;
}

const InputText: React.FC<InputTextProps> = ({ label, style,...rest }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        {...rest}
      />
    </>
  );
}

export default InputText;