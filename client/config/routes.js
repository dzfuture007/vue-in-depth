// 该文件主要放置router相关的设置

import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [{
  path: '/',
  redirect: '/app'
}, {
  path: '/app',
  component: Todo
}, {
  path: '/login',
  component: Login
}]
