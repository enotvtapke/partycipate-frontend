<template>
    <EventForm v-if="event" :serverValidationError="serverValidationError" :eventProp="event" @submit="onUpdateEvent"></EventForm>
</template>

<script>
import { updateEvent, findById } from '@/utils/eventUtils'
import EventForm from '@/components/EventForm'

export default {
    name: 'UpdateEvent',
    components: {
        EventForm
    },
    data: function () {
        return {
            event: null,
            serverValidationError: null
        }
    },
    beforeMount () {
        findById(this.$route.params.id).then(event => {
            if (event.creator.id !== this.$store.getters.user.id) {
                this.$router.push({ name: 'Index' })
            } else {
                this.event = event
            }
        }).catch(() => {
            this.$router.push({ name: 'NotFound' })
        })
    },
    methods: {
        onUpdateEvent (event) {
            updateEvent(event).then(event => {
                this.$router.push('/event/' + event.id)
            }).catch(error => {
                this.serverValidationError = error.data
            })
        }
    }
}
</script>

<style scoped>
</style>
