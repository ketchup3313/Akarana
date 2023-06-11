<template>
  <div class="home">
    <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
    <el-container>
      <el-container>
        <el-main>
          <div class="calendar-title">Akarana Rally Calendar</div>
          <div class="calendar">
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Pacific%2FAuckland&showTz=0&showCalendars=0&showTabs=1&showDate=1&showNav=1&mode=AGENDA&src=YWthcmFuYWNhcmF2YW5jbHViQGdtYWlsLmNvbQ&src=ZW4tZ2IubmV3X3plYWxhbmQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043 " style="border:solid 1px #777" width="1100" height="600" frameborder="0" scrolling="no"></iframe>

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
    height: 100%; 
  }

  .el-main {
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
  }

  .calendar-title {
    font-size: 24px; 
    font-weight: bold; 
    margin-bottom: 20px; 
    

  }
</style>
