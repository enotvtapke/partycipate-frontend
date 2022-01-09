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
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import 'assets/css/styles.scss';
</style>
