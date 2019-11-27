<template>
  <div class="notification-container">
    <transition-group name="fade">
      <NotificationBar
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification" />
    </transition-group>
  </div>
</template>

<script>
  import NotificationBar from '@/components/notification/Bar.vue'

  export default {
    components: {
      NotificationBar
    },

    computed: {
      notifications() {
        return this.$store.state.notifications.notifications
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notification-container {
    position: fixed;
    top: 0;
    right: 0;
    padding-top: 20px;
    padding-right: 40px;
  }
</style>
