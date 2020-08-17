import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'
import LogoContainer from '../../components/LogoContainer';
import Input from '../../components/Input';

import grayBackArrowIcon from '../../assets/images/icons/back.svg';

import './styles.css'
import api from '../../services/api';

function ForgotPassword() {
  const history = useHistory()
  const [email, setEmail] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    api.post('/forgot-password', {
      email
    }).then(() => {
      history.push('/forgot-password-complete')
    })
  }

  return (
    <div id="forgot-password-page">
      <div id="forgot-password-content" className="container">
        <LogoContainer />
        <form onSubmit={handleSubmit}>
          <header>
            <Link to='/login'>
              <img src={grayBackArrowIcon} alt="voltar" />
            </Link>
            <h2>Eita, esqueceu sua senha ?</h2>
            <p>Não esquenta <br />vamos dar um jeito nisso.</p>
          </header>

          <Input
            label=''
            name='email'
            placeholder='E-mail'
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <button
            disabled={!email}
            type='submit'
          >
            Enviar
          </button>

        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;