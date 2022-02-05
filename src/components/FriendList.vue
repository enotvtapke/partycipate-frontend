<template>
    <div class="mt-2 mb-2">
        <div v-if="friends.length === 0">No friends</div>
        <span v-for="friend in friends" :key="friend.login">
        <UserLink :user="friend"/>
    </span>
    </div>
</template>

<script>
import UserLink from '@/components/UI/UserLink'

export default {
    name: 'FriendList',
    components: {
        UserLink
    },
    props: {
        friends: {
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
