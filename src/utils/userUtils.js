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

async function update (user) {
    user.jwt = localStorage.getItem('jwt')
    return await axios.put('/api/v1/user/update', user).then(response => {
        return response.data
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

async function findByLogin (login) {
    return await axios.get('/api/v1/user/findByLogin', {
        params: {
            login
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}

async function findByLoginPrefix (loginPrefix) {
    return await axios.get('/api/v1/user/findAllByLoginPrefix', {
        params: {
            prefix: loginPrefix
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}

async function isLoginVacant (value) {
    return await axios.get('/api/v1/user/isLoginVacant', {
        params: {
            login: value
        }
    }).then((response) => {
        return response.data
    }).catch(() => {
        return false
    })
}

async function register (user) {
    return await axios.post('/api/v1/user/register', user).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

function logout () {
    localStorage.removeItem('jwt')
    store.commit('setUser', null)
}

export { enter, logout, auth, register, isLoginVacant, findByLogin, findByLoginPrefix, update }
