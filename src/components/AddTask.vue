<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <textarea 
          v-model="text"
          class="textarea" 
          :class="{ 'is-danger' : $v.text.$error }"
          placeholder="Текст задачи"
          rows="2"
          @blur="!$v.text.$touch()">
        </textarea>
        <template v-if="$v.text.$error">
          <p v-if="!$v.text.required" class="help is-danger">Пожалуйста, введите текст задачи</p>
        </template>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button 
            class="button is-primary" 
            :class="{ 'is-loading': isLoading }"
            type="submit"
            :disabled="$v.$anyError">
            Добавить
          </button>
        </div>
        <div class="control">
          <button class="button is-light" @click="$emit('close')">Отмена</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'AddTask',

    props: {
      categoryId: [String, Number]
    },

    data() {
      return {
        text: '',
        isLoading: false
      }
    },

    validations: {
      text: { required }
    },

    methods: {
      handleSubmit() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.isLoading = true
          this.$store.dispatch('addTask', { 
            text: this.text,
            categoryId: this.categoryId
          })
            .then(() => {
              this.text = ''
              this.$emit('close')
            })
            .catch(() => {
              this.isLoading = false
            })
        } else {
          return false
        }
      }
    }
  }
</script>