<template>
  <el-menu 
  :collapse="isCollapse"
  
  class="el-menu-vertical-demo"
  active-text-color="#ffd04b"
  
  background-color="#545c64"
  text-color="#fff"
  >
    <div class="xd-icon">
      <img src="../../public/ICON.png">
      <span>
        Member Only
      </span>

    </div>
    <el-sub-menu index="1">
      <template #title>
       <el-icon><Comment /></el-icon>
        <span>Communication</span>
      </template>

      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <!-- icon -->
        <el-icon><UserFilled /></el-icon>
        <span>Profile</span>
      </template>
    
        
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
  
  
      </el-sub-menu>
  </el-menu>
</template>

<script setup>
  import { DefineProps } from 'vue';

const {isCollapse}=defineProps(['isCollapse'])



</script>

<style lang="less" scoped>
  .el-radio-button__inner {
  padding: 0;
}

.el-menu--collapse {
  border: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border: none;
}

.xd-icon {
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 60px;
  background-color: #fff;
  white-space: nowrap;
  padding-left: 15px;

  img {
    width: 450px;
    height: 40px;
    margin-right: 10px;
  }
}
</style>
