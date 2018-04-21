import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
        <input type="radio" value="three" v-model="picked">
      </div>
    </div>
  `,
  data: {
    text: 0,
    active: true,
    arr: [0, 2, 3],
    picked: ''
  }
})
