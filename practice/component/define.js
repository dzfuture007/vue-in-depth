import Vue from 'vue'

const component = {
  template: `
    <div>
      {{text}}
      <span v-show="active">seem me if active</span>
      <span>{{propOne}}</span>
    </div>
  `,
  props: {
    active: {
      type: Boolean,
      required: true
    },
    propOne: String
  },
  data () {
    return {
      text: 123
    }
  }
}

// 全局中定义
// Vue.component('CompOne', component)
// new Vue({
//   el: '#root',
//   template: '<comp-one></comp-one>'
// })

// 只在某个组件中定义
new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  template: `
    <div>
      <comp-one :active="true" prop-one="test1"></comp-one>
      <comp-one :active="false" prop-one="test2"></comp-one>
    </div>
  `
})
