<template>
  <div class="header">
    <div class="homeIcon">
      <!-- <el-icon size="30px" @click="handleCollapse" :style="{ transform: isCollapse ? '' : 'rotate(180deg)' }">
        <Expand />
      </el-icon> -->
      <!-- 点击跳转到/home -->

      <el-link :underline="false" type="primary" href="/home">
        <span style="text-decoration: none"> <el-icon><HomeFilled /></el-icon>&nbsp;Home </span>
      </el-link>
    </div>

    <el-dropdown size="large">
      <span class="el-dropdown-link">
        <el-icon><Menu /></el-icon>&nbsp; Activity
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="Rally"><el-icon><StarFilled /></el-icon>All activitys</el-dropdown-item>
          <el-dropdown-item @click="Photo"><el-icon><Picture /></el-icon>Photo</el-dropdown-item>
          <el-dropdown-item @click="calendar"><el-icon><Calendar /></el-icon>Calendar</el-dropdown-item>

        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown size="large" disabled>
      <span class="el-dropdown-link" @click="memberspage" >
         <el-icon><Menu /></el-icon> &nbsp;Members
        
      </span>
      <template #dropdown>
        <!-- <el-dropdown-menu>
          <el-dropdown-item @click="memberspage"><el-icon><ChatLineRound /></el-icon>Members</el-dropdown-item>
        </el-dropdown-menu> -->
      </template>
    </el-dropdown>

    <el-dropdown size="large">
      
      <span class="el-dropdown-link">
        <el-icon><User /></el-icon>
        &nbsp;About me
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="profile"><el-icon><Edit /></el-icon> My profile</el-dropdown-item>
          <el-dropdown-item @click="editform"><el-icon><Avatar /></el-icon>Edit my Avatar</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown size="large">
      <span class="el-dropdown-link">
        <el-icon><InfoFilled /></el-icon>
        &nbsp;More information
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

    <span class="username"> </span>

    <div
      class="user"
      @mouseenter="isShowUserInfo('show')"
      @mouseleave="isShowUserInfo('leave')"
    >
      <!-- 右上角头像 -->

      <img :src="gravatarUrl" alt="用户头像" class="user-avatar" />
      <!-- <span>
        {{ userInfo.firstName }}
      </span> -->
      <div class="userInfo" v-show="show">
        <div @click="logout">Log out</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "../router/index";
import { defineProps } from "vue";
import { reactive, onMounted } from "vue";

import { ArrowDown } from "@element-plus/icons-vue";
import { mapState } from "vuex";
import { calendarEmits } from "element-plus";
export default {
  setup() {
    // 获取父组件的函数
    // const { isCollapse, handleCollapse } = defineProps(['isCollapse', 'handleCollapse'])
    //// 鼠标移动个人信息展示
    let show = ref(false);
    const isShowUserInfo = (type) => {
      type === "show" ? (show.value = true) : (show.value = false);
    };

    const memberspage = () => {
      router.push("/members");
    };
    const NewsLetter = () => {
      router.push("/NewsLetter");
    };
    const Photo = () => {
      router.push("/Photo");
    };
    const profile = () => {
      router.push("/profile");
    };
    const editform = () => {
      router.push("/edit");
    };
    const Rally = () => {
      router.push("/rally");
    };
    const calendar = () => {
      router.push("/calendar");
    };

    // // 获取用户信息

    // const userInfo = reactive({
    //   name: '',
    //   headImg: ''
    // })
    const getUserInfoData = async () => {
      const res = await getUserInfo();
      if (res?.name && res?.headImg) {
        userInfo.name = res.name;
        userInfo.headImg = res.headImg;
      }
    };
    onMounted(() => {
      // getUserInfoData()
    });

    return {
      // isCollapse
      isShowUserInfo,
      show,
      memberspage,
      Photo,
      NewsLetter,
      profile,
      editform,
      Rally,
      calendar,
    };
  },
  methods: {
    logout() {
      this.$store.commit({ type: "RESET_USERINFO" });
      localStorage.removeItem("@#@TOKEN");
      router.push({ name: "login" });
    },
  },
  computed: {
    gravatarUrl() {
      if (this.userInfo) {
        return this.userInfo.avatar === null
          ? "http://akarana.oss-ap-southeast-1.aliyuncs.com/car1.jpg"
          : this.userInfo.avatar;
      }
      return "";
    },
    ...mapState({
      username: (state) => state.userInfo.username,
      userInfo: (state) => state.userInfo,
    }),
  },
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
  right: 20px;
  top: 60px;
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
  font-weight: 700;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;

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

  a {
    text-decoration: none;
  }

  .user {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 80px;
    height: 60px;
    span {
      margin-right: 20px;
    }
    img {
      margin: 0 10px;
      width: 60px;
      height: 60px;
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
.el-dropdown-link:focus {
  outline: none;
}
</style>
