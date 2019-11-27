<template>
  <div id="app" class="app">
    <NotificationContainer />    

    <div class="app__container">
      <b-loading :is-full-page="false" :active.sync="isLoading" />

      <template v-if="!isLoading">
        <aside class="app__aside">
          <Sidebar />
        </aside>

        <main class="app__content">
          <router-view :key="$route.fullPath" />
        </main>
      </template>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'
  import NotificationContainer from '@/components/notification/Container.vue'
  
  export default {
    components: {
      Sidebar,
      NotificationContainer
    },

    data() {
      return {
        isLoading: true,
      }
    },

    created() {
      Promise.all([
        this.$store.dispatch('fetchCategories'),
        this.$store.dispatch('fetchTasks'),
        this.$store.dispatch('fetchColors')
      ]).then(() => {
        this.isLoading = false
      })
    }
  }
</script>

<style lang="scss">
  @import './assets/styles/styles.scss';
</style>
