<template>
  <div class="header">
    <div class="homeIcon">
      <el-icon size="30px" @click="handleCollapse" :style="{transform:isCollapse?'':'rotate(180deg)'}">
        <Expand />
      </el-icon>
      <span>
        Home
      </span>
    </div>
    <!--  绿色1 -->






    <el-dropdown size="large">
      <span class="el-dropdown-link">
        Activity
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Rally活动中心</el-dropdown-item>
          <el-dropdown-item @click=NewsLetter>Newsletter</el-dropdown-item>


        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown size="large">
      <span class="el-dropdown-link">
          Members
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="memberspage">Member</el-dropdown-item>
          <el-dropdown-item @click="Photo">Photo</el-dropdown-item>


        </el-dropdown-menu>
      </template>
    </el-dropdown>


    <el-dropdown size="large">
      <span class="el-dropdown-link">
        About me
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>

          <el-dropdown-item>Setting</el-dropdown-item>


        </el-dropdown-menu>
      </template>
    </el-dropdown>



    <el-dropdown size="large">
      <span class="el-dropdown-link">
        How to use
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>

        </el-dropdown-menu>
      </template>
    </el-dropdown>



    <span class="username">


    </span>



    <div class="user" @mouseenter="isShowUserInfo('show')" @mouseleave="isShowUserInfo('leave')">
      <img src="../../public/ICON.png">
      <div class="userInfo" v-show="show">
        <div>
          Ketchup
        </div>
        <div @click='logout'>
          Log out
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from "../router/index";
import { defineProps } from 'vue'
import { DefineProps } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
// 获取父组件的函数
const { isCollapse, handleCollapse } = defineProps(['isCollapse', 'handleCollapse'])
//// 鼠标移动个人信息展示
let show = ref(false)
const isShowUserInfo = (type) => {
  type === "show" ? show.value = true : show.value = false
}

const memberspage = () => {
  router.push("/members");
}
const NewsLetter = () =>{
  router.push("/NewsLetter")
}
const Photo = () =>{
  router.push("/Photo")
}
const logout = () => {
  localStorage.removeItem("@#@TOKEN");
  router.push({ name: "login" });
};

</script>

<style lang="less" scoped>
.el-dropdown-link {
  font-size: 25;



}

.el-dropdown-link {
  cursor: pointer;
  color: #303133;
  display: flex;
  align-items: center;

}

.userInfo {
  z-index: 22;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: -76px;
  background-color: white;
  border: 5px;
  box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
  text-align: center;

  div:hover {
    color: #409eff;
  }

  div {
    padding: 10px;
  }
}

.header {
  position: relative;
  height: 45px;
  font-weight: 700;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: #FAFAFA;






  .homeIcon {
    display: flex;
    align-items: center;

    height: 60px;
    padding-left: 15px;
    cursor: pointer;

    span {
      margin-left: 10px;
    }


  }

  .user {
    display: flex;
    justify-content: center;
    width: 80px;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}

.el-radio-button__inner {
  padding: 0;
}

.el-menu--collapse {
  border: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 50px;
  border: none;
}

span {
  margin-right: 20px;
}
</style>