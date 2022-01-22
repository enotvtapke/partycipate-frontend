<template>
  <div class="form-box create-event-box">
    <form @submit.prevent>
      <InputField v-model="name" :validator="v$.name" fieldName="Name"></InputField>
      <InputField v-model="date" :validator="v$.date" fieldName="Date" type="datetime-local"></InputField>
      <InputField v-model="location" :validator="v$.location" fieldName="Location"></InputField>
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
import { helpers, required, minLength, maxLength, integer, maxValue, minValue } from '@vuelidate/validators'
import { createEvent } from '@/utils/eventUtils'
import InputField from '@/components/UI/InputField'
import TextareaField from '@/components/UI/TextareaField'

export default {
  name: 'CreateEvent',
  components: { InputField, TextareaField },
  data: function () {
    return {
      v$: useValidate(),
      name: null,
      date: null,
      location: null,
      description: null,
      price: null,
      serverValidationError: null
    }
  },
  methods: {
    onCreateEvent () {
      this.v$.$validate()
      if (!this.v$.$error) {
        createEvent(this.name, this.date, this.location, this.description, this.price).then(event => {
          this.$router.push('/event/' + event.id)
        }).catch(error => {
          this.serverValidationError = error.data
        })
      }
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
</style>
