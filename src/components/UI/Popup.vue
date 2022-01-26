<template>
    <div @click="TogglePopup()" class="popup">
        <div @click.stop class="popup-inner">
            <button class="popup-close" @click="TogglePopup()">
                X
            </button>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Popup',
    props: ['TogglePopup']
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
