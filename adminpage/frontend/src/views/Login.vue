<template>
    <!-- login模块 -->
    <div class="login">
      <div class="backGroundImage"></div>
      <div class="login_container">
        <h1 class="h1">Akarana Caravan Club Administer System</h1>
        <!--keyup.enter click 回车 绑定事件login-->
        <el-form :rules="rules" @keyup.enter="Login" :model="adminInfo" ref="ref_form">

          <!--用户名输入框 prop对应相关的rules检查 v-model.trim: 将用户输入的前后的空格去掉-->
          <el-form-item prop="admin">
            <el-input v-model="adminInfo.admin" placeholder="Please Input Administer Name" clearable v-model.trim ="adminInfo.admin">
              <!--插入icon图标-->
              <template #prepend>
                <el-icon><Avatar /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!--密码输入框 prop对应相关的rules检查 v-model.trim: 将用户输入的前后的空格去掉-->
          <el-form-item prop="password">
            <el-input v-model="adminInfo.password" placeholder="Please Input Password" show-password clearable v-model.trim ="adminInfo.password">
              <!--插入icon图标-->
              <template #prepend>
                <el-icon><Key /></el-icon>              
              </template>
            </el-input>
          </el-form-item>

          <!--click button 进入admin主页面-->
          <!--绑定事件 跳转至admin home页面-->
          <el-button type="primary" class="login_submit" @click="Login">Login</el-button>
        </el-form>
      </div>
    </div>
</template>

<script setup>
import router from '../router/index';
import { reactive, ref } from 'vue';
import { getLogin } from '../api/index';
import { ElMessage } from 'element-plus';
/**
 * 初始的ref
 */
const ref_form = ref(null);

/**
 * login表单的数据声明
 */
const adminInfo = reactive({
  admin:'',
  password: '',
})

/**
 * login表单的数据检验
 * 定义rules的检验 检查输入框是否为空
 */
const rules = {
admin:[{required: 'true', trigger: 'blur', message: 'Please input an Administer Name'}],
password:[{required: 'true', trigger: 'blur', message: 'Please input the Password'}],
}

/**
 * 登录方法
 */
const Login = () =>{
  ref_form.value.validate((val) =>{
    if (val) {
      getLoginData();
    }
  })
}

/**
 * admin login接口的调用
 */
//登录的接口调用
const getLoginData = async() =>{
  //login api 封装调用
  const res = await getLogin({admin: adminInfo.admin, password: adminInfo.password})
  //如果登录成功
  if (res.token) {
    localStorage.setItem('token', res.token)
    //当接口中的token传入成功 login时打印message
    ElMessage({
        message: 'Login Success!',
        type: 'success',
      });
      //需要传入router index.js中的path: '/home'
      router.push('/home');
  }
}
</script>

<style lang="less" scoped>
@-webkit-keyframes fadenum{
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
}
//class login样式
  .login {
    height: 100%;
    .backGroundImage{
      height: 100%;
      background-image: url("../assets/caravan.jpg");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 50% 50%;
      background-color: darkgray;
    }

    //icon样式
    .el_icon{
      height: 30px !important;
    }
  
    //登录框样式
    .login_container{
      animation: fadenum 1s ease;
      position: absolute;
      z-index: 1;
      width: 400px;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 1s;
      min-height: 200px;
      text-align: center;
      background-color: whitesmoke;
      border-radius: 10px;
      padding: 20px;
    }

    //登录框中h1样式
    h1{
      font-size: 20px;
      transition: all 1s;
      font-weight: bold;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      margin-bottom: 36px;
    }

    .el_form{
      border-radius: 20px;
    }

    .el_card{
      .login_submit{
        width: 100%;
        height: 50px;
        border-radius: 20px;
      }

      :deep(.el-input-group_prepend){
        padding: 0 10px;
      }
    }
  }
</style>