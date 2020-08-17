import React, { useState, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import LogoContainer from '../../components/LogoContainer';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css'

function ResetPassword() {
  const history = useHistory()
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const { token } = useParams()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    api.post('/reset-password',{
      token,
      newPassword: password
    }).then(res => {
      if(res.status === 200) {
        history.push('/complete-reset-password')
      }
    }).catch(err => {
      console.log('ERROR: ', JSON.stringify(err))
      alert(`ERROR: ${err.error}`)
    })
  }

  return (
    <div id="reset-password-page">
      <div id="reset-password-content" className="container">
        <LogoContainer />
        <form onSubmit={handleSubmit}>
          <header>
            <h2>Redefina a sua<br/> senha. </h2>
            <p>Não informe sua senha para estranhos</p>
          </header>

          <div id="input-container">
            <Input
              label=''
              name='password'
              type='password'
              placeholder='Senha'
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <Input
              label=''
              name='confirmationPassword'
              type='password'
              placeholder='Confimação da senha'
              onChange={(e) => { setConfirmationPassword(e.target.value) }}
            />
          </div>
          <button
            disabled={password !== confirmationPassword || !password || !confirmationPassword}
            type='submit'
          >
            Enviar
          </button>

        </form>
      </div>
    </div>
  );
}

export default ResetPassword;