<template>
    <div class="home">
      <el-container>
        <el-container>
          <el-header>
            <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
          </el-header>
          <el-main>
            <div class="photo-wall">
              <div v-for="(image, index) in dataList" :key="index" class="photo-wall__item">
                <img :src="image.url" >
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import http from '@/utils/request'
  
  export default {
    name: 'PhotoWall',
    data() {
      return {
        dataList: []
      }
    },
    created(){
      this.getList();
    },
    methods: {
      async getList(){
              let {data,status} = (await http.get(`/api/photo`)).data;
              console.log('Response:', data, status);
              if(status === 0){
                  this.dataList = data;
              }else{
                  this.dataList = [];
              }
          },
    }
  }
  </script>
  
  <style>
  .photo-wall {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .photo-wall__item {
    box-sizing: border-box;
    /* position:fixed; */
    display: flex;
    padding: 30px;
  }
  
  .photo-wall__item img {
    max-width: 400px;
    object-fit: contain;
    display: block;
    width: 100%;
    transition: transform 0.3s ease-in-out;
  }
  
  .photo-wall__item:hover img {
    transform: scale(1.2);
  }
  </style>