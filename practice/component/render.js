import Vue from 'vue'

const component = {
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  props: ['props1'],
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid black'
      },
      value: "I'm from comp one."
    }
  },
  render (createElement) {
    return createElement('div', {
      style: this.style
      // on: {
      //   click: () => {
      //     this.$emit('click')
      //   }
      // }
    }, [
      this.props1,
      this.$slots.default
    ])
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  methods: {
    handleClick () {
      console.log('click')
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span>{{value}}</span>
  //     </comp-one>
  //   </div>
  // `
  render (createElement) {
    return createElement(
      'comp-one', {
        ref: 'comp',
        props: {
          props1: this.value
        },
        on: {
          click: this.handleClick
        },
        // 绑定到组件的根节点的dom上面
        nativeOn: {
          click: this.handleClick
        }
      }, [
        createElement('span', {
          ref: 'span',
          attrs: {
            id: 'test-id'
          }
        }, this.value)
      ]
    )
  }
})
