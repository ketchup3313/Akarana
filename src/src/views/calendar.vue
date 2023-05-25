<template>
  <div class="home">
    <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
    <el-container>
      <el-container>
        <el-main>
          <div class="calendar-title">Akarana Rally Calendar</div>
          <div class="calendar">
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Pacific%2FAuckland&showPrint=0&showTabs=1&showCalendars=0&showTz=0&title=Akarana%20Caravan%20Club&src=YWthcmFuYWNhcmF2YW5jbHViQGdtYWlsLmNvbQ&src=ZW4tZ2IubmV3X3plYWxhbmQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043 " style="border:solid 1px #777" width="1100" height="600" frameborder="0" scrolling="no"></iframe>

          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      isCollapse: false,
      handleCollapse: null,
    };
  },
};
</script>

<style>
  .el-container {
    height: 100%; /* 设置 .el-container 的高度为 100% */
  }

  .el-main {
    display: flex; /* 设置 .el-main 为弹性容器 */
    flex-direction: column; /* 设置 .el-main 的弹性子元素（如 .calendar 和 .calendar-title）以列方式排列 */
    justify-content: center; /* 垂直居中 .calendar div 和 .calendar-title div */
    align-items: center; /* 水平居中 .calendar div 和 .calendar-title div */
  }

  .calendar-title {
    font-size: 24px; /* 设置标题字体大小 */
    font-weight: bold; /* 设置标题字体加粗 */
    margin-bottom: 20px; /* 设置标题与日历之间的间距 */
    

  }
</style>
