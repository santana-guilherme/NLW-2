<h1 align="center">
  <img alt="NextLevelWeek#2" src="./layouts/app-logo.png">
</h1>

<h3 align="center">Proffy - A plataforma que conecta estudantes e professores</h3>

<h5 align="center">🚧 Em construção... 🚧</h5>

<p align="center">
  <img alt="node version" src="https://img.shields.io/static/v1?label=node&message=12.18.3&color=79dd2c&style=for-the-badge"/>
  
  <img alt="repository size" src="https://img.shields.io/github/repo-size/GDSRS/NLW-2?color=79dd2c&style=for-the-badge"/>

  <img alt="last commit" src="https://img.shields.io/github/last-commit/GDSRS/NLW-2?color=79dd2c&style=for-the-badge"/>

  <img alt="node version" src="https://img.shields.io/static/v1?label=license&message=MIT&color=79dd2c&style=for-the-badge"/>
  <br/>

  <img alt="node version" src="https://img.shields.io/static/v1?label=made by&message=Guilherme Sant'Ana&color=8257e5&style=for-the-badge"/>
</p>

## Sobre
Esse projeto permite o cadastro de professores e alunos. Os professores  informam os horários e as matérias que gostariam de lecionar e os alunos podem buscar e entrar em contato com os professores casdastrados para marcarem aulas particulares.

## Tecnologias
<ul>
  <li>ReactJS</li>
  <li>Typescript</li>
  <li>Expo</li>
  <li>NodeJS</li>
  <li>React Native</li>
</ul>

## Executando a aplicação :rocket:

#### Pré-requisitos
<ul>
  <li><a href="https://docs.docker.com/engine/install/">Docker</a></li>
  <li><a href="https://docs.docker.com/compose/install/">Docker Componse</a></li>
</ul>

Após clonar o repositório 
```bash
git clone https://github.com/GDSRS/NLW-2.git
cd NLW-2
```
execute a aplicação que desejar.

#### Rodando a aplicação web
```bash
docker-compose run web
yarn start
```

#### Rodando a aplicação server
```bash
docker-compose run server
yarn start
```

#### Rodando a aplicação mobile
```bash
docker-compose run mobile
yarn start
```