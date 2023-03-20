import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login";


//router config
const router = createRouter({
  //choose hash router
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/Login",
    },
    {
      path: "/home",
      component: () => import("../views/Home.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/members",
      component: () => import("../views/Members.vue"),
    },
    {
      path: "/login",
      name:'login',
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/NewsLetter",
      component: () => import("../views/NewsLetter.vue"),
    },{
      path: "/Photo",
      component: () => import("../views/Photo.vue"),
    }
  ],
});

//router interception (if I did not login,I can not access the home page)
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      ElMessage.error("Please login first");
    }
  } else {
    next();
  }
});
export default router;
