import Vue from 'vue'

const app = new Vue({
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  }
  // watch: {
  //   text (newValue, oldValue) {
  //     console.log(`${newValue} : ${oldValue}`)
  //   }
  // }
})

// 不使用el属性，将渲染出来的内容挂载带#root上。
app.$mount('#root')

// 可以通过vue的实例来改变data属性的值，同时会更新dom
setInterval(function () {
  app.text += 1

  // 当通过$options.data来修改数据的时候，dom是不会有任何变化的。
  // 说明传入进去的options里面的data在创建vue对象的时候是做过一些修改的，并不是直接引用$options.data，他们是不相等的。
  // app.$options.data.text += 1

  // 当通过$options.data来修改数据的时候，dom是会发生对应的变化的。
  // 说明挂载在vue实例根对象上的text属性和$data.text是同一个属性。
  // 直接通过vue实例调用data中的数据其实是它代理到app.$data上面的属性。
  // app.$data.text += 1
}, 1000)

// ***************** Vue实例的属性 *****************

// 1. app.$data: 就是new Vue时候传入的data属性
// console.log(app.$data)

// 2. app.$props: 就是new Vue时候声明的props属性。编写.vue文件的时候只有声明了props并且传入了值，它才会有值。

// 3. app.$el: 就是挂载过去的html节点，它就是这个dom节点的引用。
// console.log(app.$el) // <div>0</div>

// 4. app.$options: new Vue的时候它有一个默认值提供给我们，这个默认值和我们传进去的合并之后就是$options。
// console.log(app.$options)

// 5. app.$options.render：它要等下一次有数据变化的时候它才会生效
// app.$options.render = (h) => {
//   return h('div', {}, 'new render funciton')
// }

// 6. app.$root：它是一个vue实例，vue是以一个树状结构往下渲染的，会有一个最上层的根节点，它就是$root。
// 这个根节点就是这里的app，我们是通过new出来的这个app把整个应用挂载到html上面的。
// app.$root === app
// $root在整个vue应用当中，每一个节点上面我们都可以调用，它们拿到的$root都是同一个值，就是最外成的vue对象。
// console.log(app.$root)
// console.log(app.$root === app) // true

// 7. app.$children：它是一个数组，我们在写某个组件中，在组件中写了某个标签，那么这个标签就是作为这个组件的children传入里面的。
// console.log(app.$children)

// 8. app.$slots和app.$scopedSlots：vue的插槽
// console.log(app.$slots)
// console.log(app.$scopedSlots)

// 9. app.$refs: 帮我们快速定位到某个dom节点或者某个组件。
// 这里$refs就是这个div节点对象。
// 如果它是一个html节点，那么返回的就是这个节点对象。
// 如果它是一个组件，那么返回的就是这个组件的实例，这个组件的实例就是一个Vue的实例，就可以进一步操作这个实例。
// console.log(app.$refs)

// 10. app.$isServer
// 一般情况下用不到，只要当项目中加入服务端渲染的时候，才需要使用它去判断。
// 因为我们的有一些代码是可以在服务端渲染去运行，有一些是只能在客户端去运行的
// 有些时候项目中加入了服务端渲染，就需要去判断某些时候我们是在服务端渲染的时候去运行，有些时候只能在客户端去做，我们需要一个值去判断。每一个vue的实例都可以通过它去判断。
// console.log(app.$isServer) // false

// ***************** Vue实例的方法 *****************

// 1. app.$watch：对应在.vue的组件内声明一个watch，含义是一模一样的。
// const unWatch = app.$watch('text', (newValue, oldValue) => {
//   console.log(`${newValue} : ${oldValue}`)
// })

// setTimeout(() => {
//   unWatch()
// }, 2000)

// 2. app.$on和app.$emit：监听自定义事件
app.$on('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})

app.$emit('test', 1, 2)

// 3. app.$once：只会触发一次

// 4. app.$forceUpdate()：强制组件去渲染一次。
