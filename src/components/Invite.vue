<template>
    <div class="invite">
        To: <EventLink :event="invite.event"/>
        Status: {{ invite.status }}
        <div v-if="invite.status !== 'ACCEPTED'">
            <button class="btn btn-success btn-sm me-2" @click="accept(invite)">Accept</button>
            <button class="btn btn-danger btn-sm" v-if="invite.status !== 'REJECTED'" @click="reject(invite)">Ignore</button>
        </div>
    </div>
</template>

<script>
import EventLink from '@/components/UI/EventLink'
import { accept, reject } from '@/utils/inviteUtils'
export default {
    name: 'Invite',
    components: { EventLink },
    props: {
        invite: Object
    },
    methods: {
        accept (invite) {
            accept(invite.id).then(invite => {
                this.$emit('update', invite)
            })
        },
        reject (invite) {
            reject(invite.id).then(invite => {
                this.$emit('update', invite)
            })
        }
    }
}
</script>

<style scoped>
    .invite {
        margin-bottom: 1rem;
    }
</style>
