import axios from 'axios'

async function invite (eventId, receiverId) {
    return await axios.post('/api/v1/invite/create', {
        eventId: eventId,
        receiverId: receiverId,
        jwt: localStorage.getItem('jwt')
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

async function findAllByEventId (eventId) {
    return await axios.get('/api/v1/invite/findAllByEventId', {
        params: {
            eventId: eventId,
            creatorJwt: localStorage.getItem('jwt')
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

async function findAllIncoming () {
    return await axios.get('/api/v1/invite/findAllIncoming', {
        params: {
            jwt: localStorage.getItem('jwt')
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

async function accept (inviteId) {
    console.log(inviteId)
    return await axios.put('/api/v1/invite/accept', null, {
        params: {
            id: inviteId,
            receiverJwt: localStorage.getItem('jwt')
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

async function reject (inviteId) {
    return await axios.put('/api/v1/invite/reject', null, {
        params: {
            id: inviteId,
            receiverJwt: localStorage.getItem('jwt')
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

export { invite, findAllByEventId, findAllIncoming, accept, reject }
