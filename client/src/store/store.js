import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: localStorage.getItem("PayrollUser")
      ? JSON.parse(localStorage.getItem("PayrollUser"))
      : null,
  },
  mutations: {
    setCredentials: (state, userData) => {
      state.user = userData;
      localStorage.setItem("PayrollUser", JSON.stringify(state.user));
    },
    logOutUser: (state) => {
      state.user = null;
      localStorage.removeItem("PayrollUser");
    },
  },
  actions: {
    setCredentials({ commit }, userData) {
      commit("setCredentials", userData);
    },
    logOutUser({ commit }) {
      commit("logOutUser");
    },
  },
});
