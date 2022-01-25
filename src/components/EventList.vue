<template>
    <div v-for="event in events" :key="event.login">
        <EventShorted :event="event"></EventShorted>
    </div>
</template>

<script>
import EventShorted from '@/components/EventShorted'

export default {
    name: 'EventList',
    components: {
        EventShorted
    },
    props: {
        events: Array
    }
}
</script>

<style scoped>

</style>
