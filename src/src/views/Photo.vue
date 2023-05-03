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
                <img :src="image.url"  >
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
  /* 设置为网格布局容器 */
  display: grid;
  /* 设置网格列，每列最小宽度为 300px，自动填充 */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* 设置网格行高 */
  grid-auto-rows: 300px;
  /* 设置网格间距 */
  grid-gap: 5px;
}
  
  .photo-wall__item {
  /* 设置盒子的盒模型 */
  box-sizing: border-box;
  /* 设置为弹性盒子项目，让图片自动对齐 */
  display: flex;
  /* 设置图片容器的填充 */
  padding: 30px;
  /* 设置弹性盒子的伸缩比例 */
  flex: 1 1 25%;
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