import axios from 'axios'
// import store from '@/store/index.js'


const network = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5 * 1000
})

network.interceptors.request.use((config) => {
  config.headers.icode = 'helloqianduanxunlianying'

  // if (store.getters.token) {
  //   // 如果token存在 注入token
  //   config.headers.Authorization = `Bearer ${store.getters.token}`
  // }

  return config
}, (error) => {
  return Promise.reject(error)
})

network.interceptors.response.use((response) => {
  const { data, message, success } = response.data
  if (success) {
    return data
  }
  return Promise.reject(new Error(message))
}, (error) => {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.code === 401
  ) {
    // TODO: token超时
    // store.dispatch('userStore/logout')
  }
  return Promise.reject(error)
})

export default network
