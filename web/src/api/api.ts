import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.duecheck.com.br/api/v1',
})
