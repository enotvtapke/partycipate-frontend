<template>
    <div ref="mapContainer" style="max-width: 40rem; width: 100%; height: 20rem"></div>
</template>

<script>
/* eslint-disable no-undef */
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted, ref } from 'vue'

let marker = null
let map = null
const GOOGLE_MAPS_API_KEY = 'AIzaSyBe_rgoTpHfRAnD4RT0KE-EaTBECU40tXk'
const SAINT_PETERSBURG = {
    lat: 59.933922,
    lng: 30.329026
}
export default {
    name: 'Map',
    props: {
        centerCoords: Object,
        markerCoords: Object,
        mutable: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click'],
    setup (props, { emit }) {
        const mapContainer = ref(null)
        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY,
            libraries: ['places']
        })
        onMounted(async () => {
            await loader.load()
            map = new google.maps.Map(mapContainer.value, {
                center: SAINT_PETERSBURG,
                zoom: 12,
                streetViewControl: false,
                mapTypeControlOptions: {
                    mapTypeIds: []
                },
                clickableIcons: false
            })
            if (props.centerCoords && props.centerCoords.lng && props.centerCoords.lat) {
                map.setCenter(props.centerCoords)
            }
            marker = new google.maps.Marker({
                map,
                anchorPoint: new google.maps.Point(0, -29)
            })
            if (props.markerCoords && props.markerCoords.lng && props.markerCoords.lat) {
                marker.setPosition(props.markerCoords)
            }
            if (props.mutable) {
                google.maps.event.addListener(map, 'click', event => {
                    marker.setPosition(event.latLng)
                    emit('click', event.latLng)
                })
            }
        })
        return {
            mapContainer
        }
    },
    watch: {
        markerCoords: function (newValue) {
            marker.setPosition(newValue)
        },
        centerCoords: function (newValue) {
            map.setCenter(newValue)
        }
    }
}
</script>

<style>
.gmnoprint a, .gmnoprint span, .gm-style-cc {
    display: none;
}
</style>
