import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nlw2-proffy-server.herokuapp.com'
  //'http://192.168.0.103:3333'
})

export default api;