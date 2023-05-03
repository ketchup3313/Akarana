<template>
    <el-menu class="el-menu-vertical-demo" active-text-color="#FFFFFF" background-color="#FF9933" text-color="#000000" unique-opened="true">
        <div class="akarana_icon">
            <img src="../../assets/ICON.png">
            <span>Akarana Administer System</span>
        </div>
        <!--管理员管理菜单-->
        <el-sub-menu index="1">
            <template #title>
                <el-icon><Tools /></el-icon>
                <span>Administer</span>
            </template>
                <el-menu-item index="1-1" @click="goPhoto">Photo Gallery</el-menu-item>
        </el-sub-menu>
  </el-menu>
</template>

<script setup>
import router from "../../router/index"
/**
 * click to photo page
 */
const goPhoto = () =>{
    router.push('/photo');
}
</script>

<style lang="less" scoped>
.el-radio-button_inner {
    padding: 0;
}

.el-menu:not(.el-menu--collapse) {
    width: 270px;
    min-height: 400px;
    border: none;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.akarana_icon {
    display: flex;
    align-items: center;
    font-weight: 320;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 113%;
    height: 60px;
    background-color: whitesmoke;
    white-space: nowrap;
    padding-left: 10px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    img{
        width: 45px;
        height: 40px;
        margin-right: 10px;
    }
}
</style>