<template>
  <Event v-if="event" :event="event"></Event>
  <NotFound v-else-if="event === null"></NotFound>
</template>

<script>
import Event from '@/components/Event'
import NotFound from '@/views/NotFound'
import { findById } from '@/utils/eventUtils'
export default {
  name: 'EventPage',
  components: { Event, NotFound },
  data: function () {
    return {
      event: undefined
    }
  },
  beforeMount () {
    findById(this.$route.params.id).then(event => {
      this.event = event
    }).catch(() => {
      this.event = null
    })
  }
}
</script>

<style scoped>

</style>
