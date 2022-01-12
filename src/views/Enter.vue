<template>
  <div class="enter-form form-box">
    <div class="field" :class="{ error: v$.login.$error }">
      <div class="name">
        <label for="login">Login</label>
      </div>
      <div class="value">
        <input id="login" name="login" v-model="login">
        <div class="error-message" v-if="v$.login.$error">{{ v$.login.$errors[0].$message }}</div>
      </div>
    </div>
    <div class="field" :class="{ error: v$.password.$error }">
      <div class="name">
        <label for="password">Password</label>
      </div>
      <div class="value">
        <input id="password" name="password" type="password" v-model="password"/>
        <div class="error-message" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</div>
      </div>
    </div>
    <div class="form-error-message" v-if="serverValidationError">{{ serverValidationError }}</div>
    <div class="button-field">
      <input @click="onEnter" type="submit" value="Enter">
    </div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import axios from 'axios'

export default {
  name: 'Enter',
  data: function () {
    return {
      v$: useValidate(),
      login: '',
      password: '',
      serverValidationError: ''
    }
  },
  validations () {
    return {
      login: {
        required: helpers.withMessage('Login is required', required),
        $autoDirty: true
      },
      password: {
        required: helpers.withMessage('Password is required', required),
        $autoDirty: true
      }
    }
  },
  methods: {
    onEnter () {
      this.v$.$validate()
      if (!this.v$.$error) {
        const login = this.login
        const password = this.password
        axios.get('/api/v1/user/enter', {
          params: {
            login,
            password
          }
        }).then(response => {
          console.log(response.data)
          // TODO
        }).catch(error => {
          this.serverValidationError = error.response.data
        })
      }
    }
  }
}
</script>

<style scoped>
  .error {
    border-color: red;
  }
  .form-box {
    margin: auto;
    width: 15rem;
  }
  .form-box .field {
    margin-bottom: 1.5rem;
  }
  .error-message {
    position: absolute;
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }

  .form-error-message {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
    margin-bottom: 0.8rem;
  }
</style>
