<template>
    <div class="home">
      <!--左侧容器-->
      <el-container>
        <!--侧边栏-->
        <el-aside width="270px">
          <RallyAside />
        </el-aside>
  
        <!--右侧容器-->
        <el-container>
          <!--头部-->
          <el-header>
            <RallyHeader />
          </el-header>
  
          <!--中间部-->
          <el-main>
            <RallyMain />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script setup>
import RallyAside from '../components/rallyComponents/rallyAside.vue'
import RallyHeader from '../components/rallyComponents/rallyHeader.vue'
import RallyMain from '../components/rallyComponents/rallyMain.vue'
</script>

<style lang="less" scoped>
.el-aside {
  width: 270px;
  background-color: #FF9933;
  width: 270px;
  overflow: hidden;
}

.el-container {
  height: 100vh;
}

.el-main {
  display: flex;
}

.el-header {
  background-color: #FF9933;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>