import Vue from "vue";
import App from "./App.vue";
import { IProfile } from "./models/profile";
import router from "./router";
import { loadProfileData } from "./services/profile";

Vue.config.productionTip = false;
Vue.prototype.$appName = "Meu Aplicativo";

new Vue({
  router,
  render: (h) => h(App),
  data: {
    currentProfile: {} as IProfile,
  },

  async mounted() {
    this.currentProfile = await loadProfileData();
  },
  methods: {},
}).$mount("#app");
