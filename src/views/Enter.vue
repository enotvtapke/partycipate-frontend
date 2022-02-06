<template>
    <div class="enter-form form-box">
        <form @submit.prevent>
            <InputField v-model="login" :validator="v$.login" fieldName="Login"></InputField>
            <InputField v-model="password" :validator="v$.password" fieldName="Password" type="password"></InputField>
            <div class="form-error-message" v-if="serverValidationError">{{ serverValidationError }}</div>
            <button class="btn btn-primary me-4" @click="onEnter">Enter</button>
            <router-link :to="{ name: 'ForgotPassword' }">Forgot password</router-link>
        </form>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { enter } from '@/utils/userUtils'
import InputField from '@/components/UI/InputField'

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
    components: { InputField },
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
                enter(login, password).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(error => {
                    this.serverValidationError = error.data
                })
            }
        }
    }
}
</script>

<style scoped>
@import '../assets/css/form.scss';
</style>
