import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/rules",
    children: [
      {
        path: "/rules",
        name: "Rules",
        component: () => import("../views/Rules.vue"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/records",
        name: "Records",
        component: () => import("../views/Records.vue"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/monitor",
        name: "Monitor",
        component: () => import("../views/Monitor.vue"),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
