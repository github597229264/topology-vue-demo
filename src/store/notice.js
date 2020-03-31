export const state = () => ({
  error: {
    text: ''
  }
})

export const mutations = {
  error(state, error) {
    state.error = error
  }
}
