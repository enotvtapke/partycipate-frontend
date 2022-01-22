<template>
    <div class="form-box create-event-box">
        <form @submit.prevent>
            <InputField v-model="name" :validator="v$.name" fieldName="Name"></InputField>
            <InputField v-model="date" :validator="v$.date" fieldName="Date" type="datetime-local"></InputField>
            <InputField v-model="location" :validator="v$.location" fieldName="Location"></InputField>
            <button class="showMapButton" v-if="!map.show" @click="onShowMap">Show on map</button>
            <button class="showMapButton" v-else @click="map.show = false">Without map</button>
            <Map v-show="map.show" class="map" @click="onClickMap" :mutable=true :markerCoords="coords"
                 :centerCoords="map.centerCoords"></Map>
            <TextareaField v-model="description" :validator="v$.description" fieldName="Description"></TextareaField>
            <InputField v-model="price" :validator="v$.price" fieldName="Price ₽"></InputField>
            <div class="form-error-message" v-if="serverValidationError">{{ serverValidationError }}</div>
            <div class="button-field">
                <input @click="onCreateEvent" type="submit" value="Enter">
            </div>
        </form>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, integer, maxLength, maxValue, minLength, minValue, required } from '@vuelidate/validators'
import { createEvent } from '@/utils/eventUtils'
import InputField from '@/components/UI/InputField'
import TextareaField from '@/components/UI/TextareaField'
import Map from '@/components/Map'
import { useGeolocation } from '@/utils/mapUtils'

export default {
    name: 'CreateEvent',
    components: {
        InputField,
        TextareaField,
        Map
    },
    data: function () {
        return {
            v$: useValidate(),
            name: null,
            date: null,
            location: null,
            coords: null,
            map: {
                show: false,
                centerCoords: null
            },
            description: null,
            price: null,
            serverValidationError: null
        }
    },
    methods: {
        onCreateEvent () {
            this.v$.$validate()
            if (!this.v$.$error) {
                createEvent(this.name, this.date, this.location, this.coords, this.description, this.price).then(event => {
                    this.$router.push('/event/' + event.id)
                }).catch(error => {
                    this.serverValidationError = error.data
                })
            }
        },
        onShowMap () {
            this.map.show = true
            if (this.map.centerCoords == null) {
                useGeolocation((position) => {
                    this.map.centerCoords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            }
        },
        onClickMap (coords) {
            this.coords = coords
        }
    },
    validations () {
        return {
            name: {
                required: helpers.withMessage('Name is required', required),
                minLength: helpers.withMessage('Name is too short', minLength(4)),
                maxLength: helpers.withMessage('Name is too long', maxLength(100)),
                $autoDirty: true
            },
            date: {
                $autoDirty: true
            },
            description: {
                maxLength: helpers.withMessage('Description is too long', maxLength(65000)),
                $autoDirty: true
            },
            location: {
                maxLength: helpers.withMessage('Location is too long', maxLength(100)),
                $autoDirty: true
            },
            price: {
                integer: helpers.withMessage('Invalid price', integer),
                minValue: helpers.withMessage('Price must be positive', minValue(0)),
                maxValue: helpers.withMessage('Price is too high', maxValue(1000000)),
                $autoDirty: true
            }
        }
    }
}
</script>

<style scoped>
@import '../assets/css/form.scss';

.showMapButton, .map {
    margin-bottom: 1rem;
}
</style>
