const state = {
  passport: null
}

const mutations = {
  SET_PASSPORT (state, passportObj) {
    state.passport = passportObj
  },
  CLEAR_PASSPORT (state) {
    state.passport = null
  }
}

const actions = {
  setPassportObject: ({commit}, passportObj) => {
    commit('SET_PASSPORT', passportObj)
  },
  clearPassportObject: ({commit}) => {
    commit('CLEAR_PASSPORT')
  }
}

export default {
  state, mutations, actions
}
