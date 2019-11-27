<template>
  <div class="menu stack">
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'all' }">
          <span class="icon is-small">
            <i class="mdi mdi-format-list-bulleted"></i>
          </span>
          Все задачи
        </router-link>
      </li>
    </ul>
    <Scrollbar>
      <ul v-if="categories && categories.length" class="menu-list categories-list">
        <li class="text-truncate" v-for="category in categories" :key="category.id">
          <router-link :to="{ name: 'category', params: { id: category.id } }" class="link">
            <span class="link__color-dot" :style="{ 'background-color': $store.getters.getColorHexById(category.colorId) }" />
            <span class="link__title text-truncate">{{ category.name }}</span>
            <button @click.prevent="removeCategory(category.id)" class="link__delete-btn delete is-small" />
          </router-link>
        </li>
      </ul>
    </Scrollbar>
    <div class="is-relative">
      <button
        class="button is-text is-fullwidth"
        @click="isModalVisible = true">
        <span class="icon">
          <i class="mdi mdi-plus"></i>
        </span>
        <span>Новая категория</span>
      </button>
      <AddCategory
        v-if="isModalVisible"
        @close="isModalVisible = false" />
    </div>
  </div>
</template>

<script>
  import AddCategory from '@/components/AddCategory.vue'
  import Scrollbar from '@/components/scrollbar/Container.vue'

  export default {
    name: 'Sidebar',

    components: {
      AddCategory,
      Scrollbar
    },

    data() {
      return {
        isModalVisible: false
      }
    },

    computed: {
      categories() {
        return this.$store.state.categories.categories
      }
    },

    methods: {
      removeCategory(id) {
        this.$store.dispatch('removeCategory', id)
          .then(() => {
            this.$router.push({ name: 'all' })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link__color-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .link {
    display: flex;
    align-items: center;
  }
  a.router-link-exact-active {
    background-color: whitesmoke;
    color: #363636;
  }
  .link__title {
    flex: 1;
  }
  .link__delete-btn {
    display: none;
  }
  .link:hover > .link__delete-btn {
    display: block;
  }
  .categories-list {
    max-height: 300px;
  }
</style>
