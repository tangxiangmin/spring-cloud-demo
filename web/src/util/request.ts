import axios, { AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 10000
})

http.interceptors.request.use((config) => {
  return config
})
http.interceptors.response.use((res) => {
  return res.data
})

export default http
