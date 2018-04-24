import Vuex from 'vuex'
import Vue from 'vue'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters
  })
}
