import * as types from "./mutation-types"

export default {
  [types.LOGIN] (state, payload) {
    state.auth.token = payload.token;
  },
  [types.LOGOUT] (state, payload) {
    state.auth.token = payload.token;
  }
}