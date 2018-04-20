import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Name: {{fullname}}</p>
      <p>Number: {{ number }}</p>
      <p>Number: <input type="text" v-model="number"></p>
      <p>Firstname: <input type="text" v-model="firstname"></p>
      <p>Lastname: <input type="text" v-model="lastname"></p>
      <p>Name: <input type="text" v-model="name"></p>
      <p>Obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstname: 'Jokcy',
    lastname: 'Lou',
    number: 0,
    fullname: ' ',
    obj: {
      a: '123'
    }
  },

  // computed是一个对象，它里面有很多方法，这些方法返回的数据可以像调用变量一样在模板中去调用。
  // vue会对computed里的属性做一个缓存，只有当它依赖的数据变化的时候才会重新计算得到一个新的值重新缓存起来。
  // 提升性能
  // 什么时候用？
  // 我们得到的数据不是我们想要显示的数据，想要显示的数据需要经过一些计算，把它拼接起来，得到数据去显示，这时候使用computed比较方便。
  // 在computed中最好只是使用依赖的数据去生成一个新的值，不要去修改原始值。
  computed: {
    name () {
      console.log('new name')
      return `${this.firstname} ${this.lastname}`
    }

    // 通过修改computed中name的值去修改原始数据firstname和lastname。
    // 一般不要使用这种方式去修改computed对象的属性值。
    // name: {
    //   get () {
    //     console.log('new name')
    //     return `${this.firstname} ${this.lastname}`
    //   },
    //   set (name) {
    //     const names = name.split(' ')
    //     this.firstname = names[0]
    //     this.lastname = names[1]
    //   }
    // }
  },

  // 默认情况下，watch方法最初绑定的时候它是不会执行的，只有当watch的属性值发生改变的时候才会执行。
  // watch使用场景：你监听到了某一个数据的变化，然后你要去做某一个指定的操作，就需要watch这个数据。
  // watch: {
  //   firstname (newName, oldName) {
  //     this.fullname = newName + ' ' + this.lastname
  //   }
  // },

  // 修改obj的引用，会触发watch obj的事件。
  // mounted () {
  //   this.obj = {
  //     a: '345'
  //   }
  // },

  // 想要watch方法刚开始就执行需要这样写
  watch: {
    firstname: {
      handler (newName, oldName) {
        this.fullname = newName + ' ' + this.lastname
      },
      // 组件渲染完后立即执行这个handler
      immediate: true
    },

    // watch监听对象：默认情况下当watch一个对象的时候，只有当对象的引用发生变化，才会触发handler。
    // 当设置了deep为true之后，是把obj下的所有属性都遍历了一遍，是一层一层向下遍历，给所有属性都加上了监听事件，性能会很差。
    // 优化：将obj改为'obj.a'并去掉deep: true
    // obj: {
    //   handler () {
    //     console.log('obj.a changed')
    //   },
    //   immediate: true,
    //   deep: true
    // }
    // 它会一层一层的找到我们需要监听的这个属性，才会给它加上监听事件。
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true
    }
  },

  // 当data中的任何数据改变都会引起组件重新渲染，导致每次都会调用getFullname，重新计算。
  methods: {
    getName () {
      console.log('func invoked')
      return `${this.firstname} ${this.lastname}`
    }
  }
})
