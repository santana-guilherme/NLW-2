import React from 'react';
import { View, Text } from 'react-native';
import SuccessPage from '../../components/SuccessPage';

function SuccessRegistration() {
  return (
    <View style={{flex: 1}}>
      <SuccessPage
        title='Cadastro concluído!'
        btnLabel='Fazer login'
        btnLink='LogIn'
      >
        <Text>
          Agora você faz parte da{'\n'}plataforma Proffy.
        </Text>
      </SuccessPage>
    </View>
  );
}

export default SuccessRegistration;