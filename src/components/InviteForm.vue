<template>
    <FindUsersInput class="input" v-model="users"></FindUsersInput>
    <div class="userList">
        <div class="user" v-for="user in users" :key="user.id" @click="invite(user)">
            <UserLink :user="user" @click.prevent></UserLink>
        </div>
    </div>
</template>

<script>
import FindUsersInput from '@/components/UI/FindUsersInput'
import UserLink from '@/components/UI/UserLink'
import { invite } from '@/utils/inviteUtils'

export default {
    name: 'InviteForm',
    components: {
        FindUsersInput,
        UserLink
    },
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            users: null
        }
    },
    methods: {
        invite (user) {
            invite(this.event, user).then((invite) => {
                console.log(invite)
            })
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
    .user:hover {
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
</style>
