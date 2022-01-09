<template>
  <header>
    <router-link class="logo" to="/"><img alt="Eventer" src="@/assets/logo.png"></router-link>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
      </ul>
    </nav>
    <div class="nav-enter">
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
  header {
    border-bottom: 2px var(--border-color) solid;
    margin-bottom: 1rem;
    height: 3rem;
  }

  .logo img {
    padding-top: 0.25rem;
    height: 2rem;
  }

  header * {
    display: inline-block;
  }

  header nav ul {
    margin: 0;
    padding: 0;
  }

  .nav-enter {
    float: right;
    line-height: 2rem;
    vertical-align: middle;
  }
</style>
