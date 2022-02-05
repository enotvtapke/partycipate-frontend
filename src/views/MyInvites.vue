<template>
    <button @click="refresh" class="btn btn-secondary btn-sm">Refresh</button>
    <div class="invites mt-2">
        <div>
            Waiting:
            <Invite v-for="invite of waiting" :key="invite.id" :invite="invite" @update="update"/>
        </div>
        <div>
            Accepted:
            <Invite v-for="invite of accepted" :key="invite.id" :invite="invite" @update="update"/>
        </div>
        <div>
            Ignored:
            <Invite v-for="invite of ignored" :key="invite.id" :invite="invite" @update="update"/>
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
            invites: [],
            idToIndex: null
        }
    },
    computed: {
        waiting () {
            return this.invites.filter(invite => invite.status === 'WAITING')
        },
        accepted () {
            return this.invites.filter(invite => invite.status === 'ACCEPTED')
        },
        ignored () {
            return this.invites.filter(invite => invite.status === 'REJECTED')
        }
    },
    async beforeMount () {
        await this.refresh()
    },
    methods: {
        update (invite) {
            this.invites[this.idToIndex.get(invite.id)] = invite
        },
        async refresh () {
            this.invites = []
            this.invites = await findAllIncoming()
        }
    },
    watch: {
        invites (newValue) {
            this.idToIndex = new Map(newValue.map((invite, index) => [invite.id, index]))
        }
    }
}
</script>

<style scoped>
    .invites > * {
        margin-bottom: 1rem;
    }
    .refresh {
        margin-bottom: 1rem;
    }
</style>
