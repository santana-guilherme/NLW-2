import React from 'react';
import CompletePage from '../../components/CompletePage';


function CompleteResetPassword() {
  return (

    <CompletePage
      title='Redefinição realiza!'
      buttonLabel='Ir para login'
      link='/login'
    >
      <p>Ok, sua senha foi redefinida com sucesso agora basta realizar o login e aproveitar os estudos.</p>
    </CompletePage>
  );
}

export default CompleteResetPassword;