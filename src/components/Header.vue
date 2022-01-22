<template>
  <header>
    <router-link class="logo" :to="{ name: 'Index' }"><img alt="Eventer" src="@/assets/logo.png"></router-link>
    <nav>
      <ul>
        <li><router-link :to="{ name: 'Index' }">Home</router-link></li>
        <li v-if="user"><router-link :to="{ name: 'CreateEvent' }">Create event</router-link></li>
      </ul>
    </nav>
    <div class="nav-enter">
      <template v-if="user">
        <UserLink :user=user></UserLink>
        |
        <a href="#" @click.prevent="onLogout">Logout</a>
      </template>
      <template v-else>
        <router-link to="/enter">Enter</router-link>
        |
        <router-link to="/register">Register</router-link>
      </template>
    </div>
  </header>
</template>

<script>
import UserLink from '@/components/UI/UserLink'
import { logout } from '@/utils/userUtils'

export default {
  name: 'Header.vue',
  components: { UserLink },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    onLogout () {
      logout()
    }
  }
}
</script>

<style scoped>
  header {
    border-bottom: 2px var(--border-color) solid;
    margin-bottom: 1rem;
    height: 3rem;
  }

  .logo img {
    padding-top: 0.25rem;
    height: 2rem;
    margin-right: 2rem;
  }

  header * {
    display: inline-block;
  }

  header nav ul {
    margin: 0;
    padding: 0;
  }

  header nav li {
    margin-right: 2rem;
  }

  .nav-enter {
    float: right;
    line-height: 2rem;
    vertical-align: middle;
  }
</style>
