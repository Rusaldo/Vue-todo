<template>
  <section class="section">
    <Scrollbar v-if="categories && categories.length">
      <div class="all-list">
        <div v-for="(category, index) in categories" :key="category.id">
          <TaskList :category="category" />
          <div v-if="index !== categories.length - 1" class="divider" />
        </div>
      </div>
    </Scrollbar>
    <div v-else>
      Список категорий пуст
    </div>
  </section>
</template>

<script>
  import TaskList from '@/components/TaskList.vue'
  import Scrollbar from '@/components/scrollbar/Container.vue'

  export default {
    components: {
      TaskList,
      Scrollbar
    },

    computed: {
      categories() {
        return this.$store.state.categories.categories
      }
    }
  }
</script>

<style lang="scss" scoped>  
  .all-list {
    max-height: 604px;
  }
</style>