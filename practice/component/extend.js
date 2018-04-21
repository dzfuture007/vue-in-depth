import Vue from 'vue'

const component = {
  template: `
    <div>
      {{text}}
      <span v-show="active">seem me if active</span>
      <span>{{propOne}}</span>
      <span>{{test}}</span>
    </div>
  `,
  props: {
    active: Boolean,
    propOne: String
  },
  data () {
    return {
      text: 123
    }
  },
  mounted () {
    console.log('mounted in obj')
  }
}

// ***************通过Vue.extend生成一个子类，通过new来创建一个子类对象 **************
// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   propsData: {
//     active: true,
//     propOne: '456'
//   },
//   data () {
//     return {
//       text: '789',
//       test: 'test child vue'
//     }
//   },
//   mounted () {
//     console.log('mounted in options')
//   }
// })

// ***************extends **************
const component2 = {
  extends: component,
  data () {
    return {
      text: '789',
      test: 'test child vue'
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
  }
}

new Vue({
  name: 'Root',
  el: '#root',
  components: {
    Comp: component2
  },
  template: `<comp :active="true" prop-one="prop one"></comp>`
})
