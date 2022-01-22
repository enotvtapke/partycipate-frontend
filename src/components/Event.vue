<template>
  <div class="event">
    <div class="creator">By: <UserLink :user="event.creator"></UserLink></div>
    <div class="name"><h2>{{ event.name }}</h2></div>
    <div class="information">
      <div class="date">Date: {{ event.date }}</div>
      <div class="location">Location: {{ event.location }}</div>
      <Map v-if="event.coords" :centerCoords="event.coords" :markerCoords="event.coords" style="width: 40rem"></Map>
      <div class="price">Price: {{ event.price }}</div>
    </div>
    <div class="description">{{ event.description }}</div>
  </div>
</template>

<script>
import UserLink from '@/components/UI/UserLink'
import Map from '@/components/Map'
export default {
  name: 'Event',
  components: { UserLink, Map },
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
