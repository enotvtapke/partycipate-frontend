<template>
    <div v-if="user" class="user-page">
        <p>{{ user.login }}</p>
        <p>{{ user.name }}</p>
        <button @click="onAddToFriends" v-if="$store.getters.user && $store.getters.user.id !== user.id">Add to friends</button>
        <router-link v-if="$store.getters.user && $store.getters.user.id === user.id"
                     :to="{ name: 'UpdateUser', params: { login: user.login } }">Update credentials
        </router-link>
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
import { addFriend } from '@/utils/friendsUtls'

export default {
    name: 'User',
    components: {
        NotFound,
        EventList
    },
    data: function () {
        return {
            user: undefined,
            userEvents: undefined
        }
    },
    methods: {
        onAddToFriends () {
            addFriend(this.user.login)
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
