import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import LogoContainer from '../../components/LogoContainer';
import { useAuth } from '../../contexts/auth';
import PasswordInput from '../../components/PasswordInput'

import './styles.css'

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const { logIn } = useAuth()

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    logIn(email, password, remember);
  }

  return (
    <div id="page-login">
      <div id="page-login-content" className="container">

        <LogoContainer />

        <div className="login-container">
          <header id="login-header">
            <h1>Fazer login</h1>
            <Link to='/register'>
              Criar uma conta
            </Link>
          </header>
          <form id="login-form" onSubmit={handleLogin}>
            <Input
              label=''
              name=''
              value={email}
              placeholder='E-mail'
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <PasswordInput
              label=''
              name=''
              value={password}
              placeholder='Senha'
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <div id='form-options'>

              <label>
                Lembrar-me
                <input 
                  type='checkbox'
                  checked={remember}
                  onChange={() => setRemember(!remember)}/>
                <span></span>
              </label>

              <Link to='/forgot-password'>Esqueci minha senha</Link>
            </div>
            <button
              disabled={
                email.trim() === '' || password.trim() === ''
              }
              type='submit'
            >
              Entrar
            </button>
          </form>

          <footer>
            <div id="cadastrar">
              <p>Não tem conta? <br />
                <Link to='/register'>
                  <strong>Cadastre-se</strong>
                </Link>
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