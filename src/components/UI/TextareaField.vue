<template>
  <div class="field" :class="{ error: validator.$error }">
    <div class="name">
      <label :for="'textarea' + fieldName">{{ fieldName }}<span v-if="validator.required">*</span></label>
    </div>
    <div class="value">
      <textarea class="textarea" :id="'textarea' + fieldName" rows="6" :value="modelValue" @input="updateInput"></textarea>
      <div class="error-message" v-if="validator.$error">{{ validator.$errors[0].$message }}</div>
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
    modelValue: [String, Number]
  },
  methods: {
    updateInput (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.textarea {
  width: 100%;
  border: 1px solid black;
  padding: 10px 15px;
  margin-top: 15px;
  resize: vertical;
}
</style>
