<template>
  <div class="home">
    <el-container>


      <el-container>
        <el-header>
          <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
        </el-header>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>


import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import Main from '../components/Main.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
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