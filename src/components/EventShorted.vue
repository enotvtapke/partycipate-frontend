<template>
    <div class="event">
        <div class="creator">By:
            <UserLink :user="event.creator"></UserLink>
        </div>
        <router-link :to="{ name: 'Event', params: { id: event.id } }" class="name"><h2>{{ event.name }}</h2>
        </router-link>
        <div class="information">
            <div class="date">Date: {{ event.date }}</div>
            <div class="location">Location: {{ event.location }}</div>
            <div class="price">Price: {{ event.price }}</div>
        </div>
        <div class="description">{{
                event.description && event.description.length > 255 ? event.description.substring(0, 255) + '…' : event.description
            }}
        </div>
    </div>
</template>

<script>
import UserLink from '@/components/UI/UserLink'

export default {
    name: 'EventShorted',
    components: {
        UserLink
    },
    props: {
        event: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
