<template>
    <el-menu class="el-menu-vertical-demo" active-text-color="#FFFFFF" background-color="#FF9933" text-color="#000000" unique-opened="true">
        <div class="akarana_icon">
            <img src="../../assets/ICON.png">
            <span>Akarana Administer System</span>
        </div>
        <!--rally管理菜单-->
        <el-sub-menu index="1">
            <template #title>
                <el-icon><Flag /></el-icon>
                <span>Rally</span>
            </template>
            <el-menu-item index="1-1" @click="createRally">Create Rally</el-menu-item>
            <el-menu-item index="1-2" @click="rallyStatusHandle('open')">Open Rally</el-menu-item>
            <el-menu-item index="1-3" @click="rallyStatusHandle('close')">Closed Rally</el-menu-item>
        </el-sub-menu>
  </el-menu>
</template>

<script setup>
import router from "../../router/index"
import emitter from "../../utils/eventBus";
/**
 * click to createRally page
 */
 const createRally = () =>{
    router.push('/createRally')
}

/**
 * click closed rally，触发rally列表的重新获取
 */
const rallyStatusHandle = (type) =>{
    emitter.emit('status', type)
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