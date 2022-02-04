import axios from 'axios'

async function createFriendRequest (login) {
    console.log(login)
    return await axios.post('/api/v1/friendRequest/create', {
        receiverLogin: login,
        senderJwt: localStorage.getItem('jwt')
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

async function findAllOutgoingRequests () {
    return await axios.get('/api/v1/friendRequest/findAllOutgoing', {
        params: {
            senderJwt: localStorage.getItem('jwt')
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

async function findAllIncomingRequests () {
    return await axios.get('/api/v1/friendRequest/findAllIncoming', {
        params: {
            receiverJwt: localStorage.getItem('jwt')
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

export { createFriendRequest, findAllIncomingRequests, findAllOutgoingRequests }
