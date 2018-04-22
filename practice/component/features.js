import Vue from 'vue'

const component = {
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="footer">
  //       <slot name="footer"></slot>
  //     </div>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot :value="value" aaa="789"></slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid black'
      },
      value: "I'm from comp one."
    }
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
  mounted () {
    console.log(this.$refs.comp, this.$refs.span)
  },
  // template: `
  //   <div>
  //     <comp-one>
  //       <span>{{text}}</span>
  //       <span slot="header">Header</span>
  //       <span slot="footer">footer</span>
  //     </comp-one>
  //   </div>
  // `
  template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props" ref="span">{{props.value}} {{props.aaa}} {{value}}</span>
      </comp-one>
    </div>
  `
})
