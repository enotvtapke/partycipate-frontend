import axios from 'axios'

async function createEvent (event) {
    event.jwt = localStorage.getItem('jwt')
    return await axios.post('/api/v1/event/create', event).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

async function updateEvent (event) {
    event.jwt = localStorage.getItem('jwt')
    return await axios.post('/api/v1/event/update', event).then(response => {
        return response.data
    }).catch(error => {
        throw error.response
    })
}

async function findById (id) {
    return await axios.get('/api/v1/event/findById', {
        params: {
            id: id
        }
    }).then(response => {
        return response.data
    }).catch((error) => {
        throw error
    })
}

export { createEvent, findById, updateEvent }
