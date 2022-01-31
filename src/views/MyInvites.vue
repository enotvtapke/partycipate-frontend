<template>
    <div class="invites">
        <div>
            Waiting:
            <Invite v-for="invite in waiting" :key="invite.id" :invite="invite"/>
        </div>
        <div>
            Accepted:
            <Invite v-for="invite in accepted" :key="invite.id" :invite="invite"/>
        </div>
        <div>
            Rejected:
            <Invite v-for="invite in ignored" :key="invite.id" :invite="invite"/>
        </div>
    </div>
</template>

<script>
import { findAllIncoming } from '@/utils/inviteUtils'
import Invite from '@/components/Invite'

export default {
    name: 'MyInvites',
    components: { Invite },

    data () {
        return {
            waiting: [],
            accepted: [],
            ignored: []
        }
    },
    async beforeCreate () {
        const invites = await findAllIncoming()
        this.waiting = invites.filter(invite => invite.status === 'WAITING')
        this.accepted = invites.filter(invite => invite.status === 'ACCEPTED')
        this.ignored = invites.filter(invite => invite.status === 'REJECTED')
    }
}
</script>

<style scoped>
    .invites > * {
        margin-bottom: 1rem;
    }
</style>
