<template>
    <div style="margin: auto;">
      <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
      <div class="container">
        <!-- let details transfer to Json -->
        <div v-if="JSON.stringify(details) !== '{}'">
          <!-- show user details -->
          <h1 style="font-size: 26px;">{{ details.firstName + ' ' + details.lastName }} </h1>
  
  
          <div class="small_item">
            <h3 style="margin-top: 20px;">FirstName</h3>
            <p>{{ details.firstName ? details.firstName : tip }}</p>
          </div>
  
          <div class="small_item">
            <h3 style="margin-top: 20px;">LastName</h3>
            <p>{{ details.lastName ? details.lastName : tip }}</p>
          </div>
          <div class="small_item">
            <h3 style="margin-top: 20px;">Username</h3>
            <p>{{ details.username ? details.username : tip }}</p>
          </div>
  
  
  
          <div class="small_item">
            <h3 style="margin-top: 20px;">Address</h3>
            <p>{{ details.address ? details.address : tip }}</p>
          </div>
  
          <div class="small_item">
            <h3 style="margin-top: 20px;">PhoneNumber</h3>
            <p>{{ details.phoneNumber ? details.phoneNumber : tip }}</p>
          </div>
  
          <div class="small_item">
            <h3 style="margin-top: 20px;">EmailAddress</h3>
            <p>{{ details.emailAddress ? details.emailAddress : tip }}</p>
          </div>
          <div class="small_item">
            <h3 style="margin-top: 20px;">Birthday</h3>
            <p>{{ details.birthday ? details.birthday : tip }}</p>
          </div>
  
        </div>
        <div v-else v-loading="loading">
          loading
        </div>
      </div>
    </div>
  </template>
    
  <script >
  import http from '@/utils/request'
  
  export default {
    data() {
      return {
        details: {},
        tip: 'Do not have this information'
      }
    },
    methods: {
  
    },
    created() {
      let { id } = this.$route.query;
      http.get(`/api/mine/queryInfo?id=${id}`).then(res => {
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
    margin: 10px 0px;
    letter-spacing: 2px;
    color: #747474;
  }
  
  .small_item h3 {
    color: #5e5e5e;
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