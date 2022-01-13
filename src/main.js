import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import axios from 'axios'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: null
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    auth ({ commit }, jwt) {
      axios.get('/api/v1/user/enter', {
        params: {
          jwt
        }
      }).then(response => {
        commit('setUser', response.data)
      }).catch(error => {
        throw error
      })
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
