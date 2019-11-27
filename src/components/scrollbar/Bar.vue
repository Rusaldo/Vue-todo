<template>
  <div
    class="scrollbar__track"
    @click="handleClickOnTrack">
    <transition name="fade">
      <div
        ref="thumb"
        class="scrollbar__thumb"
        :style="style"
        @mousedown="handleMouseDownOnThumb">
      </div>
    </transition>
  </div>
</template>

<script>
  const on = (element, type, handler, useCapture) => {
    element.addEventListener(type, handler, useCapture)
    return () => {
      off(element, type, handler)
    }
  }

  const off = (element, type, handler) => {
    element.removeEventListener(type, handler)
  }

  const BAR_MAP = {
    axis: 'Y',
    client: 'clientY',
    offset: 'offsetHeight',
    cssProperty: 'height',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    clientSize: 'clientHeight',
    direction: 'top',
    translate(move) {
      return `translate${this.axis}(${move}%)`
    }
  }

  export default {
    name: 'Bar',

    props: {
      vertical: {
        type: Boolean,
        default: false
      },
      size: String,
      move: Number
    },

    data() {
      return {
        isDownClick: false
      }
    },

    computed: {
      wrap() {
        return this.$parent.wrap
      },
      thumb() {
        return this.$refs.thumb
      },
      type() {
        return BAR_MAP
      },
      style() {
        return {
          [this.type.cssProperty]: this.size,
          'transform': this.type.translate(this.move)
        }
      }
    },

    methods: {
      handleMouseDownOnThumb(e) {
        const t = this.type
        this[t.axis] = e.currentTarget[t.offset] - (e[t.client] - e.currentTarget.getBoundingClientRect()[t.direction])
        e.stopImmediatePropagation()
        this.isDownClick = true
        on(document, 'mousemove', this.moveDocumentHandler)
        on(document, 'mouseup', this.upDocumentHandler)
        document.onselectstart = () => false
      },
      moveDocumentHandler(e) {
        const t = this.type
        if (this[t.axis]) {
          const offset = e[t.client] - this.$el.getBoundingClientRect()[t.direction]
          const thumbClickPosition = this.thumb[t.offset] - this[t.axis]
          const thumbClickPositionPercent = (offset - thumbClickPosition) * 100 / this.$el[t.offset]
          this.wrap[t.scroll] = thumbClickPositionPercent * this.wrap[t.scrollSize] / 100
        }
      },
      upDocumentHandler() {
        off(document, 'mousemove', this.moveDocumentHandler)
        this.isDownClick = false
        this[this.type.axis] = 0
        document.onselectstart = null
      },
      handleClickOnTrack(e) {
        const t = this.type
        const halfThumb = this.thumb[t.offset] / 2
        const offset = e[t.client] - this.$el.getBoundingClientRect()[t.direction] - halfThumb
        const offsetToPercent = offset * 100 / this.wrap[t.clientSize]
        this.wrap[t.scroll] = offsetToPercent * this.wrap[t.scrollSize] / 100
      }
    }
  }
</script>