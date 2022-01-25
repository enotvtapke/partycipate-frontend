import axios from 'axios'

async function addFriend (login) {
    await axios.post('/api/v1/friendRequest/create', {
        receiverLogin: login,
        senderJwt: localStorage.getItem('jwt')
    }).catch(error => {
        throw error.response
    })
}

export { addFriend }
