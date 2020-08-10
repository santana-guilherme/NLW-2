import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css';
import api from '../../services/api';

function Register() {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault()
    api.post('/register', {
      name,
      last_name,
      email,
      password
    })
    .then(response => alert(response.data.message))
    .catch(err => {
      console.log(err)
      alert(`ERRO${err.error}`)
    })
  }

  return (
    <div id="register-page">
      <div id="page-register-content" className="container">
        <main>
          <form id="user-register-form" onSubmit={handleRegisterSubmit}>
            <header>
              <Link to='/'>
                <img src={backIcon} alt="voltar" />
              </Link>
            </header>
            <div id="form-title">
              <h1>Cadastro</h1>
              <p>Preencha os dados abaixo<br /> para começar</p>
            </div>

            <Input name="name"
              label=""
              placeholder="Nome"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
            <Input name="last_name"
              label=""
              placeholder="Sobrenome"
              value={last_name}
              onChange={(e) => { setLastName(e.target.value) }}
            />
            <Input name="email"
              label=""
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <Input name="password"
              label=""
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <button type='submit'>
              Concluir cadastro
            </button>
          </form>
        </main>
        <div className="logo-container">
          <img src={logoImg} alt="Proffy logo" />
          <h2>Sua plataforma de<br /> estudos online.</h2>
        </div>
      </div>
    </div>
  )
}

export default Register;