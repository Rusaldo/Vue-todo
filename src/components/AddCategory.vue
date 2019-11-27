<template>
  <transition name="fade">
    <div class="cat-modal">
      <div class="cat-modal__container">
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <input
              v-model="name"
              class="input"
              :class="{ 'is-danger' : $v.name.$error }"
              type="text"
              placeholder="Название категории"
              @blur="!$v.name.$touch()">
            <template v-if="$v.name.$error">
              <p v-if="!$v.name.required" class="help is-danger">Пожалуйста, укажите название</p>
            </template>
          </div>

          <div class="field">
            <div class="color-radio-group">
              <div v-for="color in colors" :key="color.id">
                <input
                  v-model="colorId"
                  class="color-radio"
                  type="radio"
                  :id="color.id"
                  :value="color.id" >
                <label
                  :for="color.id"
                  class="color-radio-dot"
                  :style="{ 'background-color': color.hex }"  />
              </div>
            </div>
            <template v-if="$v.colorId.$error">
              <p v-if="!$v.colorId.required" class="help is-danger">Пожалуйста, выберите цвет</p>
            </template>
          </div>

          <div class="field">
            <button
              class="button is-primary is-fullwidth"
              :class="{ 'is-loading': loading }"
              type="submit"
              :disabled="$v.$anyError">
              Добавить
            </button>
          </div>
        </form>

        <button class="delete cat-modal__close-btn" @click="$emit('close')" />
      </div>
    </div>
  </transition>

</template>

<script>
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'AddCategory',

    data() {
      return {
        name: '',
        colorId: '',
        loading: false
      }
    },

    computed: {
      colors() {
        return this.$store.state.colors.colors
      }
    },

    validations: {
      name: { required },
      colorId: { required }
    },

    methods: {
      handleSubmit() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.loading = true
          this.$store.dispatch('addCategory', {
            name: this.name,
            colorId: this.colorId
          })
            .then(data => {
              this.name = ''
              this.colorId = ''
              this.$emit('close')
              this.$router.push({ name: 'category', params: { id: data.id } })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cat-modal {
    position: absolute;
    z-index: 9998;
    top: 50px;
    left: 0;
    transition: opacity .3s ease;
  }
  .cat-modal__container {
    min-width: 250px;
    margin: 0px auto;
    padding: 32px 24px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .cat-modal__close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .color-radio-group {
    display: flex;
    justify-content: space-between;
  }
  .color-radio {
    display: none;
  }
  .color-radio:checked ~ .color-radio-dot {
    border-color: #3273dc;
    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
  }
  .color-radio-dot {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 25px;
    background: red;
    cursor: pointer;
    border: 1px solid transparent;
  }
</style>