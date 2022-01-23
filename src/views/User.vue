<template>
    <div v-if="user" class="user-page">
        <p>{{ user.login }}</p>
        <p>{{ user.name }}</p>
        <router-link v-if="$store.getters.user.id === user.id"
                     :to="{ name: 'UserUpdate', params: { id: user.id } }">Update credentials</router-link>
        <EventList :events="userEvents"></EventList>
    </div>
    <div v-else-if="user === null">
        <NotFound></NotFound>
    </div>
</template>

<script>
import NotFound from '@/views/NotFound'
import EventList from '@/components/EventList'
import { findByLogin } from '@/utils/userUtils'
import { findAllByCreatorLogin } from '@/utils/eventUtils'

export default {
    name: 'User',
    components: { NotFound, EventList },
    data: function () {
        return {
            user: undefined,
            userEvents: undefined
        }
    },
    beforeMount () {
        findByLogin(this.$route.params.login).then(user => {
            this.user = user
        }).catch(() => {
            this.user = null
        })
        findAllByCreatorLogin(this.$route.params.login).then(events => {
            this.userEvents = events
        }).catch(() => {
            this.userEvents = null
        })
    }
}
</script>

<style scoped>

</style>
