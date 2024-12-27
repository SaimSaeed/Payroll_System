// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/scss/style.scss"
import "bootstrap-vue/dist/bootstrap-vue.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { store } from "./store/store";

Vue.use(Toast);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store: store,
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
