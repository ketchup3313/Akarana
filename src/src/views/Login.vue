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
          <el-input placeholder="password" show-password v-model.trim="userInfo.password">
            <template #prepend>
              <el-icon>
                <key />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="login_submit" @click="onLogin">Login</el-button>
        <el-button class="login_register" @click="openPdf">Click to get a Member Application Form</el-button>

        <el-button class="login_register" @click="openlink">Click to get a prospective members Application Form</el-button>
        <!-- <div class="test"></div> -->
      </el-form>
    </div>
  </div>
</template>


<script setup>
import store from '../store/index'
import http from '@/utils/request'
import router from "../router/index";
import axios from 'axios'
import { reactive, ref } from "vue";
import { onMounted, onUnmounted } from "vue";
const openPdf = () => {
  
  window.open('https://drive.google.com/file/d/1NDwhhIvs_teTG-G82wzQjsq7aFRua7l7/view?usp=share_link', '_blank');
};
const openlink =() =>{
  window.open('https://drive.google.com/file/d/1sw4JAWIr6oyb1bG4-R1eR0iOCASufclG/view?usp=share_link', '_blank');
}


// Initial ref
const ref_form = ref(null);
// Data declaration of the form
const userInfo = reactive({
  userName: "",
  password: "",
});

// Form data validation rules
const rules = {
  userName: [
    { required: "true", trigger: "blur", message: "Please input user name" },
  ],
  password: [
    { required: "true", trigger: "blur", message: "Please input password" },
  ],
};
// Login method

const onLogin = () => {
  ref_form.value.validate((val) => {
    if (val) {
      getLoginData();
    }
  });
};

// get login data
const getLoginData = async () => {

  const { data: { status, msg, token ,userInfo:myuserInfo} } = await http.post('/api/login', {
    username: userInfo.userName,
    password: userInfo.password
  })
  .then(res => {
    console.log(res);
    return res;
  });

  if (status === 1) {
    ElMessage({
      message: `${msg}`,
      type: "error",
    });
    return;
  }

  if (status === 0) {
    ElMessage({
      message: "Welcome back, " + userInfo.userName,
     
      type: "success",
    });
    // localStorage.setItem('userId',myuserInfo.id);  
    store.dispatch({
      type:'getUserInfo',
      payload:myuserInfo.id
    })
    localStorage.setItem('@#@TOKEN', token)
    router.push("/home");
  }

};

let bgMoveHandler;

onMounted(() => {
  bgMoveHandler = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const xOffset = -(x * 20);
    const yOffset = -(y * 20);

    const login = document.querySelector(".login");
    login.style.backgroundPosition = `calc(50% + ${xOffset}px) calc(50% + ${yOffset}px)`;
  };
  document.addEventListener("mousemove", bgMoveHandler);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", bgMoveHandler);
});

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

  background-image: url("../../public/png.jpeg");
  background-repeat: no-repeat;
  background-size: calc(100% + 40px) calc(100% + 40px);

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
        
        font-size: 0.875rem;
        margin: 0 auto;
       
        text-decoration-color: orange;
        margin-top: 10px;
      }
      .test{
        font-size: 0.575rem;
        color: #999;
        margin-top: 10px;

      }

      :deep(.el-input-group__prepend) {
        padding: 0 10px;
      }
    }
  }
}
</style>
