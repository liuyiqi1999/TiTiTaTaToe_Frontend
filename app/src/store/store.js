import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        connection: null,
        username: '',
        opponent: '',
    },
    getters: {
        getConn(state){
            return state.connection
        },
    },
    mutations: {
        connect(state) {
            state.connection = new WebSocket("ws://112.126.65.41:8888/ws")
            // state.connection = new WebSocket("ws://localhost:8888/ws")
        },
    }
})