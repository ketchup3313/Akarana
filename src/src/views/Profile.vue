<template>
  <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
  <div class="user-profile">
    <h2 class="profile-title">Personal profile</h2>
    <div v-if="userInfo" class="profile-content">

     

      <p>First Name: <span v-if="btnState"> {{ userInfo.firstName }}</span>
        <input v-else id="firstName" v-model="editedUserInfo.firstName" type="text" />
      </p>
      <p>Last Name:<span v-if="btnState">{{ userInfo.lastName }}</span>
        <input v-else id="lastName" v-model="editedUserInfo.lastName" type="text" />
      </p>
      <p>Phone Number:<span v-if="btnState">{{ userInfo.phoneNumber }}</span>
        <input v-else id="phoneNumber" v-model="editedUserInfo.phoneNumber" type="text" />
      </p>
      <p>Username: <span v-if="btnState">{{ userInfo.username }}</span>
        <input v-else id="username" v-model="editedUserInfo.username" type="text" />
      </p>
      <p>Password: <span v-if="btnState">{{ userInfo.password }}</span>
        <input v-else id="password" v-model="editedUserInfo.password" type="text" />
      </p>
      <p>Address: <span v-if="btnState">{{ userInfo.address }}</span>
        <input v-else id="address" v-model="editedUserInfo.address" type="text" />
      </p>
      <p>Email Address:<span v-if="btnState">{{ userInfo.emailAddress }}</span>
        <input v-else id="emailAddress" v-model="editedUserInfo.emailAddress" type="text" />
      </p>
      <p>Birthday: <span v-if="btnState">{{ userInfo.birthday }}</span>
        <input v-else id="birthday" v-model="editedUserInfo.birthday" type="text" />
      </p>
      <button v-if="btnState" @click="btnState = false" class="editbut">Edit</button>
      <button v-else @click="save">Save</button>
    </div>
  </div>
</template>

<script>
// 引入api
// import api from '';
import { mapState } from 'vuex'

export default {
  data() {
    return {
      btnState:true,
      showEditForm: false,
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
      userInfo: state => state.userInfo,
    })
  },

  methods:{
    async save(){
       await this.$store.dispatch({
        type:'changeUserInfo',
        payload:this.editedUserInfo
      });
      this.btnState = true;
      this.setEditedUserInfo();
    },
    setEditedUserInfo(){
      this.editedUserInfo =  {
        ...this.$store.state.userInfo
      }
    }
  },
  created() {
    this.setEditedUserInfo();
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // 这里的 id 应该从登录后的响应中获取
    // const id = 'your_id_here';
    // try {
    //   const response = await api.getUserInfo(id);
    //   this.userInfo = response.data;
    //   this.editedUserInfo = { ...this.userInfo }; // 初始化编辑表单的数据
    // } catch (error) {
    //   console.error('获取用户信息失败', error);
    // }
  },

};
</script>

<style scoped>
.user-profile {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.profile-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  padding: 20px;
}

.profile-content {
  padding: 20px;
}

.profile-content p {
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-content span {
  color: #333;
}

.profile-content input {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  margin-left: 8px;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  margin: 20px;
}

button:hover {
  background-color: #45a049;
}

.editbut {
  background-color: #1E90FF;
}

.editbut:hover {
  background-color: #187bcd;
}
</style>