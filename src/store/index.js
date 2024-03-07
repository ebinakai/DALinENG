import Vuex from 'vuex'
import actions from "./modules/actions"
import mutations from "./modules/mutations"

const store = new Vuex.Store({
    state: {
        auth: {
            token: localStorage.getItem('token'),
        },
        urlDb: "localhost:3001",
    },
    actions,
    mutations,
    modules: {},
})

export default store