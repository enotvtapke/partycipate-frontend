<template>
  <div ref="mapContainer" style="width: 100%; height: 20rem"></div>
</template>

<script>
/* eslint-disable no-undef */
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted, ref } from 'vue'
let marker = null
let map = null
const GOOGLE_MAPS_API_KEY = 'AIzaSyBe_rgoTpHfRAnD4RT0KE-EaTBECU40tXk'
const SAINT_PETERSBURG = { lat: 59.937, lng: 30.308 }
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
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY, libraries: ['places'] })
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
      marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29)
      })
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
    display:none;
  }
</style>
