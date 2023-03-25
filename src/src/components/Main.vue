<template>
    <div class="title">
        Akarana Calendar
    </div>
    <div class="calendar"> 
        <iframe src="https://calendar.google.com/calendar/embed?src=1052831052%40qq.com&ctz=Pacific%2FAuckland" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
</template>

<script setup>  </script>

<style lang="less" scoped>

    .calendar{
        display: flex;
        justify-content: center;
        align-items: center;
        // 距离底部100px
        margin-bottom: 100px;
        margin: 0px;
        


    }
    .title{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        margin: 0px;
        font-size: 30px;
        font-weight: 600;
        color: #545c64;
    }
   

    
</style>