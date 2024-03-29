import store from '@/store'
import axios from 'axios'
import router from '@/router'

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

async function isLoginVacant (login) {
    return await axios.get('/api/v1/user/isLoginVacant', {
        params: {
            login
        }
    }).then(response => {
        return response.data
    }).catch(() => {
        return false
    })
}

async function isEmailVacant (email) {
    return await axios.get('/api/v1/user/isEmailVacant', {
        params: {
            email
        }
    }).then(response => {
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

async function findAllFriends (login) {
    return await axios.get('/api/v1/user/findAllFriends', {
        params: {
            login
        }
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

async function requestPasswordChange (loginOrEmail) {
    await axios.get('/api/v1/user/requestPasswordChange', {
        params: {
            loginOrEmail
        }
    }).then(() => {
        router.push({ name: 'MessagePage', params: { message: 'Check your email' } })
    }).catch(error => {
        router.push({ name: 'MessagePage', params: { message: error.response.data } })
    })
}

export {
    enter,
    logout,
    auth,
    register,
    isLoginVacant,
    isEmailVacant,
    findByLogin,
    findByLoginPrefix,
    findAllFriends,
    update,
    requestPasswordChange
}
