import axios from 'axios'

export const network = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5 * 1000
})

network.interceptors.request.use(
  (config) => {
    config.headers.icode = 'helloqianduanxunlianying'

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

network.interceptors.response.use(
  (response) => {
    const { data, message, success } = response.data
    if (success) {
      return data
    }
    return Promise.reject(new Error(message))
  },
  (error) => {
    return Promise.reject(error)
  }
)
