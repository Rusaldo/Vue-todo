let nextId = 1

export default {
  state: {
    notifications: []
  },

  mutations: {
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push({ ...notification, id: nextId++ })
    },
    DELETE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => notification.id !== notificationToRemove.id)
    }
  },

  actions: {
    addNotification({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification)
    },
    removeNotification({ commit }, notification) {
      commit('DELETE_NOTIFICATION', notification)
    }
  }
}