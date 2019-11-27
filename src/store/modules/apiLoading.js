import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

export default {
  state: {
    apiWaitingCount: 0
  },

  actions: {
    startLoading({ state }) {
      if (state.apiWaitingCount === 0) {
        NProgress.start()
      }
      state.apiWaitingCount++
    },
    doneLoading({ state }) {
      state.apiWaitingCount--
      if (state.apiWaitingCount === 0) {
        NProgress.done()
      }
    }
  }
}
