export const state = () => ({
  event: {
    name: '',
    data: null
  }
})

export const mutations = {
  emit(state, event) {
    state.event = event
  }
}
