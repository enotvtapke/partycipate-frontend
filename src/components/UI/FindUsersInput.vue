<template>
    <DebouncedInput @update="findUsers"/>
</template>

<script>
import DebouncedInput from '@/components/UI/DebouncedInput'
import { findByLoginPrefix } from '@/utils/userUtils'

export default {
    name: 'FindUsersInput',
    components: { DebouncedInput },
    props: {
        modelValue: Array
    },
    beforeMount () {
        findByLoginPrefix('').then(users => {
            this.$emit('update:modelValue', users)
        })
    },
    methods: {
        findUsers (event) {
            findByLoginPrefix(event.target.value).then(users => {
                this.$emit('update:modelValue', users)
            })
        }
    }
}
</script>

<style scoped>

</style>
