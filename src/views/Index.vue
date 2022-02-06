<template>
    <debounced-input placeholder="Find event" @update="findAllByNamePrefix($event.target.value)"></debounced-input>
    <div class="events">
        <EventList :events="events"></EventList>
    </div>
</template>

<script>

import EventList from '@/components/EventList'
import DebouncedInput from '@/components/UI/DebouncedInput'
import { findAllByNamePrefix } from '@/utils/eventUtils'

export default {
    components: { DebouncedInput, EventList },
    data () {
        return {
            events: []
        }
    },
    mounted () {
        this.findAllByNamePrefix('')
    },
    methods: {
        findAllByNamePrefix (prefix) {
            findAllByNamePrefix(prefix).then(response => {
                this.events = response
            })
        }
    }
}
</script>
