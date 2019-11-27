import api from '@/api/service'

export default {
  state: {
    tasks: []
  },

  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    REMOVE_TASK(state, taskId) {
      const index = state.tasks.findIndex(task => task.id === taskId)
      state.tasks.splice(index, 1)
    },
    EDIT_TASK(state, taskObj) {
      state.tasks = state.tasks.map(task => {
        if (task.id === taskObj.id) {
          return taskObj
        }
        return task
      })
    },
    REMOVE_TASKS_BY_CATEGORY(state, categoryId) {
      state.tasks = state.tasks.filter(task => {
        return task.categoryId !== categoryId
      })
    }
  },

  actions: {
    fetchTasks({ commit, dispatch }) {
      return api.getTasks()
        .then(({ data }) => {
          commit('SET_TASKS', data)
        })
        .catch(error => {
          dispatch('addNotification', {
            type: 'error',
            message: 'Ошибка при получении задач: ' + error.message
          })
        })
    },
    addTask({ commit, dispatch }, taskObj) {
      return api.addTask(taskObj)
        .then(({ data }) => {
          commit('ADD_TASK', data)
          dispatch('addNotification', {
            type: 'success',
            message: 'Задача добавлена'
          })
        })
        .catch(error => {
          dispatch('addNotification', {
            type: 'error',
            message: 'Ошибка при добавлении задачи: ' + error.message
          })
          throw error
        })
    },
    removeTask({ commit, dispatch }, taskId) {
      return api.removeTask(taskId)
        .then(() => {
          commit('REMOVE_TASK', taskId)
          dispatch('addNotification', {
            type: 'success',
            message: 'Задача удалена'
          })
        })
        .catch(error => {
          dispatch('addNotification', {
            type: 'error',
            message: 'Ошибка при удалении задачи: ' + error.message
          })
          throw error
        })
    },
    editTask({ commit, dispatch }, taskObj) {
      return api.editTask(taskObj)
        .then(({ data }) => {
          commit('EDIT_TASK', data)
          dispatch('addNotification', {
            type: 'success',
            message: 'Задача изменена'
          })
          return data
        })
        .catch(error => {
          dispatch('addNotification', {
            type: 'error',
            message: 'Ошибка при изменении задачи: ' + error.message
          })
          throw error
        })
    },
    removeTasksByCategory({ commit }, categoryId) {
      commit('REMOVE_TASKS_BY_CATEGORY', categoryId)
    }
  },

  getters: {
    getTasksByCategory: state => id => {
      return state.tasks.filter(task => task.categoryId === id)
    },
    getTaskById: state => id => {
      const obj = state.tasks.find(task => task.id === Number(id))
      return obj
    }
  }
}