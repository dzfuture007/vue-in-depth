<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="notification" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
      <span class="content">{{content}}</span>
      <a class="btn" @click="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  // 在写组件的时候最好都定义一个name属性
  // 如果要写一个组件库会有非常多的组件去注册到Vue全局的组件里面，如果没有name，每次注册一个组件就需要用字符串来写name，不是很好维护。
  name: 'Notification',
  data () {
    return {
      visible: true
    }
  },
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: 'Close'
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {},
    clearTimer () {},
    createTimer () {}
  }
}
</script>

<style lang="stylus" scoped>
.notification
  display: inline-flex
  background-color #303030
  color rgba(255, 255, 255, 1)
  align-items center
  padding 20px
  min-width 280px
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  flex-wrap wrap
  transition all .3s
.content
  padding 0
.btn
  color #ff4081
  padding-left 24px
  margin-left auto
  cursor pointer
</style>
