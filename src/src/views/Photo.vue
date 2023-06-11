<template>
  <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
  <div class="home">
    <el-container>
      <el-container>
        <el-header>
        </el-header>
        <div class="more">If you wanna see more photo please click <a :href="albumLink" target="_blank" style="font-weight: bold; color: coral;">here</a></div>


        <el-main>
          <div class="photo-wall">
            <div v-for="(image, index) in dataList" :key="index" class="photo-wall__item">
              <img :src="image.url" @click="viewImage(image)">
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog :model-value="viewImageDialog" @update:model-value="viewImageDialog = !viewImageDialog" width="80%">
      <img :src="currentImage.url" class="full-image" />
    </el-dialog>
  </div>
</template>
  
  <script>
  import http from '@/utils/request'
  
  export default {
    name: 'PhotoWall',
    data() {
      return {
        dataList: [],
    viewImageDialog: false,
    currentImage: {},
    albumLink: 'https://photos.app.goo.gl/zkBWUHcHntkFSaq67'
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
          viewImage(image) {
    this.currentImage = image;
    this.viewImageDialog = true;
  }
    }
  }
  </script>
  
  <style>
  .photo-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 5px;
}
  
  .photo-wall__item {
  box-sizing: border-box;
  display: flex;
  padding: 30px;
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
  .full-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.more{
  text-align: center;
  font-size: 20px;
  margin: 20px 0;
}

  </style>