<template>
    <input :value="modelValue" @input="updateInput">
</template>

<script>
export default {
    name: 'DebouncedInput',
    props: {
        modelValue: [String, Number],
        debounceTime: {
            type: Number,
            default: 400
        }
    },
    data: function () {
        return {
            debounceTimer: null
        }
    },
    methods: {
        updateInput (event) {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer)
            }
            this.debounceTimer = setTimeout(() => {
                this.$emit('update:modelValue', event.target.value)
                this.$emit('update', event)
                this.debounceTimer = null
            }, this.debounceTime)
        }
    }
}
</script>

<style scoped>

</style>
