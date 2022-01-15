import axios from 'axios'

async function createEvent (name, date, location, description, price) {
  return await axios.post('/api/v1/event/create', {
    name,
    date,
    location,
    description,
    price,
    jwt: localStorage.getItem('jwt')
  }).then(response => {
    return response.data
  }).catch(error => {
    throw error.response
  })
}

export { createEvent }
