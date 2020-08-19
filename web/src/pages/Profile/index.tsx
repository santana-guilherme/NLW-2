import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { useAuth } from '../../contexts/auth';
import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

function Profile() {

  const { user, signed } = useAuth()
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  function getTeacherInfo() {
    
  }

  return (
    <div id="profile-page">
      <div id="profile-content" className="container">
        <PageHeader topTitle="Meu perfil">
          <div id="user-presentation">
            <div id="user-basic-info">
              <img src={user?.avatar ? user.avatar : "http://github.com/GDSRS.png"} alt='foto de perfil' />
              <h3>{user?.name} {user?.last_name}</h3>
              <p>Biologia</p>
            </div>
          </div>
        </PageHeader>

        <main>
          <form onSubmit={() => { }}>
            <fieldset>
              <legend>Seus dados</legend>
              <Input name="name"
                label="Nome"
                defaultValue={user?.name}
                onChange={(e) => { setName(e.target.value) }}
              />

              <Input name="last_name"
                label="Sobrenome"
                defaultValue={user?.last_name}
                onChange={(e) => { setLastName(e.target.value) }}
              />

              <Input name="email"
                label="E-mail"
                defaultValue={user?.email}
                onChange={(e) => { setEmail(e.target.value) }}
              />

              <Input
                name="whatsapp"
                defaultValue={whatsapp}
                label="Whatsapp"
                onChange={(e) => { setWhatsapp(e.target.value) }}
              />

              <Textarea
                name="bio"
                defaultValue={bio}
                label="Biografia"
                onChange={(e) => { setBio(e.target.value) }}
              />

            </fieldset>

            <footer>
              <button type='submit'>
                Salvar
              </button>
            </footer>
          </form>
        </main>

      </div>
    </div>
  );
}

export default Profile;