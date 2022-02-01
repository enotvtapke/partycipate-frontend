<template>
    <FindUsersInput class="input" v-model="users"></FindUsersInput>
    <div class="userList">
        <div class="user" v-for="user in users" :key="user.id" :class="userClass(user)" @click.once="invite(user)">
            <UserPreview :user="user"/>
        </div>
    </div>
</template>

<script>
import FindUsersInput from '@/components/UI/FindUsersInput'
import UserPreview from '@/components/UI/UserPreview'
import { findAllByEventId, invite } from '@/utils/inviteUtils'

export default {
    name: 'InviteForm',
    components: {
        FindUsersInput,
        UserPreview
    },
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            users: null,
            invitedUserIds: new Set(),
            guestIds: new Set()
        }
    },
    async beforeCreate () {
        this.guestIds = new Set((this.event.guests).map(guest => guest.id))
        this.invitedUserIds = new Set((await findAllByEventId(this.event.id)).map(invite => invite.receiver.id))
    },
    methods: {
        invite (user) {
            if (this.userClass(user) === 'uninvited-user') {
                invite(this.event.id, user.id).then(invite => {
                    this.invitedUserIds.add(invite.receiver.id)
                })
            }
        },
        userClass (user) {
            if (this.event.creator.id === user.id) {
                return 'creator'
            } else if (this.guestIds.has(user.id)) {
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
