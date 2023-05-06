import { createStore } from 'vuex'
import http from '@/utils/request'

// 创建一个新的 store 实例
const store = createStore({
    state () {
      return {
        userInfo: {}
      }
    },
    mutations: {
      // Reset user info
      RESET_USERINFO(state){
        localStorage.removeItem('userInfo');
        state.userInfo = {};
      },
      SET_USERINFO (state,{userInfo}) {
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
        state.userInfo = {
          ...userInfo
        }
      }
    },
    actions:{ 
      async changeUserInfo({state,commit},{payload}){
        console.log(state.userInfo);
        // let curUserInfoState = state.userInfo;
        try {
          let {msg,status} =  (await http.post('/api/mine', payload)).data
          if(status === 0){
            console.log(1);
            commit({
              type:'SET_USERINFO',
              userInfo:payload
            })
            ElMessage({
              message: "userInfo edit success !",
              type: "success",
            });
            return;
           }else{
            ElMessage({
              message: msg,
              type: "error",
            });
           }
        } catch (error) {
          ElMessage({
            message: error.message,
            type: "error",
          });
        }
       
        //  commit({
        //   type:'SET_USERINFO',
        //   userInfo:curUserInfoState
        // })
      },
      // type pyload
      async getUserInfo({commit,state},{payload}){
      let userInfo = localStorage.getItem('userInfo');
      if(userInfo !== '{}' &&  userInfo ){
        commit({
          type:'SET_USERINFO',
          userInfo:JSON.parse(userInfo)
        });
        return;
      }
        // commit({type:'SET_USERINFO',userinfo})
       let {data,status} = (await http.get(`/api/mine/queryInfo?id=${payload}`)).data
       if(status === 0){
        commit({
          type:'SET_USERINFO',
          userInfo:data
        })
       }
      }
    }
  })

export default store;