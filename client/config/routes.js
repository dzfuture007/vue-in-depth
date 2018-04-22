// 该文件主要放置router相关的设置

// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [{
  path: '/',
  redirect: '/app'
}, {
  // path: '/app/:id',
  // props: true,
  // props: (route) => ({ id: route.query.b })
  path: '/app',
  component: () => import('../views/todo/todo.vue'),
  // components: {
  //   default: Todo,
  //   a: Login
  // },
  name: 'app',
  meta: {
    title: 'this is app',
    description: 'test meta'
  }
  // children: [
  //   {
  //     path: 'test',
  //     component: Login
  //   }
  // ]
}, {
  path: '/login',
  component: () => import('../views/login/login.vue')
  // components: {
  //   default: Login,
  //   a: Todo
  // }
}]
