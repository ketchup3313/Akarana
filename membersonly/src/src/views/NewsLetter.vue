<template>
  <!-- 页面模板 -->
  <div>
    <el-header>
          <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
        </el-header>
    <!-- 返回主页按钮 -->
    <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="goToMainPage">返回主页</el-button> -->
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 标题 -->
    <h2>{{ newsletter.title }}</h2>
    <!-- 搜索框 -->
    <el-input placeholder="搜索文章" v-model="searchText" style="width: 200px; margin-bottom: 20px;"></el-input>
    <!-- 文章列表 -->
    <div class="article-list">
      <div class="article-card" v-for="article in filteredArticles" :key="article.id">
        <!-- 文章卡片 -->
        <el-card :body-style="{ padding: '0px' }">
          <!-- 文章链接 -->
          <router-link :to="'/newsletter/' + article.id">
            <!-- 文章图片 -->
            <img :src="article.imgUrl" style="width: 100%; height: 200px; object-fit: cover;">
          </router-link>
          <div style="padding: 14px;">
            <!-- 文章标题链接 -->
            <router-link :to="'/newsletter/' + article.id">
              <h3 style="margin: 0;">{{ article.title }}</h3>
            </router-link>
            <!-- 文章内容 -->
            <p style="margin: 10px 0 0;">{{ article.content }}</p>
            <!-- 分享按钮 -->
            <div style="text-align: right;">
              <el-button type="text" icon="el-icon-share" @click="shareToFacebook">分享至 Facebook</el-button>
              <el-button type="text" icon="el-icon-share" @click="shareToInstagram">分享至 Instagram</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      newsletter: {
        title: '最新动态', // 新闻简报标题
        articles: [ // 包含多个文章对象的数组
          {
            id: 1, // 文章ID
            title: '文章一', // 文章标题
            content: '这是文章一的内容', // 文章内容
            imgUrl: 'https://picsum.photos/400/200?random=1', // 文章图片的URL
          },
          {
            id: 2,
            title: '文章二',
            content: '这是文章二的内容',
            imgUrl: 'https://picsum.photos/400/200?random=2',
          },
          {
            id: 3,
            title: '文章三',
            content: '这是文章三的内容',
            imgUrl: 'https://picsum.photos/400/200?random=3',
          },
          {
            id: 4,
            title: '文章四',
            content: '这是文章四的内容',
            imgUrl: 'https://picsum.photos/400/200?random=4',
          },
        ],
      },
      searchText: '', // 用户在搜索框中输入的文本
    };
  },
  computed: {
    filteredArticles() { // 计算属性，根据搜索框中的文本过滤文章数组
      return this.newsletter.articles.filter((article) => {
        return article.title.toLowerCase().includes(this.searchText.toLowerCase());
      });
    },
  },
  methods: {
    goToMainPage() { // 点击按钮返回主页
      this.$router.push('/');
    },
    shareToFacebook() { // 点击按钮分享至Facebook
      window.open('https://www.facebook.com/');
    },
    shareToInstagram() { // 点击按钮分享至Instagram
      window.open('https://www.instagram.com/');
    },
  },
};
</script>

<style scoped>
.article-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.article-card {
  width: 48%;
  margin-bottom: 20px;
}
</style>
