<template>
  <section class="section">
    <TaskList :category="category" scrollbar />

    <div class="mt-md">
      <b-button 
        v-if="!isAddTaskVisible"
        type="is-text"
        icon-left="mdi mdi-plus"
        @click="isAddTaskVisible = true">
        Новая задача
      </b-button>

      <AddTask
        v-if="isAddTaskVisible"
        :category-id="category.id"
        @close="isAddTaskVisible = false" />
    </div>
  </section>
</template>

<script>
  import TaskList from '@/components/TaskList.vue'
  import AddTask from '@/components/AddTask.vue'

  export default {
    components: {
      TaskList,
      AddTask
    },

    props: {
      id: [String, Number]
    },

    data() {
      return {
        isAddTaskVisible: false
      }
    },

    computed: {
      category() {
        return this.$store.getters.getCategoryById(this.id)
      }
    }
  }
</script>
