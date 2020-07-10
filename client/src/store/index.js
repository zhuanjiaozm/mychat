import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: JSON.parse(sessionStorage.getItem('token')) || '',
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
  },
  actions: {
  },
  modules: {

  },
});
