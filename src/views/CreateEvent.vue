<template>
  <div class="form-box">
    <form @submit.prevent>
      <div class="field" :class="{ error: v$.name.$error }">
        <div class="name">
          <label for="name">Name</label>
        </div>
        <div class="value">
          <input id="name" name="name" v-model="name" autocomplete="off"/>
          <div class="error-message" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</div>
        </div>
      </div>
      <div class="field" :class="{ error: v$.date.$error }">
        <div class="name">
          <label for="name">Name</label>
        </div>
        <div class="value">
          <input id="name" name="name" v-model="name" autocomplete="off"/>
          <div class="error-message" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</div>
        </div>
      </div>
      <div class="form-error-message" v-if="serverValidationError">{{ serverValidationError }}</div>
      <div class="button-field">
        <input @click="onRegister" type="submit" value="Enter">
      </div>
    </form>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required, minLength, maxLength, alphaNum } from '@vuelidate/validators'
import axios from 'axios'
import { enter, register } from '@/utils/userUtils'

async function isVacant (value) {
  return await axios.get('/api/v1/user/isLoginVacant', {
    params: {
      login: value
    }
  }).then((response) => {
    return response.data
  }).catch(() => {
    return false
  })
}

export default {
  name: 'Register.vue',
  data: function () {
    return {
      v$: useValidate(),
      name: '',
      date: null,
      location: null,
      description: null,
      price: null
    }
  },
  methods: {
    onRegister () {
      this.v$.$validate()
      if (!this.v$.$error) {
        const password = this.password
        register(this.login, this.name, this.password).then(response => {
          enter(response.login, password).then(() => {
            this.$router.push({ name: 'Index' })
          })
        }).catch(error => {
          this.serverValidationError = error.data
        })
      }
    }
  },
  validations () {
    return {
      login: {
        required: helpers.withMessage('Login is required', required),
        minLength: helpers.withMessage('Login is too short', minLength(4)),
        maxLength: helpers.withMessage('Login is too long', maxLength(32)),
        alphaNum: helpers.withMessage('Login should contain only letters and digits', alphaNum),
        isVacant: helpers.withMessage('Login is already in use', helpers.withAsync(isVacant)),
        $autoDirty: true
      },
      name: {
        required: helpers.withMessage('Name is required', required),
        minLength: helpers.withMessage('Name is too short', minLength(4)),
        maxLength: helpers.withMessage('Name is too long', maxLength(32)),
        alphaNum: helpers.withMessage('Name should contain only letters and spaces', helpers.regex(/^[a-zA-Z ]*$/)),
        $autoDirty: true
      },
      password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password is too short', minLength(8)),
        maxLength: helpers.withMessage('Password is too long', maxLength(32)),
        $autoDirty: true
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/form.scss';
</style>
