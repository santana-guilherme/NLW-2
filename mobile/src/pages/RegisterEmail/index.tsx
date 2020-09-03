import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles'
import { useAuth } from '../../contexts/auth';
import { valuesAreNotEmpty } from '../../utils/valuesAreNotEmpty';
import { useNavigation } from '@react-navigation/native';


const RegisterEmail: React.FC = (props: any) => {
  const { navigate } = useNavigation();
  const { createNewUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function handleOnPress() {
    if (email.trim() !== '' && password.trim() !== '') {
      if (!(await createNewUser( props.route.params.name,  props.route.params.lastName, email, password))) {
        console.log('error')
      } else {
        navigate('SuccessRegistration')
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>

      <Text style={styles.question}>02. Email e Senha</Text>
      <TextInput
        style={[styles.input, styles.inputTop]}
        placeholder='Email'
        textContentType='emailAddress'
        placeholderTextColor='#9C98A6'
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={[styles.input, styles.inputBottom]}
        placeholder='Senha'
        placeholderTextColor='#9C98A6'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      <RectButton
        onPress={() => {
          if(valuesAreNotEmpty(email, password)) {
            handleOnPress()
          }
        }}
        style={valuesAreNotEmpty(email, password)
          ? styles.buttonEnabled
          : styles.button}
      >
        <Text style={valuesAreNotEmpty(email, password)
          ? styles.buttonTextEnabled
          : styles.buttonText}>Concluir cadastro</Text>
      </RectButton>

    </KeyboardAvoidingView>
  );
}

export default RegisterEmail;