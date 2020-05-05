var Please = require("pleasejs")

const state = {
  numTiles: 16,
  sizeTiles: 100,

  colors: [], // color map for each tile
  animals: [], // animal map for each tile 'B', 'G' or 'X'
  startGame: false,

  score: 0
}

const mutations = {
  setNumTiles(state, value) {
    state.numTiles = value
  },
  setSizeTiles(state, value) {
    state.sizeTiles = value
  },
  setColors(state, payload) {
    state.colors = [...payload]
  },
  resetAnimals(state, payload) {
    state.animals = [...payload]
  },
  updateAnimal(state, payload) {
    state.animals[payload.index] = payload.value
  },
  setStartGame(state, value) {
    state.startGame = value
  },
  setScore(state, value) {
    state.score = value
  }
}

const actions = {
  setNumTiles({commit, dispatch}, value) {
    commit('setNumTiles', value)
    dispatch('resetAnimals')
    dispatch('resetGenerateColors')
    localStorage.setItem('numTiles', JSON.stringify(value))
  },
  setSizeTiles({commit}, value) {
    commit('setSizeTiles', value)
    localStorage.setItem('sizeTiles', JSON.stringify(value))
  },
  // use this to reset & generate colors
  resetGenerateColors({commit, state}) {
    let payload = []
    for (let i=0; i < state.numTiles; i++) {
      payload.push(Please.make_color()[0])
    }
    commit('setColors', payload)
  },
  // use this to reset animals
  resetAnimals({commit, state}) {
    let payload = []
    for (let i=0; i < state.numTiles; i++) {
      payload.push('X')
    }
    commit('resetAnimals', payload)
  },
  updateAnimal({commit}, payload) {
    commit('updateAnimal', payload)
  },
  setStartGame({commit}, value) {
    commit('setStartGame',value)
  },
  setScore({commit}, value) {
    commit('setScore', value)
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
