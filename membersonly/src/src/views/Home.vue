<template>
   

   <div class="ha">
    <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />


    

   
        <img class="header-image" src="/homepage.png" >
        <!-- <button @click="handerOne">3212</button>] -->
      </div>
</template>
  <script >
  import Header from '../components/Header.vue'
  import Aside from '../components/Aside.vue'
  import Main from '../components/Main.vue'
  import request from '../utils/request'
  import http from '@/utils/request'
  import { onMounted, ref } from 'vue'

  export default {
    mounted(){

    },
    setup() {
      const isCollapse = ref(false)
      const handerOne = () => {
        http.get(`/api/mine/queryInfo?id=${2}`);
        http.post('/api/mine', {
          "id": 2,
          "firstName": "kk2222222222",
          "lastName": "k222222k",
          "phoneNumber": "434343",
          "username": "43",
          "password": "43",
          "address": "4343",
          "emailAddress": "43",
          "birthday": "43",
          "occupation": null
        })
      }

      const handleCollapse = () => {
        isCollapse.value = !isCollapse.value
      }


      return {
        isCollapse,
        handerOne,
        handleCollapse
      }
    }
  }





  </script>

<style lang="less" scoped>
.el-aside {
  width: auto;
  background-color: #545c64;
  width: auto;
  overflow: hidden;
}

.el-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.el-header {
  //Header的样式
  padding: 0 0 0 0;
  background-color: #fff;
}

.header-image {
  width: 100%;
  height: 94%;

}
.ha{
  width: 100%;
  height: 100%;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>