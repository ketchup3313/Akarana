<template>
  <div class="login">
    <div class="bgp"></div>
    <div class="login_container">
      <h1>MemberOnly</h1>
      <el-form class="login_form" :model="userInfo" :rules="rules" @keyup.enter="onLogin" ref="ref_form">
        <el-form-item prop="userName">
          <el-input placeholder="username" v-model.trim="userInfo.userName">
            <template #prepend>
              <el-icon>
                <avatar />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="passowrd" show-password v-model.trim="userInfo.password">
            <template #prepend>
              <el-icon>
                <key />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="login_submit" @click="onLogin">Login</el-button>
        <div class="login_register">Register</div>
      </el-form>
    </div>
  </div>
</template>


<script setup>
import router from "../router/index";
import axios from 'axios'
import { reactive, ref } from "vue";
// 初始的ref
const ref_form = ref(null);
// 表单的数据声明
const userInfo = reactive({
  userName: "admin",
  password: "123",
});

// 表单数据校验规则
const rules = {
  userName: [
    { required: "true", trigger: "blur", message: "Please input user name" },
  ],
  password: [
    { required: "true", trigger: "blur", message: "Please input password" },
  ],
};
// 登录的方法
const onLogin = () => {
  ref_form.value.validate((val) => {
    if (val) {
      getLoginData();
    }
  });
};
// 获取登录数据
const getLoginData = () => {
  localStorage.setItem("token", 1);
  // 如果登录成功，跳转到首页
  ElMessage({
    message: "Congratulations! You have logged in successfully!",
    type: "success",
  });

  // 成功后跳转到首页
  router.push("/home");
};
// 不要删下面的代码，这是axios的写法
// const getLoginData = async () => {
//   try {
//     const response = await axios.post('/api/login', {
//       userName: userInfo.userName,
//       password: userInfo.password
//     });
//     const { token, user } = response.data;
//     localStorage.setItem('token', token);
//     // 如果登录成功，跳转到首页
//     ElMessage({
//       message: 'Congratulations! You have logged in successfully!',
//       type: 'success',
//     });
//     // 成功后跳转到首页
//     router.push('/home');
//   } catch (error) {
//     ElMessage.error('Login failed. Please check your username and password.');
//   }
// };

</script>

<style lang="less" scoped>
@-webkit-keyframes fadenum {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.login {
  height: 100%;
  height: 100%;
  //图片
  // background-image: url("../assets/bj.jpeg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 50% 50%;
  background-attachment: fixed;

  .el-icon {
    height: 30px !important;
  }

  .login_container {
    animation: fadenum 1s ease;
    position: absolute;
    z-index: 1;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 1s;
    min-height: 273px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;

    h1 {
      font-size: 24px;
      transition: all 1s;
      font-weight: bold;
      margin-bottom: 36px;
    }

    .el-card {
      border-radius: 20px;
    }

    .login_form {
      .login_submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
        margin-top: 5px;
      }

      .login_register {
        width: 6.25rem;
        font-size: 0.875rem;
        margin: 0 auto;
      }

      :deep(.el-input-group__prepend) {
        padding: 0 10px;
      }
    }
  }
}
</style>
