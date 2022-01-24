<template>
    <Header/>
    <div class="middle">
        <main>
            <router-view :key="this.$route.params.login"/>
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
    }
}
</script>

<style lang="scss">
@import 'assets/css/styles.scss';
@import 'assets/css/normalize.css';
</style>
