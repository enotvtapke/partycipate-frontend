<template>
    <router-link :to="{ name: 'Event', params: { id: event.id } }">
        {{ event.name }}
    </router-link>
</template>

<script>

export default {
    name: 'EventLink',
    props: {
        event: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
