<template>
  <div class="home">
    <el-container>
      <el-container>
        <el-header>
          <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
        </el-header>
        <!-- <button @click="handerOne">3212</button>] -->
        <Main />
      </el-container>
    </el-container>
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
  height: 100vh;
}

.el-main {
  display: flex;
}

.el-header {
  //Header的样式
  padding: 0 0 0 0;
  background-color: #fff;
}
</style>