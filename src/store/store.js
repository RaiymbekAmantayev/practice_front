import { createStore } from 'vuex';

export default createStore({
    strict: true,
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            state.isUserLoggedIn = !!token;
            localStorage.setItem('token', token);
            if(token){
                state.isUserLoggedIn=true
            }
            else{
                state.isUserLoggedIn=false
            }
        },
        setUser(state, user) {
            console.log('Received user:', user);
            state.user = user;
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        setUser({ commit }, user) {
            commit('setUser', user);
        }
    }
});