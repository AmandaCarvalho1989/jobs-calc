import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/job",
    name: "Job",
    props: true,
    component: () => import("../views/Job.vue"),
  },
  {
    path: "/job/:id",
    name: "JobDetails",
    props: true,
    component: () => import("../views/Job.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
