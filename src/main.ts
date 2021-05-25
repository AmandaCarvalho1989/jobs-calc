import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { loadProfileData } from "./services/profile";

Vue.config.productionTip = false;
Vue.prototype.$appName = "Meu Aplicativo";

new Vue({
  router,
  render: (h) => h(App),
  data: {
    currentProfile: {},
  },

  async mounted() {
    this.currentProfile = await loadProfileData();
  },
}).$mount("#app");
