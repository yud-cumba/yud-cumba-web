import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: false,
    english: false,
  },
  mutations: {
    SET_DARKMODE(state, darkMode) {
      state.darkMode = darkMode;
    },
    SET_ENGLISH(state, mode) {
      state.english = mode;
    },
  },
});
