import{createRouter,createWebHashHistory}from 'vue-router'

//router config
const router=createRouter({
    //choose hash router
    history:createWebHashHistory(),
    routes:[{
        path:'/',
        redirect:'/home'
    },
{
    path:'/home',
    component:()=>import('../views/Home.vue'),
    meta:{
        isAuth:true
    }
},{
    
    path:'/register',
    component:()=>import('../views/Register.vue')
},{
    path:'/login',
    component:()=>import('../views/Login.vue')
}
]
})


//router interception (if I did not login,I can not access the home page)
router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth){
        if(localStorage.getItem('token')){
            next()
            // check on mac
        }else{
            ElMessage.error('Please login first')
        }
    }
    else{
        next();
        }

})
export default router;