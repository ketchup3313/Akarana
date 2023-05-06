import { createRouter, createWebHashHistory} from 'vue-router';

//路由配置 
const router = createRouter({
    //选择hash路由
    history: createWebHashHistory(), 
    routes: [
        {
            path:'/',
            redirect:'/login',
        },

        {
            path:'/home',
            component: ()=> import('../views/Home.vue'),
            meta:{
                isAuth: {
                    isAuth:true,
                }
            }
        },

        {
            path:'/login',
            component: ()=> import('../views/Login.vue'),
        },

        {
            path:'/register',
            component: ()=> import('../views/MemberRegister.vue'),
        },

        {
            path:'/photo',
            component: ()=> import('../views/Photo.vue'),
        },

        {
            path:'/admin',
            component: ()=> import('../views/AdministerInfo.vue')
        },

        {
            path: '/rally',
            component: () => import('../views/Rally.vue')
        },
        
        {
            path: '/createRally',
            component: () => import('../views/CreateRally.vue')
        },
    ],
})

//路由拦截
router.beforeEach((to, from, next) =>{
    //需要判断用户是否登录
    if(to.meta.isAuth){
        //如果已经登陆了
        if (localStorage.getItem('token')) {
            next()
        }else{
            ElMessage({
                message: 'You have to login first.',
                type: 'warning',
              })
        }
    }else{
        next()
    }
})
export default router;