import React from 'react';
import logoImg from '../../assets/images/logo.svg'
import './styles.css'

function LogoContainer() {
  return (

    <div className="logo-container">
      <div className="background-img">
        <img src={logoImg} alt="Proffy logo" />
        <h2>Sua plataforma de<br /> estudos online.</h2>
      </div>
    </div>

  );
}

export default LogoContainer;