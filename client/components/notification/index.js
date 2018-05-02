import Notification from './notification.vue'
import notify from './function'

// 全局注册Notification组件，这样在任何地方都可以使用该组件。
// 在写组件的时候最好都定义一个name属性
// 如果要写一个组件库会有非常多的组件去注册到Vue全局的组件里面，如果没有name，每次注册一个组件就需要用字符串来写name，不是很好维护。
// 这样注册完之后就可以像使用Vue插件一样通过Vue.use(xxx)来使用了
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
