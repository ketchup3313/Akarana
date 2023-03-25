<!-- <template>
  <div class="home">
    <el-container>
      <el-container>
        <el-header>
          <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
        </el-header>
        <el-main>
          <div class="photo-wall">
            <div v-for="(image, index) in images" :key="index" class="photo-wall__item">
              <img :src="image.src" :alt="image.alt">
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'PhotoWall',
  data() {
    return {
      images: []
    }
  },
  mounted() {
    this.getImages()
  },
  methods: {
    async getImages() {
      // 从本地加载图片
      const images = [
        { src: require('@/assets/images/20130330_135412.jpg'), alt: 'Image 1' },
        { src: require('@/assets/images/20130421_100806.jpg'), alt: 'Image 2' },
        { src: require('@/assets/images/20131207_182736.jpg'), alt: 'Image 3' },
        { src: require('@/assets/images/20131207_183958.jpg'), alt: 'Image 4' },
        { src: require('@/assets/images/20131116_160740.jpg'), alt: 'Image 10' },
        { src: require('@/assets/images/DSC00108.jpg'), alt: 'Image 5' },
        { src: require('@/assets/images/20131207_182736.jpg'), alt: 'Image 6' },
        { src: require('@/assets/images/20131207_183958.jpg'), alt: 'Image 7' },
        { src: require('@/assets/images/20130421_100806.jpg'), alt: 'Image 8' },
        { src: require('@/assets/images/20130421_100806.jpg'), alt: 'Image 9' },
      ]

      // 将本地图片赋值给 images 属性
      this.images = images
    }
  }
}
</script>

<style>
.photo-wall {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.photo-wall__item {
  box-sizing: border-box;
  /* position:fixed; */
  display: flex;
  width: 25%;
  padding: 10px;
}

.photo-wall__item img {
  display: block;
  width: 100%;
  transition: transform 0.3s ease-in-out;
}

.photo-wall__item:hover img {
  transform: scale(1.2);
}
</style> -->
