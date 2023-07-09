import Vuex from 'vuex'
import actions from "./modules/actions"
import mutations from "./modules/mutations"

const store = new Vuex.Store({
    state: {
        auth: {
            token: sessionStorage.getItem('token'),
        },
        urlDb: "raspi.lan:3001",
    },
    actions,
    mutations,
    modules: {},
})

export default store