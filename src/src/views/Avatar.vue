<template>
  <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse"> </Header>

  <div class="user-profile">
    <h2 class="profile-title">Edit My Avatar</h2>
    <div v-if="userInfo" class="profile-content">
      <img :src="file || gravatarUrl" alt="用户头像" class="user-avatar" />
    </div>
    <div class="btn-box">
      <el-button type="primary" class="chooseAvg">
        <input
          type="file"
          name="file"
          accept=".jpg,.png,.gif,.bmp"
          id="file"
          @change="choose"
        />
        Choose Avatar
      </el-button>
      <el-button type="primary" @click="uploadImg">Confirm Avatar</el-button>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
import { mapState } from "vuex";
import http from "@/utils/request";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      isCollapse: false,
      handleCollapse: null,
      avg: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
    gravatarUrl() {
      if (this.userInfo && this.userInfo.emailAddress) {
        return this.userInfo.avatar === null
          ? "http://akarana.oss-ap-southeast-1.aliyuncs.com/car1.jpg"
          : this.userInfo.avatar;
      }
      return "";
    },
  },
  methods: {
    choose(event) {
      let e = window.event || event;
      if (e.target.files[0].size > 5 * 1024 * 1024) {
      } else {
        let file = e.target.files[0];

        const formdate = new FormData();
        formdate.append("avatar", file);
        this.formdate = formdate;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (result) => {
          this.file = result.target.result;
        };
      }
      
      // 添加选择完成提示
      ElMessage({
        message: "Choose Complete",
        type: "success",
      });
    },
    async uploadImg() {
      const { data } = await http.post(
        `/api/avatar/${this.userInfo.username}`,
        this.formdate,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(data);
      localStorage.removeItem("userInfo");
      store.dispatch({
        type: "getUserInfo",
        payload: this.userInfo.id,
      });
      
      // 添加上传成功提示
      ElMessage({
        message: "Confirmed",
        type: "success",
      });
    },
  },
};

</script>

<style scoped>
.chooseAvg {
  position: relative;
}
/* <!-- 将头像放大 --> */
.user-avatar {
  width: 300px; /* 设置头像宽度 */
  height: 300px; /* 设置头像高度 */
  object-fit: cover; /* 设置图片的尺寸和容器尺寸不一致时如何适应容器 */
  border-radius: 50%; /* 设置圆角 */
  margin: 20px auto; /* 居中显示 */
  display: block; /* 转为块级元素，使 margin:auto 居中生效 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
#file {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  z-index: 10;
}
.user-profile {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.profile-title {
  text-align: center; /* 居中对齐 */
  font-size: 48px; /* 设置字体大小 */
  font-weight: bold; /* 设置粗体 */
  margin-bottom: 20px; /* 底部留白 */
  color: #333; /* 字体颜色 */
  padding: 20px; /* 内边距 */
}

.profile-content {
  padding: 20px;
}

.profile-content p {
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-content span {
  color: #333;
}

.profile-content input {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  margin-left: 8px;
}

button {
  background-color: #ff8936;
  border: none;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  margin: 20px;
}

button:hover {
  background-color: #1e90ff;
}

.editbut {
  background-color: #1e90ff;
}

.editbut:hover {
  background-color: #187bcd;
}

.profile-content input.error {
  border-color: red;
}
input.error {
  border-color: red;
  color: red;
}
.error,
.profile-content span[data-v-ced23842].error {
  color: red;
}

/* 居中选择头像和上传头像按钮 */
.chooseAvg {
  position: relative; /* 设置为相对定位 */
  display: flex; /* 弹性盒子 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.btn-box {
  display: flex; /* 弹性盒子 */
  justify-content: center; /* 水平居中 */
  margin-top: 20px; /* 设置上边距 */
}

/* 将按钮放大 */
.el-button {
  font-size: 16px;
  padding: 28px 96px;
}

.el-button {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
}
</style>
