import api from '@/api/service'

export default {
  state: {
    colors: []
  },

  mutations: {
    SET_COLORS(state, colors) {
      state.colors = colors
    }
  },

  actions: {
    fetchColors({ commit, dispatch }) {
      return api.getColors()
        .then(({ data }) => {
          commit('SET_COLORS', data)
        })
        .catch(error => {
          dispatch('addNotification', {
            type: 'error',
            message: 'Ошибка при получении цветовых схем: ' + error.message
          })
        })
    }
  },

  getters: {
    getColorHexById: state => id => {
      const obj = state.colors.find(color => color.id === id)
      return obj && obj.hex
    }
  }
}