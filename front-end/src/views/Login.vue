<template>

  <div class="login">
    <div class="bgp"></div>
    <div class="login_container">
      <h1>MemberOnly</h1>
      <el-form class="login_form">
  <el-form-item >
      <el-input placeholder="username">
        <template #prepend>
          <el-icon>
            <avatar />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
 
 <el-input placeholder="passowrd" show-password>
  <template #prepend>
    <el-icon>
      <key />
    </el-icon>
    </template>
 </el-input>
 <el-button type="primary"  plain class="login_submit">Login</el-button>
 <div class="login_register">
  Register
 </div>
      
      </el-form>
    </div>
    </div>

</template>
<script setup></script>

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
    background-image: url("../assets/bj.jpeg");
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
        margin-top: 20px;
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
  }}
</style>
