<template>
    <div v-if="user" class="user-page">
        <h3>{{ user.name }}</h3>
        <p class="text-muted">{{ user.login }}</p>
        <button class="btn btn-primary btn-sm" @click="onAddToFriends" v-if="$store.getters.user && $store.getters.user.id !== user.id">
            Add to friends
        </button>
        <div v-else>
            <router-link :to="{ name: 'UpdateUser', params: { login: user.login } }">Update credentials</router-link>
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#findFriendsModal">
                Find friends
            </button>
            <div class="modal" id="findFriendsModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Add friend</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <FriendRequestForm></FriendRequestForm>
                        </div>
                    </div>
                </div>
            </div>
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
import FriendRequestForm from '@/components/FriendRequestForm'

export default {
    name: 'User',
    components: {
        FriendRequestForm,
        NotFound,
        EventList,
        FriendList
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
