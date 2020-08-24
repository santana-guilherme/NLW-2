import React from 'react';

import CompletePage from '../../components/CompletePage'



function CompleteForgotPassword() {
  return (
    <CompletePage
      title='Redifinição enviada!'
      buttonLabel='Voltar ao login'
      link='/login'
    >
      <p>Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.</p>
    </CompletePage>
  );
}

export default CompleteForgotPassword;