import axios from 'axios'

async function createEvent (name, date, location, coords, description, price) {
    return await axios.post('/api/v1/event/create', {
        name,
        date,
        location,
        coords,
        description,
        price,
        jwt: localStorage.getItem('jwt')
    }).then(response => {
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

export { createEvent, findById }
