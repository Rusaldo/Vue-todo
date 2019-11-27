<template>
  <div></div>
</template>

<script>
  export default {
    props: {
      notification: {
        type: Object,
        required: true
      }
    },

    created() {
      const classesMap = {
        error: 'is-danger',
        success: 'is-success'
      }

      this.$buefy.toast.open({
        duration: 5000,
        message: this.notification.message,
        type: classesMap[this.notification.type],
        queue: false,
        position: 'is-top-right'
      })
    },
  }
</script>
