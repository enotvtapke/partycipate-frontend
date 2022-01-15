<template>
  <div v-if="user" class="user-page">
    <p>{{ user.login }}</p>
    <p>{{ user.name }}</p>
  </div>
  <div v-else-if="user === null">
    <NotFound></NotFound>
  </div>
</template>

<script>
import axios from 'axios'
import NotFound from '@/views/NotFound'

export default {
  name: 'User',
  components: { NotFound },
  data: function () {
    return {
      user: undefined
    }
  },
  beforeMount () {
    axios.get('/api/v1/user/findByLogin', {
      params: {
        login: this.$route.params.login
      }
    }).then(response => {
      this.user = response.data
    }).catch(() => {
      this.user = null
    })
  }
}
</script>

<style scoped>

</style>
