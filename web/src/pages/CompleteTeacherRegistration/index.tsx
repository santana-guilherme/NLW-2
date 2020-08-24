import React from 'react';
import CompletePage from '../../components/CompletePage';

function CompleteTeacherRegistration() {
  return (
    <CompletePage
      title="Cadastro salvo !"
      buttonLabel="Acessar Lista"
      link="/study"
    >
      <p>Tudo certo, seu cadastro está na nossa lista de professores.</p>
      <p>Agora é só ficar de olho no Whatsapp.</p>
    </CompletePage>

  );
}

export default CompleteTeacherRegistration;