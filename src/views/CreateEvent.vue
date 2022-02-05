<template>
    <EventForm :serverValidationError="serverValidationError" @onSubmit="onCreateEvent"></EventForm>
</template>

<script>
import { createEvent } from '@/utils/eventUtils'
import EventForm from '@/components/EventForm'

export default {
    name: 'CreateEvent',
    components: {
        EventForm
    },
    data: function () {
        return {
            serverValidationError: null
        }
    },
    methods: {
        onCreateEvent (event) {
            createEvent(event).then(event => {
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
