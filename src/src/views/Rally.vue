<template>
    <div>
        <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
        <div class="list">
            <div class="list-item" v-for="item in dataList" :key="item.id" @click="lintoDetail(item.id)">
                <img width="400" height="200" :src="item.image" alt="" />
                <div class="footer">
                    <div>
                        <h3>{{ item.mainTitle }}</h3>
                        <p>{{ item.subTitle }}</p>
                    </div>
                    <div :class="['tab', item.status]">
                        {{ item.status === 'open' ? 'open' : 'close' }}
                    </div>
                </div>
            </div>
       
        </div>
    </div>
</template>
  

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import http from '@/utils/request';

const dataList = ref([]);
const router = useRouter();

async function getList() {
  let { data, status } = (await http.get('/api/rally')).data;
  if (status === 1) {
    dataList.value = data;
  } else {
    dataList.value = [];
  }
}

function lintoDetail(id) {
  router.push({
    path: '/RallyDetail',
    query: {
      id,
    }
  });
}

onMounted(getList);
</script>



<!--
<script setup>
import http from'@/utils/request'

const rally = {
  data() {
    return {
      dataList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    lintoDetail(id) {
      this.$router.push({
        path: '/RallyDetail',
        query: {
          id
        }
      })
    },
    async getList() {
      let { data, status } = (await http.get(`/api/rally`)).data;
      if (status === 1) {
        this.dataList = data;
      } else {
        this.dataList = [];
      }
    },
  },
};




</script> -->



  

  
<style scoped>
.footer {
    justify-content: space-between;
    display: flex;
    align-items: center;
}

* {
    margin: 0;
    padding: 0;
}

.tab {
    padding: 3px 6px;
    border-radius: 6px;
}

.open {
    background-color: rgb(206, 243, 206);
    color: green;
}

.close {
    color: rgb(203, 61, 61);
    background-color: rgb(238, 194, 194);
}

.list {
    margin: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 400px);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    justify-content: center;

    /* grid-auto-columns: ; */
}

.list-item {}

.list-item img {
    border-radius: 10px;
    object-fit: cover;
}

.list-item p {
    color: #5e5e5e;
}
</style>