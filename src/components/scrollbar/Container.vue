<template>
  <div class="scrollbar">
    <div
      ref="wrap"
      class="scrollbar__wrap"
      @scroll="handleScroll">
      <div
        class="scrollbar__view"
        ref="view"
        @mouseenter="handleEnterOnView"
        @mouseleave="handleLeaveOnView">
        <slot/>
      </div>
    </div>
    <transition name="fade">
      <Bar
        v-show="thumbHeight && isVisibleBar"
        :move="moveY"
        :size="thumbHeight" />
    </transition>
  </div>
</template>

<script>
  import Bar from './Bar.vue'
  import throttle from 'lodash/throttle'
  import debounce from 'lodash/debounce'
  import ResizeObserver from 'resize-observer-polyfill'

  export default {
    name: 'Scrollbar',

    components: {
      Bar
    },

    data() {
      return {
        thumbHeight: '',
        moveY: 0,
        isEnter: false,
        isVisibleBar: false
      }
    },

    watch: {
      moveY() {
        this.isVisibleBar = true
        this.offVisible()
      }
    },

    computed: {
      wrap() {
        return this.$refs.wrap
      }
    },

    mounted() {
      setTimeout(this.install, 4)
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },

    methods: {
      handleResize: throttle(function() {
        this.update()
      }, 300),

      install() {
        let observer = new ResizeObserver(this.update)
        window.addEventListener('resize', this.handleResize)
        observer && observer.observe(this.$refs.view)
        this.update()
      },

      update() {
        const wrap = this.wrap
        const height = wrap.clientHeight
        const percentHeight = height * 100 / this.wrap.scrollHeight
        this.thumbHeight = percentHeight < 100 ? `${percentHeight}%` : ''
      },

      handleScroll() {
        this.$emit('scroll', this.wrap.scrollTop)
        this.moveY = this.wrap.scrollTop * 100 / this.wrap.clientHeight
      },

      handleEnterOnView() {
        this.isEnter = true
        this.isVisibleBar = true
      },

      handleLeaveOnView() {
        this.isEnter = false
        this.offVisible()
      },

      offVisible: debounce(function() {
        if (!this.isEnter) {
          this.isVisibleBar = false
        }
      }, 1000)
    }
  }
</script>