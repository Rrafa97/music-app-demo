import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://rrafa.icu:3000/',
  headers: {
    'withCredentials': 'true'
  }
  // baseURL: 'http://192.168.5.108:8080/'
})

axios.interceptors.request.use(config => {
  return config
}, (error) => {
  console.log(error)
})

axios.interceptors.response.use(response => {
  // return JSON.parse(response)
  return response
}, error => {
  console.log(error)
})

export default instance
