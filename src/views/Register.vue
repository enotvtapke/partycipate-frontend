<template>
    <div class="register-form form-box">
        <form @submit.prevent>
            <InputField v-model="user.login" :validator="v$.user.login" fieldName="Login" :debounce="true"></InputField>
            <InputField v-model="user.email" :validator="v$.user.email" fieldName="Email" :debounce="true"></InputField>
            <InputField v-model="user.name" :validator="v$.user.name" fieldName="Name"></InputField>
            <InputField v-model="user.password" :validator="v$.user.password" fieldName="Password"
                        type="password"></InputField>
            <div class="form-error-message" v-if="serverValidationError">{{ serverValidationError }}</div>
            <button class="btn btn-primary" @click="onRegister">Register</button>
        </form>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required, minLength, maxLength, alphaNum, email } from '@vuelidate/validators'
import { register, isLoginVacant, isEmailVacant } from '@/utils/userUtils'
import InputField from '@/components/UI/InputField'

export default {
    name: 'Register',
    data: function () {
        return {
            v$: useValidate(),
            user: {
                login: '',
                email: '',
                name: '',
                password: ''
            },
            serverValidationError: '',
            debounceTimer: null
        }
    },
    components: { InputField },
    methods: {
        onRegister () {
            this.v$.$validate()
            if (!this.v$.$error) {
                register(this.user).then(() => {
                    this.$router.push({ name: 'MessagePage', params: { message: 'Verify your email' } })
                }).catch(error => {
                    this.serverValidationError = error.data
                })
            }
        }
    },
    validations () {
        return {
            user: {
                login: {
                    required: helpers.withMessage('Login is required', required),
                    minLength: helpers.withMessage('Login is too short', minLength(4)),
                    maxLength: helpers.withMessage('Login is too long', maxLength(32)),
                    alphaNum: helpers.withMessage('Login should contain only letters and digits', alphaNum),
                    isLoginVacant: helpers.withMessage('Login is already in use', helpers.withAsync(isLoginVacant)),
                    $autoDirty: true
                },
                email: {
                    required: helpers.withMessage('Email is required', required),
                    email: helpers.withMessage('Email is invalid', email),
                    isLoginVacant: helpers.withMessage('Email is already in use', helpers.withAsync(isEmailVacant)),
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
}
</script>

<style scoped>
@import '../assets/css/form.scss';
</style>
