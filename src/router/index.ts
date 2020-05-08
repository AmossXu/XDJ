import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import UsersInfo from '../components/Users/UsersInfo.vue'
import UsersHealthInfo from '../components/Users/UsersHealthInfo.vue'
import User_home from '../components/Users/User_home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: "/home",
    name: 'home',
    redirect: "/usersInfo",
    component: Home, children: [
      {
        path: "/usersInfo",
        name: "usersInfo",
        component: UsersInfo
      },
      {
        path: "/usersHealthInfo",
        name: "usersHealthInfo",
        component: UsersHealthInfo
      }
    ]
  },
  {
    path: "/user_home",
    name: "user_home",
    component: User_home
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
