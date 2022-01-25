import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            user: null
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        isAuth (state) {
            return state.user != null
        }
    },
    mutations: {
        setUser (state, user) {
            state.user = user
        }
    }
})

export default store
