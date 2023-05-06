<template>
    <div>
      <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
      <div  class="container">
        <div v-if="JSON.stringify(details) !== '{}'">
          <header class="header_my">
            <h2>{{ details.mainTitle }}</h2>
            <!-- <h4>{{details.subTitle}}</h4> -->
            <p class="content clearfix">
              <img align="right" style="min-width: 500px; max-width:500px;" height="340" :src="details.image" alt="img"
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
              <h3 class="bulletintext">
                Time
              </h3>
              <p>
                {{ details.time }}
              </p>
            </div>
            <div class="small_item">
              <h3 class="bulletintext">
                Address
              </h3>
              <p>
                {{ details.address }}

              
                <div v-html="details.mapUrl"></div>
              </p>
              <div class="participants-section">
    <h3>Who want to join:</h3>
    <ul>
      <li v-for="(participant, index) in participants" :key="index">
        {{ participant.username }}
      </li>
    </ul>
    <p v-if="participants.length === 0">
      There are no participants for this rally yet.
    </p>
    <h3 class="bulletintext">Bulletin:</h3>
   
                <div class="download-pdf-button" >
  <button @click="previewPdf" class="btn download-pdf-btn">Download PDF</button>
</div>
    
  </div>
  <!-- 改成英文的，增加谁参加了这个活动， -->
              
            </div>
          </section>
        </div>
       
      </div>
    </div>
  </template>
  
  <script>
  import http from '@/utils/request'
  import { ElLoading } from 'element-plus';

  export default {
    
    data() {
      return {
        details: {},
        participants: [],
        bulletin: [],
        urlWithTimestamp:[]
      }
    },
    methods: {
      previewPdf() {
    if (this.details.bulletin) {
      const timestamp = new Date().getTime();
    const urlWithTimestamp = `${this.details.bulletin}?t=${timestamp}`;
    console.log(urlWithTimestamp);
      window.open(urlWithTimestamp);
    } else {
      ElMessage({
        message: "No PDF available.",
        type: "warning",
      });
    }
  },
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
 
    async created() {
    let { id } = this.$route.query;
    const loadingInstance = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)",
    });

    try {
      const [participantsRes, detailsRes] = await Promise.all([
        http.get(`/api/rally/queryParticipants?rallyid=${id}`),
        http.get(`/api/rally/queryInfo?id=${id}`),
      ]);

      // Handle participantsRes
      let { data: participantsData, status: participantsStatus } = participantsRes.data;
      if (participantsStatus === 0) {
        this.participants = participantsData;
      }

      // Handle detailsRes
      let { data: detailsData, status: detailsStatus } = detailsRes.data;
      if (detailsStatus === 0) {
        this.details = detailsData;
      }
    } catch (error) {
      console.error(error);
    } finally {
      loadingInstance.close(); //close draw
    }
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
    background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);;
    border: none;
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
  .bulletintext{
    margin-top: 30px;
  }
  </style>