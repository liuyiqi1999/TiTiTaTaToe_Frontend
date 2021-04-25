import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        connection: null,
        username: '',
    },
    getters: {
        getConn(state){
            return state.connection
        },
    },
    mutations: {
        connect(state) {
            state.connection = new WebSocket("ws://localhost:8888/ws")
        },
    }
})
