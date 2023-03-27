<template>
  <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
  <div class="edit-form">
    <h3>Edit Profile</h3>

    <form @submit.prevent="submitForm">
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="editedUserInfo.firstName" type="text" />
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
</template>
  
<script>
import http from '@/utils/request'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      editedUserInfo: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        username: '',
        password: '',
        address: '',
        emailAddress: '',
        birthday: ''
      }
    };
  },
  computed: {
    ...mapState({
      editedUserInfo: state => state.userInfo,
    })
   
  },
  methods: {
    async submitForm() {
      try {
        
      } catch (error) {
        console.error('更新用户信息失败', error);
      }
    }
  }
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
  width: 100%;
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
</style>