<template>
    <button @click="togglePopup()">{{ buttonName }}</button>
    <Popup
        v-if="popupTrigger"
        :TogglePopup="togglePopup">
        <slot/>
    </Popup>
</template>

<script>
import Popup from '@/components/UI/Popup'

export default {
    name: 'PopupButtonTrigger',
    components: { Popup },
    props: {
        buttonName: {
            type: String,
            default () {
                return 'Open'
            }
        }
    },
    data () {
        return {
            popupTrigger: false
        }
    },
    methods: {
        togglePopup () {
            this.popupTrigger ^= true
        }
    }
}
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
    .popup-inner {
        background: #FFF;
        padding: 1rem;
    }
}
</style>
