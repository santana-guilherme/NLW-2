import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Image, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import LogoContainer from '../../components/LogoContainer';
import backIcon from '../../assets/images/icons/back-arrow-gray.png';

import styles from './styles'
import { valuesAreNotEmpty } from '../../utils/valuesAreNotEmpty';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

function ForgotPassword() {
  const { goBack, navigate } = useNavigation()
  const [email, setEmail] = useState('')

  function handleSendPasswordRedefinitionEmail() {
    if (valuesAreNotEmpty(email, 'e')) {
      api.post('/forgot-password', {
        email
      }).then(() => {
        navigate('SuccessForgotPassword')
      }).catch(err => {
        alert(err)
      })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
    >
      <LogoContainer />
      <View style={styles.bottom}>
        <RectButton style={styles.backIcon} onPress={() => goBack()}>
          <Image source={backIcon} />
        </RectButton>
        <Text style={styles.title}>Esqueceu sua senha ?</Text>
        <Text style={styles.subTitle}>
          Não esquenta,{'\n'}vamos dar um jeito nisso.
        </Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder='E-mail'
            textContentType='emailAddress'
            placeholderTextColor='#9C98A6'
            onChangeText={text => setEmail(text)}
          />
        </View>
        <RectButton
          style={valuesAreNotEmpty(email, "a")
            ? styles.buttonEnabled
            : styles.button}
          onPress={handleSendPasswordRedefinitionEmail}
        >
          <Text
            style={valuesAreNotEmpty(email, "a")
              ? styles.buttonTextEnabled
              : styles.buttonText}>Entrar
          </Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ForgotPassword;