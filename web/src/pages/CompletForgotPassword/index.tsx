import React from 'react';

import successIcon from '../../assets/images/icons/success-check-icon.svg';


import './styles.css'
import { Link } from 'react-router-dom';

function CompleteForgotPassword() {
  return (
    <div id="page-forgotpass-success" className='container'>
      <main>
        <div id="page-forgotpass-success-content">
          <div id="forgotpass-information">
            <img src={successIcon} alt="cadastro realizado com sucesso" />
            <h2>Redefinição enviada!</h2>
            <p>Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.</p>
          </div>
          <Link to='/login'>
            Voltar ao login
          </Link>
        </div>
      </main>
    </div>
  );
}

export default CompleteForgotPassword;