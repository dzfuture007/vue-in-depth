<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <transition name="fade">
      <router-view/>
    </transition>
    <button @click="notify">click me1</button>
    <!-- <notification content="test notify"/> -->
    <Footer></Footer>
  </div>
</template>

<script>
// import {
//   mapState,
//   mapGetters,
//   mapMutations,
//   mapActions
// } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'Frank\'s Todo App'
  },
  components: {
    Header,
    Footer
  },
  computed: {
  },
  methods: {
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


