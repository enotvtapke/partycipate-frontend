<template>
  <div class="event">
    <div class="creator">By: <UserLink :user="event.creator"></UserLink></div>
    <div class="name"><h2>{{ event.name }}</h2></div>
    <div class="information">
      <div class="date">Date: {{ event.date }}</div>
      <div class="location">Location: {{ event.location }}</div>
      <div class="price">Price: {{ event.price }}</div>
    </div>
    <div class="description">{{ event.description }}</div>
    <div class="footer">footer</div>
  </div>
</template>

<script>
import UserLink from '@/components/UI/UserLink'
export default {
  name: 'Event',
  components: { UserLink },
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
