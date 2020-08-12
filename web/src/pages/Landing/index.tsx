import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import logoutIcon from '../../assets/images/icons/logout-icon.svg';


import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import AuthContext from '../../contexts/auth';


function Landing() {
  const [totalConnections, setTotalConnections] = useState(0)
  const { logOut } = useContext(AuthContext)

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data
      setTotalConnections(total)
    })
  }, [])

  function handleLogOut() {
    logOut();
  }

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">

        <div id="top">
          <div id="user-header">
            <div id="user-info">
              <img src="http://github.com/GDSRS.png" alt="foto do usuário" />
              <p>User name</p>
            </div>
            <img src={logoutIcon} alt="botão sair" onClick={handleLogOut}/>
          </div>

          <div className="logo-container-landing">
            <img src={logoImg} alt="Proffy logo" />
            <h2>Sua plataforma de<br/> estudos online.</h2>
          </div>

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        </div>

        <div id="bottom">
          <p id="text-presentation">
            Seja bem-vindo<br />
            <strong>O que deseja fazer ?</strong>
          </p>
          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Lecionar" />
            Lecionar
          </Link>
          </div>

          <span className="total-connections">
            Total de {totalConnections} conexões<br/>
            já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Landing;