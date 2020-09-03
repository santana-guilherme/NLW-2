import React from 'react';
import { View, Text } from 'react-native';
import SuccessPage from '../../components/SuccessPage';

import styles from './styles';

function SuccessForgotPassword() {
  return (
    <View style={styles.container}>
      <SuccessPage
        title='Redifinição enviada!'
        btnLabel='Voltar ao login'
        btnLink='LogIn'
      >
        <Text style={styles.text}>
          Boa, agora é só checar o e-mail que foi
          enviado para você redefinir sua senha
          e aproveitar os estudos.
        </Text>
      </SuccessPage>
    </View>
  );
}

export default SuccessForgotPassword;