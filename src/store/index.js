import Vuex from 'vuex'
import actions from "./modules/actions"
import mutations from "./modules/mutations"

const store = new Vuex.Store({
    state: {
        auth: {
            userId: null,
            token: null,
        },
        urlDb: "http://192.168.68.82:3001",
    },
    actions,
    mutations,
    modules: {},
})

export default store