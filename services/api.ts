import axios from 'axios'

const API = axios.create({
  baseURL: 'https://court-scheduler.herokuapp.com/api/',
})

export default API
