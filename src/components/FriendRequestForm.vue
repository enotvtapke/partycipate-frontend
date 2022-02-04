<template>
    <FindUsersInput class="input" v-model="users"></FindUsersInput>
    <div class="userList">
        <div class="user" v-for="user in users" :key="user.id" :class="userClass(user)" @click.once="addFriend(user)">
            <UserLink :user="user"/>
        </div>
    </div>
</template>

<script>
import FindUsersInput from '@/components/UI/FindUsersInput'
import UserLink from '@/components/UI/UserLink'
import { createFriendRequest, findAllOutgoingRequests } from '@/utils/friendsUtls'
import { findAllFriends } from '@/utils/userUtils'

export default {
    name: 'FriendRequestForm',
    components: {
        FindUsersInput,
        UserLink
    },
    data () {
        return {
            users: null,
            invitedUserIds: new Set(),
            friendIds: new Set()
        }
    },
    computed: {
        user () {
            return this.$store.getters.user
        }
    },
    async mounted () {
        findAllOutgoingRequests().then(requests => {
            this.invitedUserIds = new Set(requests.map(request => request.receiver.id))
        })
        findAllFriends(this.user.login).then(friends => {
            this.friendIds = new Set(friends.map(request => request.receiver.id))
        })
    },
    methods: {
        addFriend (user) {
            if (this.userClass(user) === 'uninvited-user') {
                createFriendRequest(user.login).then(friendRequest => {
                    console.log(this.invitedUserIds)
                    console.log(friendRequest.receiver)
                    this.invitedUserIds.add(friendRequest.receiver.id)
                })
            }
        },
        userClass (user) {
            if (this.user.id === user.id) {
                return 'creator'
            } else if (this.friendIds.has(user.id)) {
                return 'guest'
            } else if (this.invitedUserIds.has(user.id)) {
                return 'invited-user'
            } else {
                return 'uninvited-user'
            }
        }
    }
}
</script>

<style scoped>
.user {
    display: block;
    height: 2rem;
    line-height: 2rem;
}

.uninvited-user:hover {
    background-color: grey;
    cursor: pointer;
}

.userList {
    max-height: 20rem;
    overflow: auto;
}

.input {
    margin-bottom: 1rem;
}

.creator {
    background-color: purple;
}

.guest {
    background-color: yellow;
}

.invited-user {
    background-color: red;
}
</style>
