import React from 'react';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css'
import { Link } from 'react-router-dom';

function CompleteRegister() {
  return (
    <div id="page-register-success" className='container'>
      <main>
        <div id="page-register-success-content">
          <div id="register-information">
            <img src={successIcon} alt="cadastro realizado com sucesso" />
            <h2>Cadastro concluído!</h2>
            <p>Agora você faz parte da plataforma da Proffy.</p>
            <p>Tenha uma ótima experiência</p>
          </div>
          <Link to='/login'>
            Fazer login
          </Link>
        </div>
      </main>
    </div>
  );
}

export default CompleteRegister;