<template>
    <router-link @click.stop :to="{ name: 'User', params: { login: user.login } }">
        <UserPreview :user="user"/>
    </router-link>
</template>

<script>
import UserPreview from '@/components/UI/UserPreview'

export default {
    name: 'UserLink',
    components: { UserPreview },
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
