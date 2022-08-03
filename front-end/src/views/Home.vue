<template>
    <div>
        Homepage
    </div>
    <el-button type="primary" @click="toGo('/Login')" >Login</el-button>
    <el-button type="primary" @click="toGo('/Register')" >Register</el-button>
</template>
<script setup>
import router from'../router'
const toGo =(val)=>{
    router.push(val)
}
    
</script>

<style lang="less" scoped>

</style>