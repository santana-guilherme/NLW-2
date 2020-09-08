import React from 'react';
import SuccessPage from '../../components/SuccessPage';
import { View, Text } from 'react-native';

function SuccessTeacherRegistration() {
  return (
    <View style={{ flex: 1 }}>
      <SuccessPage
        title='Cadastro salvo!'
        btnLabel='Voltar a tela inicial'
        btnLink='Landing'
      >
        <Text>
          Tudo certo, seu cadastro está
          na nossa lista de professores. Agora é
          só ficar de olho no seu WhatsApp.
        </Text>
      </SuccessPage>
    </View>
  );
}

export default SuccessTeacherRegistration;