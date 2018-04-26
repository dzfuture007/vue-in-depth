import Vuex from 'vuex'
import Vue from 'vue'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

Vue.use(Vuex)

export default () => {
  const store = new Vuex.Store({
    // strict只有在开发模式才能设置为true
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          // state是a模块的state
          updateText (state, text) {
            state.text = text
          }
        },
        getters: {
          // state是a模块的state
          // getters是所有getter方法
          // rootState是全局的state
          textPlus (state, getters, rootState) {
            return state.text + rootState.count + 1
          }
        },
        actions: {
          // 参数是一个类似store的对象，包含该stae, commit方法, rootState
          add ({ state, commit, rootState }) {
            // 默认是找本模块的mutataion
            commit('updateText', '456')
            // 如果想要调用全局的mutation，需要加上参数{ root: true }
            commit('updateCount', { num: 1 }, { root: true })
          }
        }
      },
      b: {
        state: {text: 2},
        actions: {
          // 如果想要调用其他模块的mutation，也需要加上参数{ root: true }，并且要把命名空间写完整。
          testAction ({ commit }) {
            commit('a/updateText', 'test text', { root: true })
          }
        }
      }
    }
  })

  // store的热更新，不刷新页面
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
