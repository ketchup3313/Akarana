<template>
  <div>
    <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
    <div class="container">
      <div v-if="JSON.stringify(details) !== '{}'">
        <header class="header_my">
          <h2>{{ details.mainTitle }}</h2>
          <p class="content clearfix">
            <img align="right" style="min-width: 500px; max-width:500px;" height="340" :src="details.image" alt="img"
              class="img">
            {{ details.content }}
          </p>
        </header>

        <section class="small">
          <div class="small_item">
            <h3 class="bulletintext">
              Date and Time
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
            <div v-if="details.status === 'Upcoming'">
              <button @click="requestJoin(details.id)" class="btn">
                Click here if you plan to attend
              </button>
            </div>
          </div>
        </section>

        <!-- album -->
        <section class="small">
  <div class="small_item" v-if="details.status === 'Past'">
    <h3 class="bulletintext">
      Album
    </h3>
    <div v-if="details.album">
      <button @click="openAlbum(details.album)" class="btn">
      Click to show the photos
      </button>
    </div>
    <div  class="no-album-message" v-else>
      There is no album available for this rally at the moment. We are waiting for the committee to add one
    </div>
  </div>
</section>
        

        <section class="small">
          <div class="small_item">
            <h3 class="bulletintext">
              Participants
            </h3>
            <ul>
              <li v-for="(participant, index) in participants" :key="index">
                {{ participant.firstName}}
              </li>
            </ul>
            <p  class = apple v-if="participants.length === 0">
              There are no participants for this rally yet.
            </p>
          </div>
          <div class="small_item">
            <h3 class="bulletintext">
              Bulletin
            </h3>
            <div class="download-pdf-button" >
              <button @click="previewPdf" class="btn download-pdf-btn">Download PDF</button>
            </div>
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
      urlWithTimestamp:[],
      album:[]
    }
  },
  methods: {
    openAlbum(url) {
      if(url){
        window.open(url, '_blank')
      }else {
        this.$message({
          message: ' There is no album available for this rally at the moment. We are waiting for the committee to add one',
          type: 'warning'
        });}
     
    },
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
        firstname: this.$store.state.userInfo.firstName,
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
        
        try {
      const participantsRes = await http.get(`/api/rally/queryParticipants?rallyid=${rallyid}`);
      let { data: participantsData, status: participantsStatus } = participantsRes.data;
      if (participantsStatus === 0) {
        this.participants = participantsData;
      }
    } catch (error) {
      console.error(error);
    }
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
  padding: 10px 20px;  /* Increased padding to enlarge the button */
  letter-spacing: 2px;
  border-radius: 30px;
  background-image: linear-gradient(to top, #ff0844 0%, #ffb199 100%);/* Changed the color to a solid one for higher contrast */
  border: none;
  font-size: 20px;  /* Increased font size */
  transition: transform 0.3s;  /* Added transition for a smooth hover effect */
}
.btn:hover {
  transform: scale(1.1);  /* The button enlarges when hovered */
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

.download-pdf-btn {
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);  /* Changed color to a different one for distinction */
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
.no-album-message{
  margin-top: 30px;
  font-size: 20px;
  color: #747474;
}
.apple{
  margin-top: 30px;
  font-size: 20px;
  color: #747474;
}
.album-link {
  text-decoration: underline;
  color:coral
}
</style>