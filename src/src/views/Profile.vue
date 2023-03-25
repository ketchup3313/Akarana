<template>
 <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
  <div class="user-profile">
    <h2 class="profile-title">个人资料</h2>
    <div v-if="!showEditForm" class="profile-content">
      <p>First Name: {{ userInfo.firstName }}</p>
      <p>Last Name: {{ userInfo.lastName }}</p>
      <p>Phone Number: {{ userInfo.phoneNumber }}</p>
      <p>Username: {{ userInfo.username }}</p>
      <p>Password: {{ userInfo.password }}</p>
      <p>Address: {{ userInfo.address }}</p>
      <p>Email Address: {{ userInfo.emailAddress }}</p>
      <p>Birthday: {{ userInfo.birthday }}</p>
      <button @click="showEditForm = true" class="edit-btn">Edit</button>
    </div>

    <div v-else class="edit-form">
      <h3>Edit Profile</h3>
      <form @submit.prevent="submitForm">
        <label for="firstName">First Name:</label>
        <input id="firstName" v-model="editedUserInfo.firstName" type="text" />
        <!-- Add other input fields for other user info properties -->
        <label for="lastName">Last Name:</label>
        <input id="lastName" v-model="editedUserInfo.lastName" type="text" />
        <label for="phoneNumber">Phone Number:</label>
        <input id="phoneNumber" v-model="editedUserInfo.phoneNumber" type="text" />
        <label for="username">Username:</label>
        <input id="username" v-model="editedUserInfo.username" type="text" />
        <label for="password">Password:</label>
        <input id="password" v-model="editedUserInfo.password" type="text" />
        <label for="address">Address:</label>
        <input id="address" v-model="editedUserInfo.address" type="text" />
        <label for="emailAddress">Email Address:</label>
        <input id="emailAddress" v-model="editedUserInfo.emailAddress" type="text" />
        <label for="birthday">Birthday:</label>
        <input id="birthday" v-model="editedUserInfo.birthday" type="text" />

        
        <button @click="submitForm" class="save-btn">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
// 引入api
import api from '../api/api';

export default {
  data() {
    return {
      userInfo: null,
      showEditForm: false,
      editedUserInfo: {},
    };
  },
  async created() {
    // 这里的 id 应该从登录后的响应中获取
    const id = 'your_id_here';
    try {
      const response = await api.getUserInfo(id);
      this.userInfo = response.data;
      this.editedUserInfo = { ...this.userInfo }; // 初始化编辑表单的数据
    } catch (error) {
      console.error('获取用户信息失败', error);
    }
  },
  methods: {
    async submitForm() {
      try {
        await api.updateUserInfo(this.editedUserInfo);
        this.userInfo = { ...this.editedUserInfo }; // 更新当前显示的用户信息
        this.showEditForm = false; // 隐藏编辑表单
        // 刷新页面，重新获取用户信息
        window.location.reload();
        
      } catch (error) {
        console.error('更新用户信息失败', error);
      }
    },
  },
};
</script>

<style scoped>
.edit-btn {
  background-color: #409eff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 5px;
}

.edit-form {
  background-color: #f5f5f5;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
}

.edit-form label {
  display: block;
  margin-bottom: 5px;
}

.edit-form input {
  display: block;
  width:100%;
padding: 5px;
margin-bottom: 15px;
}

.edit-form button {
background-color: #4CAF50;
border: none;
color: white;
padding: 10px 20px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 10px 2px;
cursor: pointer;
border-radius: 5px;
}
.user-profile {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.profile-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.profile-content p {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>