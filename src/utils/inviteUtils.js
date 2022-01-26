import axios from 'axios'

async function invite (event, receiver) {
    return await axios.post('/api/v1/invite/create', {
        eventId: event.id,
        receiverId: receiver.id,
        jwt: localStorage.getItem('jwt')
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

export { invite }
