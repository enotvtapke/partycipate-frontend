<template>
    <div class="invite">
        To: <EventLink :event="invite.event"/>
        Status: {{ invite.status }}
        <div v-if="invite.status !== 'ACCEPTED'">
            <button class="accept-invite-button" @click="accept(invite)">Accept</button>
            <button v-if="invite.status !== 'REJECTED'" class="ignore-invite-button" @click="reject(invite)">Ignore</button>
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
        invite: {
            type: Object,
            required: true
        }
    },
    methods: {
        accept (invite) {
            accept(invite.id).then(invite => {
                // eslint-disable-next-line vue/no-mutating-props
                this.invite.status = invite.status
            })
        },
        reject (invite) {
            reject(invite.id).then(invite => {
                // eslint-disable-next-line vue/no-mutating-props
                this.invite.status = invite.status
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
