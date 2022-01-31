<template>
    {{ user.name }}
</template>

<script>
export default {
    name: 'UserPreview',
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
