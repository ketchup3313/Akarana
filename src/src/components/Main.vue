<template>
    <div class="all">
    <div class="orgin" >
        <div class="logo-container">
        
            <img src="../../public/acc.png"  class="logo-image" />
      
            <div class="club-text">
                AKARANA CARAVAN CLUB
                <div class="yellow-line"></div>
                <span class="est-year">Est 1972</span>
            </div>
        </div>
   
        <div class="calendar"> 
            <iframe src="https://calendar.google.com/calendar/embed?src=1052831052%40qq.com&ctz=Pacific%2FAuckland" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
    </div>
</div>
</template>

<script setup>  </script>

<style lang="less" scoped>
    .orgin {
        width: 100%;
    }

    .logo-container {
       
        align-items: center;
      
        margin: 20px;
    }

    .logo-image {
        max-width: 100px;
        margin-right: 30px; // 设置 logo 和文本之间的距离
        align-items: flex-start;
        position: relative; /* 添加定位属性 */
  z-index: 1; /* 添加z-index属性 */
     
  
    }

    .club-text {
        position: relative;
        text-align: center;
        font-size: 500%;
        font-weight: 600;
        // 往上100px
        margin-top: -200px;
        color: rgb(244, 123, 24)  }
    .calendar {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 100px;
        margin-top: 50px
    }

    .yellow-line {
        background-color: rgb(244, 123, 24);
        height: 20px;
        width: 95%;
        margin: 5px 0;
        font-weight: 600;
        
    }

    .est-year {
        position: absolute; // 使用绝对定位
        left: 50%; // 水平居中
        transform: translateX(-50%); // 水平居中
        top: 100%; // 紧贴黄线的下边缘
        font-size: 30%;
        font-weight: 400;
        color: rgb(244, 123, 24);
    }

  

    .title {
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
    .text-container {
        display: inline-block;
        margin-left: 110px; // 添加左边距
       
    }
    .all {
    background-image: url("../../public/png.jpeg");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 100%;
    background-attachment: fixed;
    backdrop-filter: blur(2px); /* 添加 backdrop-filter 属性 */
}
    
</style>
