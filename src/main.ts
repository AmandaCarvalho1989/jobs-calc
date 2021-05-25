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
    currentProfile: {
      name: "",
      pictureLink: "",
      monthlyBudget: 0,
      daysPerWeek: 0,
      hoursPerDay: 0,
      vacationsPerYear: 0,
      valueHour: 0,
    },
  },

  async mounted() {
    this.currentProfile = await loadProfileData();
  },
  methods: {},
}).$mount("#app");
