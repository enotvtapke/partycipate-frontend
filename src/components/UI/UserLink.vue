<template>
    <router-link :to="'/user/' + user.login">{{ user.name }}</router-link>
</template>

<script>
export default {
    name: 'UserLink',
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
