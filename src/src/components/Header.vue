<template>
  <div class="header">
    <div class="homeIcon">
     
      <el-link :underline="false" type="primary" href="/home">
        <span style="text-decoration: none"> <el-icon><HomeFilled /></el-icon>&nbsp;Home </span>
      </el-link>
    </div>

    <el-dropdown size="large">
      <span class="el-dropdown-link">
        <el-icon><Menu /></el-icon>&nbsp; Rallies
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="Rally"><el-icon><StarFilled /></el-icon>All rallies</el-dropdown-item>
          <el-dropdown-item @click="Photo"><el-icon><Picture /></el-icon>Photo</el-dropdown-item>
          <el-dropdown-item @click="calendar"><el-icon><Calendar /></el-icon>Calendar</el-dropdown-item>
          <el-dropdown-item @click="CAlPDF"><el-icon><Calendar /></el-icon>Calendar.pdf</el-dropdown-item>
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
   
          <el-dropdown-item @click="openwebiste"><el-icon><Promotion /></el-icon> Our website</el-dropdown-item>
          <el-dropdown-item @click="opendocument"> <el-icon><Document /></el-icon> About this members only website</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
   
<el-dropdown size="large" disabled>
      <span class="el-dropdown-link" @click="logout" >
        <el-icon><CircleCloseFilled /></el-icon> &nbsp;Log out
        
      </span>
      <template #dropdown>
      </template>
    </el-dropdown>


    <div
      class="user"
      @mouseenter="isShowUserInfo('show')"
      @mouseleave="isShowUserInfo('leave')"
    >
      <!-- Avatar -->

      <img :src="gravatarUrl" alt="User_Avatar" class="user-avatar" />
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
    // get user info
    // const { isCollapse, handleCollapse } = defineProps(['isCollapse', 'handleCollapse'])
    //// Mouse over personal information display
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
      // Jump to Baidu
      // window.open( "https://photos.app.goo.gl/c6zGfunJyCXDSULH7",'_blank');
      router.push("/photo")
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
    const CAlPDF = () => {
     window.open("https://drive.google.com/file/d/1BQQdG05vxr2c1mFEM-VGMZf5_xfVruJq/view?usp=sharing","_blank");
    };
    const opendocument = () => {
      router.push("/document");
    };

    // // get user info
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
      opendocument,
      CAlPDF,
    };
  },
  methods: {
    openwebiste() {
      window.open("https://www.akaranacaravanclub.co.nz/");
    },
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
  // 往左移动
  transform: translateX(30%);


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
      width: 50px;
      height: 50px;
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