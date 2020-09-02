import React from 'react';
import { View, Text } from 'react-native';
import SuccessPage from '../../components/SuccessPage';

import styles from './styles';

function SuccessRegistration() {
  return (
    <View style={styles.container}>
      <SuccessPage
        title='Cadastro concluído!'
        btnLabel='Fazer login'
        btnLink='LogIn'
      >
        <Text style={styles.text}>
          Agora você faz parte da{'\n'}plataforma Proffy.
        </Text>
      </SuccessPage>
    </View>
  );
}

export default SuccessRegistration;