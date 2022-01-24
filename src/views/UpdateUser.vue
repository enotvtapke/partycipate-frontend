<template>
    <div v-if="user" class="register-form form-box">
        <form @submit.prevent="onSubmit">
            <InputField v-model="user.login" :validator="v$.user.login" fieldName="Login" :debounce="true"></InputField>
            <InputField v-model="user.name" :validator="v$.user.name" fieldName="Name"></InputField>
            <div class="form-error-message" v-if="serverValidationError">{{ serverValidationError }}</div>
            <div class="button-field">
                <input type="submit" value="Change">
            </div>
        </form>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required, minLength, maxLength, alphaNum } from '@vuelidate/validators'
import { auth, isLoginVacant, update } from '@/utils/userUtils'
import InputField from '@/components/UI/InputField'

export default {
    name: 'UpdateUser',
    data: function () {
        return {
            v$: useValidate(),
            user: { ...this.$store.getters.user },
            serverValidationError: ''
        }
    },
    components: { InputField },
    methods: {
        onSubmit () {
            this.v$.$validate()
            if (!this.v$.$error) {
                update(this.user).then(response => {
                    auth(localStorage.getItem('jwt'))
                    this.$router.push({ name: 'User', params: { login: response.login } })
                }).catch(error => {
                    this.serverValidationError = error.data
                })
            }
        },
        async isLoginVacant (value) {
            return value === this.$store.getters.user.login || await isLoginVacant(value)
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
                    isLoginVacant: helpers.withMessage('Login is already in use', helpers.withAsync(this.isLoginVacant)),
                    $autoDirty: true
                },
                name: {
                    required: helpers.withMessage('Name is required', required),
                    minLength: helpers.withMessage('Name is too short', minLength(4)),
                    maxLength: helpers.withMessage('Name is too long', maxLength(32)),
                    alphaNum: helpers.withMessage('Name should contain only letters and spaces', helpers.regex(/^[a-zA-Z ]*$/)),
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
