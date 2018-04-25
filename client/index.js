import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)

const router = createRouter()
const store = createStore()

// 应用场景：使用了router的异步加载功能，我们发现有一个store的模块只有在异步加载的组件才能用到，别的模块根本你用不到。
// 能不能把这部分store的代码也拆分到那个异步加载的组件中去呢？
// 就需要sotre提供动态注册一个模块的功能。
store.registerModule('c', {
  state: {
    text: 3
  }
})

// store.watch(state => state.count + 1, (newCount) => {
//   console.log('new count watched: ', newCount)
// })

store.subscribe((mutation, state) => {
  console.log(mutation.type) // mutation的名字
  console.log(mutation.payload) // 获得这个mutation的参数
})

store.subscribeAction((action, state) => {
  console.log(action.type) // action
  console.log(action.payload) // 获得这个action的参数
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
