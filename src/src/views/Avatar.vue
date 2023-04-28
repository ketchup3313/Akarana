<template>
  <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse"> </Header>

  <div class="user-profile">
    <h2 class="profile-title">Personal Profile</h2>
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
        选择头像
      </el-button>
      <el-button type="primary" @click="uploadImg">上传头像</el-button>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
import { mapState } from "vuex";
import http from "@/utils/request";
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
    // generate Gravatar URL
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
    // 获取图片并预览
    async choose(vent) {
      let e = window.event || vent; // change事件获取到的数据
      if (e.target.files[0].size > 2 * 1024 * 1024) {
        // 限制上传图片文件大小
        //ElMessage.error('上传单个封面大小不能超过 2M!')
      } else {
        // 获取图片地址
        let file = e.target.files[0];

        const formdate = new FormData();
        formdate.append("avatar", file);
        // 将文件对象存储到组件的 data 中
        this.formdate = formdate;
        let reader = new FileReader();
        // 读取文件内容
        reader.readAsDataURL(file);
        reader.onload = (result) => {
          
          this.file = result.target.result;
           // 图片地址 Base64 格式的 可预览赋值给 this.file 以进行预览
        };
      }
    },
    // 上传图片
    async uploadImg() {
      // 调用 http.post 方法，发送图片数据到服务器
      const { data } = await http.post(
        `/api/avatar/${this.userInfo.username}`,
        this.formdate,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(data);
      localStorage.removeItem("userInfo");
      // 重新获取用户信息并更新用户头像
      store.dispatch({
        type: "getUserInfo",
        payload: this.userInfo.id,
      });
    },
  },
};
</script>

<style scoped>
.chooseAvg {
  position: relative;
}
.user-avatar {
  width: 150px; /* 放大头像 */
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin: 20px auto;
  display: block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  padding: 20px;
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
  background-color: #4caf50;
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
  background-color: #45a049;
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
</style>
