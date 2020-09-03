import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth'
import { valuesAreNotEmpty } from '../../utils/valuesAreNotEmpty';

import LogoContainer from '../../components/LogoContainer';
import PasswordInput from '../../components/PasswordInput';

import styles from './styles';

function Login() {
  const { logIn } = useAuth();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  function handleNavigateToRegister() {
    navigate('Register')
  }

  function handleNavigateToForgotPassword() {
    navigate('ForgotPassword')
  }

  function handleLogin() {
    logIn(email, password, remember);
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
    >
      <LogoContainer />
      <View style={styles.bottom}>
        <View style={styles.header}>
          <Text style={styles.title}>Fazer Login</Text>
          <Text
            onPress={handleNavigateToRegister}
            style={styles.createAccount}
          >
            Criar uma conta
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={[styles.input, styles.inputTop]}
            placeholder='E-mail'
            textContentType='emailAddress'
            placeholderTextColor='#9C98A6'
            onChangeText={text => setEmail(text)}
          />
          <PasswordInput
            placeholder='Senha'
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.formFooter}>

          <View style={styles.formOptions}>
            <Text style={styles.optionsText}>Lembrar-me</Text>
            <Text
              onPress={() => handleNavigateToForgotPassword()}
              style={styles.optionsText}
            >
              Esqueci minha senha
            </Text>
          </View>

          <RectButton
            style={valuesAreNotEmpty(email, password)
              ? styles.buttonEnabled
              : styles.button}
            onPress={() => {
              if (valuesAreNotEmpty(email, password)) {
                handleLogin()
              }
            }}
          >
            <Text style={email.trim() === '' || password.trim() === ''
              ? styles.buttonText
              : styles.buttonTextEnabled}>Entrar</Text>
          </RectButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;