<template>
  <div>
    <div class="task">
      <div class="task__toggle">
        <b-checkbox v-model="taskModel.isCompleted" @input="handleEditTask" />
      </div>
      <div class="task__text">
        {{ task.text }}
      </div>
      <div class="task__controls">
        <b-button 
          type="is-text" 
          icon-right="pencil" 
          class="mr-sm"
          @click="isEditTaskVisible = !isEditTaskVisible" />
        <b-button 
          type="is-text" 
          icon-right="delete" 
          @click="handleRemoveTask" />
      </div>
    </div>

    <EditTask
      v-if="isEditTaskVisible"
      class="mt-md"
      :task="task"
      @close="isEditTaskVisible = false" />
  </div>
</template>

<script>
  import EditTask from '@/components/EditTask.vue'

  export default {
    components: {
      EditTask
    },

    props: {
      task: Object
    },

    data() {
      return {
        isEditTaskVisible: false,
        taskModel: { ...this.task }
      }
    },

    methods: {
      handleRemoveTask() {
        this.$store.dispatch('removeTask', this.task.id)
      },
      handleEditTask() {
        this.$store.dispatch('editTask', this.taskModel).catch(error => {
          this.taskModel = this.task
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .task {
    display: flex;
    align-items: center;
    &:hover {
      > .task__controls {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .task__text {
    flex: auto 1 1;
  }
  .task__toggle {
    flex: auto 0 0;
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }
  .task__controls {
    flex: auto 0 0;
    visibility: hidden;
    opacity: 0;
    margin-left: 1rem;
  }
</style>