import React from 'react';

import successIcon from '../../assets/images/icons/success-check-icon.svg';


import './styles.css'
import { Link } from 'react-router-dom';

function CompleteResetPassword() {
  return (
    <div id="page-resetpass-success" className='container'>
      <main>
        <div id="page-resetpass-success-content">
          <div id="resetpass-information">
            <img src={successIcon} alt="cadastro realizado com sucesso" />
            <h2>Redefinição realiza com sucesso!</h2>
            <p>Ok, sua senha foi redefinida com sucesso agora basta realizar o login e aproveitar os estudos.</p>
          </div>
          <Link to='/login'>
            Ir para login
          </Link>
        </div>
      </main>
    </div>
  );
}

export default CompleteResetPassword;