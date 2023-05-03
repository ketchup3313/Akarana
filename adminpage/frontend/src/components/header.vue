<template>
    <div class="header">
        <!--折叠左菜单图标-->
        <div class="homeIcon">
            <el-icon size="30px"><Expand /></el-icon>
            <span>Main Page</span>
        </div>
        <div class="homeIcon">
            <span>Welcome to Akarana Caravan Club Administer System</span>
        </div>
        <!--头部右标签 -->
        <div class="admin">
            <!--log out button-->
            <el-button type="primary" @click="logOut">Log Out</el-button>
        </div>
    </div>
</template>

<script setup>
import router from '../router/index';
//click to log out
const logOut = () =>{
    //warning info log out
    ElNotification({
    title: 'Log Out',
    message: 'Log Out Success!',
    type: 'warning',
    offset: 100
  })
    router.push('/login'),
    //click log out button remove token
    localStorage.removeItem('token');
}
</script>

<style lang="less" scoped>
.userIngfo {
    z-index: 22;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    bottom: -77px;
    background-color: white;
    border: 5px;
    box-shadow: 0 4px 8px rgb(7 17 27 / 10%);
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
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;

    .homeIcon{
        display: flex;
        align-items: center;

        span{
            margin-left: 10px;
        }
    }
}
</style>