<template>



  <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" active-text-color="#ffd04b" background-color="#545c64"
    text-color="#fff">
    <div class="xd-icon">
      <img src="../../public/ICON.png">
      <span>
        Member Only
      </span>

    </div>
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Comment />
        </el-icon>
        <span>Acitivity</span>
        
      </template>

      <el-menu-item index="1-1">Rally</el-menu-item>
      <el-menu-item index="1-2">Newsletter</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <!-- icon -->
        <el-icon>
          <UserFilled />
        </el-icon>
        <span>Member </span>
      </template>


      <el-menu-item index="2-1">Member</el-menu-item>
      <el-menu-item index="2-2">Photo</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <Comment />
        </el-icon>
        <span>
          About me
        </span>
      </template>
      <el-menu-item index="3-1">Setting</el-menu-item>

    </el-sub-menu>

    <el-menu-item index="4">
      <el-icon>
        <QuestionFilled />
      </el-icon>How to use
    </el-menu-item>




  </el-menu>
</template>

<script setup>
import { DefineProps } from 'vue';

const { isCollapse } = defineProps(['isCollapse'])



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

span {
  margin-right: 20px;
}

.xd-icon {
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 60px;
  background-color: white;
  white-space: nowrap;
  padding-left: 15px;

  img {
    width: 450px;
    height: 40px;
    margin-right: 10px;
  }
}
</style>
