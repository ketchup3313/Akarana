<template>
  <div class="home">
    <el-container>
      <el-container>
        <el-header>
          <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
        </el-header>
     
          <!-- <iframe src="https://calendar.google.com/calendar/embed?src=d769099043f60609b0d5364fc06073bc9329a9ab534149bcde14b89a0ae51646%40group.calendar.google.com&ctz=Pacific%2FAuckland" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe> -->
          <!-- <button @click="handerOne">3212</button>] -->
        
      
        <Main />
      </el-container>
    </el-container>
  </div>
</template>
<script setup>


import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import Main from '../components/Main.vue'
import request from '../utils/request'

import http from '@/utils/request'

import { onMounted, ref } from 'vue'
const isCollapse = ref(false)
const handerOne = () => {
  http.get(`/api/mine/queryInfo?id=${2}`);
  http.post('/api/mine',{
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