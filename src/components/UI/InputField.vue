<template>
  <div class="field" :class="{ error: validator.$errors.length > 0 }">
    <div class="name">
      <label :for="'input' + fieldName">{{ fieldName }}<span v-if="validator.required">*</span></label>
    </div>
    <div class="value">
      <input class="input" :id="'input' + fieldName" :type="type" :value="modelValue" autocomplete="off" @input="updateInput">
      <div class="error-message" v-if="validator.$errors.length > 0">{{ validator.$errors[0].$message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    fieldName: {
      type: String,
      required: true
    },
    validator: {
      type: Object,
      required: true
    },
    modelValue: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    debounce: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      debounceTimer: null
    }
  },
  methods: {
    updateInput (event) {
      if (this.debounce) {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer)
        }
        this.debounceTimer = setTimeout(() => {
          this.$emit('update:modelValue', event.target.value)
          this.debounceTimer = null
        }, 400)
      } else {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid black;
  padding: 10px 15px;
  margin-top: 15px;
}
.error-message {
  position: absolute;
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}
.error .input {
  border: 1px solid red;
  outline-color: red;
}
</style>
