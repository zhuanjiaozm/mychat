import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('user')) || {},
    token: sessionStorage.getItem('token') || '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem('token', JSON.stringify(token));
    },
    clearToken(state) {
      state.token = '';
      sessionStorage.setItem('token', '');
    },
    setUser(state, user) {
      state.user = user;
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  },
  actions: {
  },
  modules: {

  },
});
