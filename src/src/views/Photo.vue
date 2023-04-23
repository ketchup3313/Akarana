<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image.src" :alt="image.alt" style="width: 100%; height: 100%; object-fit: cover;">
      </el-carousel-item>
    </el-carousel>
    <div class="photo-wall">
      <div v-for="(image, index) in images" :key="index" class="photo-wall__item" style="width: 250px; height: 250px;">
        <img :src="image.src" :alt="image.alt" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      const images = [
        { src: "http://akarana.oss-ap-southeast-1.aliyuncs.com/car1.jpg", alt: 'Image 1' },
        { src: "http://akarana.oss-ap-southeast-1.aliyuncs.com/car2.jpg", alt: 'Image 2' },
        { src: "http://akarana.oss-ap-southeast-1.aliyuncs.com/car3.jpg", alt: 'Image 3' },
        { src: "http://akarana.oss-ap-southeast-1.aliyuncs.com/car4.jpg", alt: 'Image 4' },
      ]

      this.images = images
    }
  }
}
</script>

<style>
.photo-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
  margin: 10px;
}

.photo-wall__item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo-wall__item img {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s ease-in-out;
}

.photo-wall__item:hover img {
  transform: scale(1.2);
}
</style>
