import api from '@/api/service'

export default {
  state: {
    categories: []
  },

  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    ADD_CATEGORY(state, category) {
      state.categories.push(category)
    },
    REMOVE_CATEGORY(state, categoryId) {
      const index = state.categories.findIndex(category => category.id === categoryId)
      state.categories.splice(index, 1)
    }
  },

  actions: {
    fetchCategories({ commit, dispatch }) {
      return api.getCategories()
        .then(({ data }) => {
          commit('SET_CATEGORIES', data)
        })
        .catch(error => {
          dispatch('addNotification', {
            type: 'error',
            message: 'Ошибка при получении категорий: ' + error.message
          })
          throw error
        })
    },
    addCategory({ commit, dispatch }, payload) {
      return api.addCategory(payload)
        .then(({ data }) => {
          commit('ADD_CATEGORY', data)
          dispatch('addNotification', {
            type: 'success',
            message: 'Категория добавлена'
          })
          return data
        })
        .catch(error => {
          dispatch('addNotification', {
            type: 'error',
            message: 'Ошибка при добавлении категории: ' + error.message
          })
          throw error
        })
    },
    removeCategory({ commit, dispatch }, categoryId) {
      return api.removeCategory(categoryId)
        .then(() => {
          commit('REMOVE_CATEGORY', categoryId)
          dispatch('removeTasksByCategory', categoryId)
          dispatch('addNotification', {
            type: 'success',
            message: 'Категория удалена'
          })
        })
        .catch(error => {
          dispatch('addNotification', {
            type: 'error',
            message: 'Ошибка при удалении категории: ' + error.message
          })
          throw error
        })
    }
  },

  getters: {
    getCategoryById: state => id => {
      const obj = state.categories.find(category => category.id === Number(id))
      return obj
    }
  }
}