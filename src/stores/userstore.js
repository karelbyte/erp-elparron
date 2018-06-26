const state = {
  user: null
}

const mutations = {
  SET_USER (state, userObj) {
    state.user = userObj
  },
  CLEAR_USER (state) {
    state.user = null
  }
}

const actions = {
  setUserObject: ({commit}, userObj) => {
    commit('SET_USER', userObj)
  },
  clearUserObject: ({commit}) => {
    commit('CLEAR_USER')
  }
}

export default {
  state, mutations, actions
}
