<template>
  <div>
    <h2 class="title" :style="{ 'color': $store.getters.getColorHexById(category.colorId) }">
      {{ category.name }}
    </h2>
    
    <template v-if="tasks && tasks.length">
      <Scrollbar v-if="scrollbar"> 
        <ul class="stack task-list--max-height">
          <li v-for="task in tasks" :key="task.id">
            <Task :task="task" />
          </li>
        </ul>
      </Scrollbar>
      <template v-else>
        <ul class="stack">
          <li v-for="task in tasks" :key="task.id">
            <Task :task="task" />
          </li>
        </ul>
      </template>
    </template>

    <div v-else>
      Список задач для этой категорий пуст
    </div>
  </div>
</template>

<script>
  import Task from './Task.vue'
  import Scrollbar from '@/components/scrollbar/Container.vue'

  export default {
    components: {
      Task,
      Scrollbar
    },

    props: {
      category: Object,
      scrollbar: Boolean
    },

    computed: {
      tasks() {
        return this.$store.getters.getTasksByCategory(this.category.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
 .task-list--max-height {
   max-height: 400px;
 }
</style>