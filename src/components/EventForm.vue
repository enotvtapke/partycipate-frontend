<template>
    <form @submit.prevent.stop class="form-box event-form-box">
        <InputField v-model="event.name" :validator="v$.event.name" fieldName="Name"></InputField>
        <InputField v-model="event.date" :validator="v$.event.date" fieldName="Date" type="datetime-local"></InputField>
        <InputField v-model="event.location" :validator="v$.event.location" fieldName="Location"></InputField>
        <button class="showMapButton btn btn-outline-secondary btn-sm" v-if="!map.show" @click="onShowMap">Show on map</button>
        <button class="showMapButton btn btn-outline-secondary btn-sm" v-else @click="map.show = false">Without map</button>
        <Map v-show="map.show" class="map" @click="onClickMap" :mutable=true :markerCoords="event.coordinates"
             :centerCoords="map.centerCoords"></Map>
        <TextareaField v-model="event.description" :validator="v$.event.description"
                       fieldName="Description"></TextareaField>
        <InputField v-model="event.price" :validator="v$.event.price" fieldName="Price ₽"></InputField>
        <div class="form-error-message" v-if="serverValidationError">{{ serverValidationError }}</div>
        <button class="btn btn-primary" @click="onSubmit">Create</button>
    </form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, integer, maxLength, maxValue, minLength, minValue, required } from '@vuelidate/validators'
import InputField from '@/components/UI/InputField'
import TextareaField from '@/components/UI/TextareaField'
import Map from '@/components/UI/Map'
import { useGeolocation } from '@/utils/mapUtils'

export default {
    name: 'EventForm',
    components: {
        InputField,
        TextareaField,
        Map
    },
    props: {
        eventProp: {
            type: Object,
            default () {
                return {
                    name: null,
                    date: null,
                    location: null,
                    coordinates: { lat: null, lng: null },
                    description: null,
                    price: null
                }
            }
        },
        serverValidationError: null
    },
    data: function () {
        return {
            v$: useValidate(),
            event: { ...this.eventProp },
            map: {
                show: false,
                centerCoords: { ...this.eventProp.coordinates }
            }
        }
    },
    beforeMount () {
        this.map.show = this.eventProp.coordinates.lat != null && this.eventProp.coordinates.lng != null
    },
    methods: {
        onSubmit () {
            console.log('aaa')
            this.v$.$validate()
            if (!this.v$.$error) {
                console.log('bbb')
                if (!this.map.show) {
                    this.event.coordinates = {
                        lat: null,
                        lng: null
                    }
                }
                this.$emit('onSubmit', this.event)
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
            this.event.coordinates = coords
        }
    },
    validations () {
        return {
            event: {
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
}
</script>

<style scoped>
@import '../assets/css/form.scss';

.showMapButton, .map {
    margin-bottom: 1rem;
}
</style>
