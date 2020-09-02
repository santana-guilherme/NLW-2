import React from 'react';
import { Link } from 'react-router-dom';
import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css'

interface CompletePageProps {
  title: string,
  buttonLabel: string,
  link: string
}

const CompletePage: React.FC<CompletePageProps> = ({ children, title, buttonLabel, link }) => {
  return (
    <div id="complete-page" className='container'>
      <main>
        <div id="complete-page-content">
          <div id="complete-page-information">
            <img src={successIcon} alt="tarefa realizado com sucesso" />
            <h2>{title}</h2>
            {children}
          </div>
          <Link to={link}>
            {buttonLabel}
          </Link>

        </div>
      </main>
    </div>
  );
}

export default CompletePage;