import React, { useState, useEffect, FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import LogoContainer from '../../components/LogoContainer';
import AuthContext from '../../contexts/auth';

import './styles.css'

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)
  const { signed, user, logIn } = useContext(AuthContext)

  console.log('USER LOGIN', user)
  console.log('SIGNED', signed)

  useEffect(() => {
    if (email.replace(/ /g, "") !== '' && password.replace(/ /g, "") !== '') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [password, email])

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    logIn(email, password);
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