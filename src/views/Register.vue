<template>
    <div class="register-form form-box">
        <form @submit.prevent>
            <InputField v-model="login" :validator="v$.login" fieldName="Login" :debounce="true"></InputField>
            <InputField v-model="name" :validator="v$.name" fieldName="Name"></InputField>
            <InputField v-model="password" :validator="v$.password" fieldName="Password" type="password"></InputField>
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
import { enter, register, isLoginVacant } from '@/utils/userUtils'
import InputField from '@/components/UI/InputField'

export default {
    name: 'Register',
    data: function () {
        return {
            v$: useValidate(),
            login: '',
            name: '',
            password: '',
            serverValidationError: '',
            debounceTimer: null
        }
    },
    components: { InputField },
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
                isLoginVacant: helpers.withMessage('Login is already in use', helpers.withAsync(isLoginVacant)),
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
