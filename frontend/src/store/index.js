import Vuex from 'vuex'
import actions from "./modules/actions"
import mutations from "./modules/mutations"
import { baseUrl } from "../config"

const store = new Vuex.Store({
    state: {
        auth: {
            token: localStorage.getItem('token'),
        },
        io_options: { path: baseUrl + '/socket.io' },
    },
    actions,
    mutations,
    modules: {},
})

export default store