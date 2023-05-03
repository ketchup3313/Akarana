<template>
    <div class="header">
        <!--折叠左菜单图标-->
        <div class="homeIcon"></div>
        <div class="homeIcon">
            <span>Welcome To Akarana Caravan Club Photo Gallery</span>
        </div>
        <!--头部右标签 -->
        <div class="admin">
            <!--home button-->
            <el-button type="primary" @click="goHome">Home</el-button>
        </div>
    </div>
</template>

<script setup>
import router from '../../router/index';
const goHome = () =>{
    router.push('/home');
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