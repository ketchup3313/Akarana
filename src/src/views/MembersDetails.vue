<template>
  <div style="margin: auto;">
    <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
    <div class="container">
      <!-- let details transfer to Json -->
      <div v-if="JSON.stringify(details) !== '{}'">
        <!-- show user details -->
        <h1 style="font-size: 26px;">{{ details.firstName + ' ' + details.lastName }} </h1>
        <img :src="avatarUrl" alt="User_Avatar" class="user-avatar" />

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
        <div class="small_item">
          <h3 style="margin-top: 20px;">Occupation</h3>
          <p>{{ details.occupation ? details.occupation : tip }}</p>
        </div>
      
      
<!-- couples -->
<div class="small_item">
  <h3 style="margin-top: 20px">Couples:</h3>
  <div v-if="couples.length">
    <div v-for="(couple, index) in couples" :key="index" class="couple-item">
      <img :src="couple.avatar" alt="User_Avatar" class="user-avatar" />
      <a @click="userInfo(couple.id)" class="couple-name">{{ couple.name }}</a>
    </div>
  </div>
  <div v-else>
    <p>No couples found</p>
  </div>
</div>



        <!-- Add a section for participated rallies -->
<div class="small_item">
<h3 style="margin-top: 20px;">Participated Rallies</h3>
<template v-if="participatedRallies.length">
  <ul>
    <li v-for="rally in participatedRallies" :key="rally.id">
      {{ rally.mainTitle }}
    </li>
  </ul>
</template>
<template v-else>
  <p>Have not add any activity</p>
</template>
</div>

      </div>
    
    </div>
  </div>
</template>
  
<script>
import http from "@/utils/request";
import { ElLoading } from "element-plus";
import { watch } from "vue"; // 引入 watch

export default {
  data() {
    return {
      details: {},
      tip: "Do not have this information",
      participatedRallies: [],
      avatarUrl: "",
      couples: [],
    };
  },
  methods: {
    userInfo(id) {
      this.$router.push({
        path: "/MembersDetails",
        query: {
          id,
        },
      });
    },
    fetchData() { // 创建一个新的方法 fetchData
      let { id } = this.$route.query;
      const loadingInstance = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

    
      http.get(`/api/mine/queryInfo?id=${id}`).then((res) => {
        let { data, status } = res.data;
        console.log(status);
        if (status === 0) {
          this.details = data;
          this.avatarUrl = this.details.avatar || "http://akarana.oss-ap-southeast-1.aliyuncs.com/car1.jpg";
          console.log(this.details);

          http.get(`/api/members/couples?couples=${this.details.couples}`).then((res) => {
            let { data, status } = res.data;
            if (status === 0) {
              this.couples = data
                .filter((user) => user.id !== this.details.id)
                .map((user) => ({
                  id: user.id,
                  name: `${user.firstName} ${user.lastName}`,
                  avatar: user.avatar || "http://akarana.oss-ap-southeast-1.aliyuncs.com/car1.jpg",
                }));
            }
          });
        }
        loadingInstance.close(); // clode loading draw
      });

      // get participated rallies
      http.get(`/api/participatedRallies/userRallies?userid=${id}`).then((res) => {
        let { data, status } = res.data;
        if (status === 0) {
          this.participatedRallies = data;
        }
      });
    },
  },
  created() {
    this.fetchData(); //  Call fetchData in the created() lifecycle hook
  },
  watch: {
    $route() {
      this.fetchData(); // Call fetchData when $route changes
    },
  },
};
</script>
  
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

body {
  background-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 100%);
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
  transition: 0.3s;
  transform: scale(1);
  box-shadow: none;
}

.small_item p:hover {
  color: #333;
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}


.small_item h3 {
  color: #5e5e5e;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
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
  transition: 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background-image: linear-gradient(90deg, rgb(138, 226, 138), rgb(149, 223, 236));
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.section_join {
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  padding: 20px 30px;
  background-color: #fafafa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content {
  letter-spacing: 1px;
  line-height: 40px;
}

.img {
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.container {
  padding: 20px 20%;
}

.user-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}
.couple-item {
  display: flex;
  align-items: center;

}

.couple-item .user-avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

</style>