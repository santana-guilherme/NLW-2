import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { TextInput, RectButton } from 'react-native-gesture-handler';

function RegisterName() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.textInformation}>
        <Text style={styles.title}>Crie sua conta gratuita</Text>
        <Text style={styles.subtitle}>Basta você preencher os dados {'\n'} e você estará conosco.</Text>
      </View>

      <Text style={styles.question}>01. Quem é você ?</Text>
      <TextInput
        style={[styles.input, styles.inputTop]}
        placeholder='Nome'
        placeholderTextColor='#9C98A6'
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={[styles.input, styles.inputBottom]}
        placeholder='Sobrenome'
        placeholderTextColor='#9C98A6'
        onChangeText={text => setLastName(text)}
      />

      <RectButton
        style={name.trim() === '' || lastName.trim() === ''
          ? styles.button
          : styles.buttonEnabled}
      >
        <Text style={name.trim() === '' || lastName.trim() === ''
          ? styles.buttonText
          : styles.buttonTextEnabled}>Próximo</Text>
      </RectButton>

    </KeyboardAvoidingView>
  );
}

export default RegisterName;