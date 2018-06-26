import Vue from 'vue'
import Vuex from 'vuex'
import passportstore from './stores/passportstore'
import userstore from './stores/userstore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {passportstore, userstore}
})
