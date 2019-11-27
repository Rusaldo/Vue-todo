import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './modules/tasks'
import categories from './modules/categories'
import colors from './modules/colors'
import notifications from './modules/notifications'
import apiLoading from './modules/apiLoading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tasks,
    categories,
    colors,
    notifications,
    apiLoading
  }
})