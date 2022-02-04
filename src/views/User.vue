<template>
    <div v-if="user" class="user-page">
        <p>{{ user.login }}</p>
        <p>{{ user.name }}</p>
        <button @click="onAddToFriends" v-if="$store.getters.user && $store.getters.user.id !== user.id">Add to
            friends
        </button>
        <div v-else>
            <PopupWithButtonTrigger>
                <FriendRequestForm></FriendRequestForm>
            </PopupWithButtonTrigger>
            <router-link :to="{ name: 'UpdateUser', params: { login: user.login } }">Update credentials</router-link>
        </div>
        <FriendList :friends="userFriends"/>
        <EventList :events="userEvents"/>
    </div>
    <div v-else-if="user === null">
        <NotFound></NotFound>
    </div>
</template>

<script>
import NotFound from '@/views/NotFound'
import EventList from '@/components/EventList'
import FriendList from '@/components/FriendList'
import { findAllFriends, findByLogin } from '@/utils/userUtils'
import { findAllByCreatorLogin } from '@/utils/eventUtils'
import { createFriendRequest } from '@/utils/friendsUtls'
import PopupWithButtonTrigger from '@/components/UI/PopupWithButtonTrigger'
import FriendRequestForm from '@/components/FriendRequestForm'

export default {
    name: 'User',
    components: {
        FriendRequestForm,
        NotFound,
        EventList,
        FriendList,
        PopupWithButtonTrigger
    },
    data: function () {
        return {
            user: undefined,
            userEvents: undefined,
            userFriends: undefined
        }
    },
    methods: {
        onAddToFriends () {
            createFriendRequest(this.user.login)
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
        findAllFriends(this.$route.params.login).then(friends => {
            this.userFriends = friends
        }).catch(() => {
            this.userFriends = null
        })
    }
}
</script>

<style scoped>

</style>
