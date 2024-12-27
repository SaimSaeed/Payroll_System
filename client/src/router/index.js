import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Historical from "../components/Historical.vue";
import Profile from "../components/Profile.vue";
import Monthly from "../components/Monthly.vue";
import Register from "../components/Register.vue";
import { store } from "../store/store";
import PayrollList from "../components/admin/PayrollList.vue";
import Userlist from "../components/admin/Userlist.vue";
import UpdateUser from "../components/admin/updateUser.vue";
import UpdatePayroll from "../components/admin/UpdatePayroll.vue";
import CreatePayroll from "../components/admin/CreatePayroll.vue";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/home",
      component: Home, // Home component has the sidebar
      children: [
        {
          path: "", // Default route
          component: Historical,
        },
        {
          path: "profile", // Nested route for Profile
          component: Profile,
        },
        {
          path: "monthly", // Nested route for Profile
          component: Monthly,
        },
        {
          path: "admin/userList",
          name: "userList",
          component: Userlist,
        },
        {
          path: "admin/payrollList",
          name: "payrollList",
          component: PayrollList,
        },
        {
          path: "admin/:id/updateuser",
          name: "updateUser",
          component: UpdateUser,
        },
        {
          path: "admin/:id/updatepayroll",
          name: "updatePayroll",
          component: UpdatePayroll,
        },
        {
          path: "admin/create",
          name: "createPayroll",
          component: CreatePayroll,
        },
      ],
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = store.state.user;
  if (
    to.name === "login" ||
    to.name === "register" ||
    to.path === "/" ||
    to.path === "/register"
  ) {
    if (user) {
      next("/home");
    } else {
      next();
    }
  } else if (to.name === "userList" || to.name === "payrollList" || to.path === "/home/admin/payrollList" || to.path === "/home/admin/userList"){
     if(user && user.isAdmin){
      next()
     }else{
      next("/home")
     }
  }else if (
    to.name === "home" ||
    to.name === "profile" ||
    to.name === "monthly" ||
    to.path === "/home" ||
    to.path === "/home/profile" ||
    to.path === "/home/monthly"
  ) {
    if (!user) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
