<template>
  <header>
    <router-link to="/"><img alt="Eventer" src="@/assets/logo.png"></router-link>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <div class="enter">
      <router-link to="/enter">Enter</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header.vue'
}
</script>

<style scoped>

</style>
