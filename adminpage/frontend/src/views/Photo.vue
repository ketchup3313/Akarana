<template>
  <div>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Header from '../components/photoComponents/photoHeader.vue';
import Main from '../components/photoComponents/photoMain.vue';
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