import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },

  // 初始化事件和生命周期之后，初始化注入和响应之前执行。
  // 在beforeCreate的时候它的事件已经OK，但是它的reactivity还没有OK，所以在beforeCreate中不要去修改数据。
  // 如果你要执行ajax请求给data中的数据赋新的值，最早也要放在created中去做不要放在beforeCreated中。
  beforeCreate () {
    console.log(this.$el, 'beforeCreate') // undefined  "beforeCreate"
  },

  // 初始化注入和响应之后执行。
  created () {
    console.log(this.$el, 'created') // undefined  "created"
  },

  // 如果你想在beforeCreate()和created()方法中执行DOM操作是不能实现的。

  // 1. 判断有没有el选项，如果有继续判断有没有template选项。
  // 如果没有需要等到vue实例的$mount方法被调用的时候才去判断有没有template选项。
  // 2. 如果有template选项，就把template编译成render方法，然后调用beforeMount。
  // 如果没有就把el元素的outerHTML作为模板，然后调用beforeMount。
  beforeMount () {
    console.log(this.$el, 'beforeMount') // <div id="root"></div> "beforeMount"
  },

  // 创建了vue实例的$el对象，并且用$el的内容挂载（替换）到el指定的元素行之后执行
  mounted () {
    console.log(this.$el, 'mounted') // <div>0</div> "mounted"
  },

  // 服务端渲染的时候根本没有DOM执行的环境，所有beforeMount和mounted是不会执行的。

  // beforeUpdate是在数据变化的时候DOM重新渲染之前执行
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },

  // 虚拟DOM重新加载之后执行updated，然后继续执行Mounted去更新html内容。
  updated () {
    console.log(this, 'updated')
  },

  activated () {
    console.log(this, 'activated')
  },

  deactivated () {
    console.log(this, 'deactivated')
  },

  // 当调用vue实例的$destroy方法的时候执行beforeDestroy
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },

  // 注销vue实例的所有watch方法，子组件和事件监听之后执行destroyed方法。
  destroyed () {
    console.log(this, 'destroyed')
  },

  // render方法会在beforeMount之后和mounted之前运行。
  // 在进行.vue开发的时候，都是没有template的。在.vue文件中写的template都经过了vue-loader处理，直接变成了render function放在了vue-loader解析过的文件里面。
  // 好处：vue-loader解析template是一个比较耗时的过程，vue-loader帮我们处理之后，在页面上执行vue代码的时候效率会变得更高。
  render (h) {
    console.log('render function invoked')

    return h('div', {}, this.text)
  },

  // 只有在开发环境才会被调用
  // 只有当本组件在render方法种报错的时候才会被调用，它不关心子组件的错误。
  renderError (h, err) {
    return h('div', {}, err.stack)
  },

  // 会向上冒泡，在正式环境也能使用。
  /// 如果在根组件写了这个方法，那么它会收集到所有组件的错误。
  errorCaptured () {}
})

app.$mount('#root')

setInterval(() => {
  app.text += 1
}, 1000)

// setTimeout(() => {
//   app.$destroy()
// }, 5000)
