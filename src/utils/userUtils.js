import store from '@/store'
import axios from 'axios'

async function enter (login, password) {
  await axios.get('/api/v1/user/createJwt', {
    params: {
      login,
      password
    }
  }).then(response => {
    const jwt = response.data
    localStorage.setItem('jwt', jwt)
    auth(jwt)
  }).catch(error => {
    throw error.response
  })
}

async function auth (jwt) {
  await axios.get('/api/v1/user/enter', {
    params: {
      jwt
    }
  }).then(response => {
    store.commit('setUser', response.data)
  }).catch(error => {
    throw error.response
  })
}

async function register (login, name, password) {
  return await axios.post('/api/v1/user/register', {
    login,
    name,
    password
  }).then(response => {
    return response.data
  }).catch(error => {
    throw error.response
  })
}

function logout () {
  localStorage.removeItem('jwt')
  store.commit('setUser', null)
}

export { enter, logout, auth, register }
