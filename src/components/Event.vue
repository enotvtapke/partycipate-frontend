<template>
    <div class="event">
        <div class="creator">By:
            <UserLink :user="event.creator"></UserLink>
        </div>
        <div class="name text-primary"><h2>{{ event.name }}</h2></div>
        <div class="information">
            <div class="date">Date: {{ event.date }}</div>
            <div class="location">Location: {{ event.location }}</div>
            <Map v-if="event.coordinates.lng && event.coordinates.lat" :centerCoords="event.coordinates" :markerCoords="event.coordinates"></Map>
            <div class="price">Price: {{ event.price }}</div>
        </div>
        <div class="description">{{ event.description }}</div>
        <div class="guests">
            <GuestList :guests="event.guests"></GuestList>
        </div>
        <div v-if="$store.getters.user && $store.getters.user.id === event.creator.id">
            <router-link
                :to="{ name: 'UpdateEvent', params: { id: event.id } }">Update event
            </router-link>
            <button @click="togglePopup()">Invite users</button>
            <Popup
                v-if="popupTrigger"
                :TogglePopup="togglePopup">
                <h2>Invite:</h2>
                <InviteForm :event="event"></InviteForm>
            </Popup>
        </div>
    </div>
</template>

<script>
import UserLink from '@/components/UI/UserLink'
import Map from '@/components/UI/Map'
import Popup from '@/components/UI/Popup'
import InviteForm from '@/components/InviteForm'
import GuestList from '@/components/GuestsList'

export default {
    name: 'Event',
    components: {
        GuestList,
        UserLink,
        Map,
        Popup,
        InviteForm
    },
    data () {
        return {
            popupTrigger: false
        }
    },
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    methods: {
        togglePopup () {
            this.popupTrigger ^= true
        }
    }
}
</script>

<style scoped>

</style>
