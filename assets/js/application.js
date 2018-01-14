import Vue from "vue";
import VueRouter from "router";
Vue.use(VueRouter);

import BandComponent from "./components/band.vue";
import MembersComponent from "./components/members.vue";

const routes = [
  {path: "/band/:id", component: MembersComponent, name: "showBand"},
  {path: "/", component: BandComponent}
];

const router = new VueRouter({
  mode: "history",
  routes
});

const app = new Vue({
  el: '#app',
  router
});
