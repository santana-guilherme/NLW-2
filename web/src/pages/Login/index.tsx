import React, { useState, useEffect, FormEvent, useContext } from 'react';
import logoImg from '../../assets/images/logo.svg';

import './styles.css'
import Input from '../../components/Input';
import api from '../../services/api';
import appContext from '../../AppContext';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)
  const { appState, setAppState } = useContext(appContext)

  useEffect(() => {
    if (email.replace(/ /g, "") !== '' && password.replace(/ /g, "") !== '') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [password, email])

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    const response = await api.post('login',{
      email,
      password
    })

    if(response.status === 200) {
      const {user, token} = response.data
      setAppState({user, token, signed: true})
      console.log('Success', appState)
      history.push('/home')
    }
    
  }

  return (
    <div id="page-login">
      <div id="page-login-content" className="container">

        <div className="logo-container">
          <img src={logoImg} alt="Proffy logo" />
          <h2>Sua plataforma de<br/> estudos online.</h2>
        </div>

        <div className="login-container">
          <header id="login-header">
            <h1>Fazer login</h1>
            <p>Criar uma conta</p>
          </header>
          <form id="login-form" onSubmit={handleLogin}>
            <Input
              label=''
              name=''
              value={email}
              placeholder='E-mail'
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <Input
              label=''
              name=''
              type='password'
              value={password}
              placeholder='Senha'
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <div id='form-options'>
              <div id="remember-me">
                <input type='checkbox' />
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <p>Esqueci minha senha</p>
            </div>
            <button disabled={isDisabled} type='submit'>Entrar</button>
          </form>

          <footer>
            <div id="cadastrar">
              <p>Não tem conta? <br />
                <a href='#'>
                  <strong>Cadastre-se</strong>
                </a>
              </p>
            </div>
            <p>É de graça </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;