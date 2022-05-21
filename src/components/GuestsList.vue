<template>
    <div class="mt-2 mb-2">
        <div v-if="guests.length === 0">No guests</div>
        <span v-for="guest in guests" :key="guest">
            <UserLink :user="{ login: guest }"/>
        </span>
    </div>
</template>

<script>
import UserLink from '@/components/UI/UserLink'

export default {
    name: 'GuestList',
    components: {
        UserLink
    },
    props: {
        guests: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style scoped>

</style>
