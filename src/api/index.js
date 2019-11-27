import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

apiClient.interceptors.request.use(config => {
  store.dispatch('startLoading')
  return config
})

apiClient.interceptors.response.use(response => {
  store.dispatch('doneLoading')
  return response
}, error => {
  console.error(error)
  store.dispatch('doneLoading')
})

export default apiClient