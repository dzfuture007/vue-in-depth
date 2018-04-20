import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div :class="['test', {active: isActive}]">
      <p :class="[isActive ? 'active' : 'unactive']" @click="test">456</p>
      <p v-html="html" :class="{active: isActive}"></p>
    </div>
  `,
  data: {
    isActive: true,
    html: '<span>123</span>'
  },
  methods: {
    test () {
            alert('test') // eslint-disable-line
    }
  }
})
