<template>
    <div>
      <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
      <div  class="container">
        <div v-if="JSON.stringify(details) !== '{}'">
          <header class="header_my">
            <h2>{{ details.mainTitle }}</h2>
            <!-- <h4>{{details.subTitle}}</h4> -->
            <p class="content clearfix">
              <img align="right" style="min-width: 500px; max-width:500px;" height="340" :src="details.img" alt="img"
                class="img">
  
              {{ details.content }}
            </p>
  
          </header>
          <section class="section_join">
            <span v-if="details.status === 'open'">Group is open</span>
            <span v-else>Group is close</span>
            <!-- <button @click="requestJoin(details.id)" class="btn">Request to join</button> -->
            <!-- <button @click="requestJoin(details.id)" class="btn" :disabled="details.status === 'close'">Request to
              join</button> -->
            <button @click="requestJoin(details.id)" class="btn" :class="{ 'btn-disabled': details.status === 'close' }"
              :disabled="details.status === 'close'">
              {{ details.status === 'open' ? 'Request to join' : 'This activity is closed' }}
            </button>
          </section>
          <section class="small">
            <div class="small_item">
              <h3>
                Time
              </h3>
              <p>
                {{ details.time }}
              </p>
            </div>
            <div class="small_item">
              <h3>
                Address
              </h3>
              <p>
                {{ details.address }}
              </p>
  
              <div v-html="details.mapurl"></div>
  
            </div>
          </section>
        </div>
        <div v-loading="loading" v-else v-loading.fullscreen.lock="fullscreenLoading"
    type="primary"
    @click="openFullScreen1">
            loading..
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import http from '@/utils/request'
  
  export default {
    data() {
      return {
        details: {}
      }
    },
    methods: {
      async requestJoin(rallyid) {
        let res = await http.post('/api/rally/requestJoin', {
          userid: this.$store.state.userInfo.id,
          username: this.$store.state.userInfo.username,
          rallyid,
        })
        let { msg, status } = res.data;
  
        if (status === 1) {
          ElMessage({
            message: msg,
            type: "error",
          });
        } else {
          ElMessage({
            message: msg,
            type: "success",
          });
        }
      },
    },
    created() {
      let { id } = this.$route.query;
      http.get(`/api/rally/queryInfo?id=${id}`).then(res => {
        let { data, status } = res.data;
        console.log(status);
        if (status === 0) {
          this.details = data;
          console.log(this.details);
        }
      })
    },
  }
  </script>
  
  <style  scoped>
  * {
    margin: 0;
    padding: 0;
  }
  
  .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
  
  .small_item p {
    margin: 16px 0px;
    letter-spacing: 2px;
    color: #747474;
  }
  
  .p {
    color: #6c6b6b;
  }
  
  .btn {
    cursor: pointer;
    color: #FFFFFF;
    padding: 10px 20px;
    letter-spacing: 2px;
    border-radius: 30px;
    background-image: linear-gradient(90deg, rgb(149, 223, 236), rgb(138, 226, 138));
  }
  
  .btn-disabled {
    background-color: #ccc;
    color: #999;
    background-image: none;
  }
  
  .section_join {
    margin: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    padding: 20px 30px;
    background-color: #fafafa;
  }
  
  .content {
    letter-spacing: 1px;
    line-height: 40px;
  }
  
  .header_my {
    /* display: flex; */
  }
  
  .img {
    border-radius: 10px;
    object-fit: cover;
  }
  
  .container {
    padding: 20px 20%;
  }
  </style>