<template>
    <form @submit.prevent>
        <input-field :validator="v$.loginOrEmail" v-model="loginOrEmail" field-name="Login or email"></input-field>
        <button @click="requestPasswordChange" class="btn btn-primary">Send email</button>
    </form>
</template>

<script>
import InputField from '@/components/UI/InputField'
import { isEmailVacant, isLoginVacant, requestPasswordChange } from '@/utils/userUtils'
import useValidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'

export default {
    name: 'ForgotPassword',
    components: { InputField },
    data () {
        return {
            v$: useValidate(),
            loginOrEmail: ''
        }
    },
    validations () {
        return {
            loginOrEmail: {
                required: helpers.withMessage('Field is required', required),
                valid: helpers.withMessage('Invalid login or email', helpers.withAsync(async (value) => {
                    return !await isEmailVacant(value) || !await isLoginVacant(value)
                }))
            }
        }
    },
    methods: {
        requestPasswordChange () {
            this.v$.$validate()
            if (!this.v$.$error) {
                console.log('asdasd')
                requestPasswordChange(this.loginOrEmail)
            }
        }
    }
}
</script>

<style scoped>

</style>
