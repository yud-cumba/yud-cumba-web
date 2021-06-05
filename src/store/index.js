import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: false,
    english: false,
    isJump: false,
    isFront: true,
  },
  mutations: {
    SET_DARKMODE(state, darkMode) {
      state.darkMode = darkMode;
    },
    SET_ENGLISH(state, mode) {
      state.english = mode;
    },
    SET_SCREENS(state, screens) {
      state.screens = screens;
    },
    SET_JUMP(state, isJump) {
      state.isJump = isJump;
    },
    SET_FRONT(state, boolean) {
      state.isFront = boolean;
    },
  },
});
