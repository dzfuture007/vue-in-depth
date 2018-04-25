<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}}</p>
    <p>{{counter}}</p>
    <!-- <p>{{textC}}</p>
    <p>{{textPlus}}</p> -->
    <!-- <todo></todo> -->
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view/>
    </transition>
    <Footer></Footer>
    <!-- <router-view name="a"/> -->
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    console.log(this.$store)
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
    // action
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000)
    // mutation
    // let i = 1
    // setInterval(() => {
    //   this.updateCount({
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000)
    // 这里可以直接调用模块的mutation，不用加上命名空间。
    // 因为默认vuex会把模块的mutaion放在全局的命名空间当中。
    // this.updateText(123)
    // 加上了命名空间
    // this['a/updateText']('123')
    // this['a/add']()
    // this.testAction()
  },
  computed: {
    // ...mapState({
    //   counter: (state) => state.count,
    //   textA: state => state.a.text,
    //   textC: state => state.c.text
    // }),
    // ...mapState({
    //   counter: 'count'
    // }),
    ...mapState({
      counter: (state) => state.count
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // ...mapGetters({
    //   'fullName': 'fullName',
    //   textPlus: 'a/textPlus1'
    // })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    // textA () {
    //   return this.$store.state.b.text
    // }
  },
  methods: {
    // mutations不加命名空间
    // ...mapMutations(['updateCount', 'updateText']),
    // mutations加命名空间
    // ...mapMutations(['updateCount', 'a/updateText']),
    // ...mapActions(['updateCountAsync', 'a/add', 'testAction'])
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync'])
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


