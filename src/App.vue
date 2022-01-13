<template>
  <Header/>
  <div class="middle">
    <main>
      <router-view/>
    </main>
  </div>
  <Footer/>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  beforeMount () {
    const jwt = localStorage.getItem('jwt')
    if (jwt && !this.user) {
      this.$store.dispatch('auth', jwt)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/css/styles.scss';
</style>
