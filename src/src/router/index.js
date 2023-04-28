import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login";


//router config
const router = createRouter({
  //choose hash router
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
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
      path: "/MembersDetails",
      component: () => import("../views/MembersDetails.vue"),
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
    },
    {
      path: "/profile",
      component: () => import("../views/Profile.vue"),
    },
    {
      path: "/test",
      component: () => import("../views/test.vue"),
    },
    {
      path: "/edit",
      component: () => import("../views/Avatar.vue"),
    },
    {
      path:"/rally",
      component:()=>import("../views/Rally.vue")
    },
     {
      path:'/RallyDetail',
      name:'RallyDetail',
      component:()=>import('../views/RallyDetails.vue')
    },

  ],
});

//router interception (if I did not login,I can not access the home page)
router.beforeEach((to, from, next) => {
  if(to.path === '/login'){
    if (localStorage.getItem("@#@TOKEN")) {
      next('/home');
    }else{
      next();
    }
    return;
  }
  if(to.meta.isAuth){
    if (localStorage.getItem("@#@TOKEN")) {
      next();
    } else {
      ElMessage.error("Please login first");
      next('/login');
    }
    return;
  }
  next();
});
export default router;
