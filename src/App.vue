<template>
    <Header/>
    <main class="container mt-3 mb-3">
        <router-view :key="this.$route.params.login"/>
    </main>
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
    }
}
</script>

<style lang="scss">
@import 'assets/css/styles.scss';
</style>
