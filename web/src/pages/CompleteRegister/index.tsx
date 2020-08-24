import React from 'react';
import CompletePage from '../../components/CompletePage';
import './styles.css'

function CompleteRegister() {
  return (

    <CompletePage
      title='Cadastro concluído!'
      buttonLabel='Fazer login'
      link='/login'
    >
      <div className="register">
        <p>Agora você faz parte da plataforma da Proffy.</p>
        <p>Tenha uma ótima experiência</p>
      </div>
    </CompletePage>
  );
}

export default CompleteRegister;