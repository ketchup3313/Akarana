<template>
  <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" > </Header>
  <div class="user-profile">
    <h2 class="profile-title">Personal Profile</h2>
    <div v-if="userInfo" class="profile-content">
<!-- this will show the user avatar under the personal profile -->
<img :src="gravatarUrl" alt="用户头像" class="user-avatar" />
    <div v-if="userInfo" class="profile-content">
      <!-- 本次修改 -->
      <p>Email Address:<span v-if="btnState">{{ userInfo.emailAddress }}</span>
      <input v-else id="emailAddress" v-model="editedUserInfo.emailAddress" type="text" @input="updateGravatar" />
    </p>

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
        <google-autocomplete v-else id="address"  v-model="editedUserInfo.address" type="text" />
      </p>
    
      <p>Email Address:<span v-if="btnState">{{ userInfo.emailAddress }}</span>
        <input v-else id="emailAddress" v-model="editedUserInfo.emailAddress" type="text" />
      </p>
      <p>Birthday: <span v-if="btnState">{{ userInfo.birthday }}</span>
        <input v-else id="birthday" v-model="editedUserInfo.birthday" type="text" />
      </p>
      <button v-if="btnState" @click="btnState = false">Edit</button>
      <button v-else @click="save">保存</button>
    </div>
  </div>
  </div>s
</template>

<script>
// 引入api
// import api from '';
import { mapState } from 'vuex'
import CryptoJS from 'crypto-js'
import GoogleAutocomplete from '../components/GoogleAutocomplete.vue';

export default {
  data() {
    return {
      btnState:true,
      showEditForm: false,
      isCollapse: false,
      handleCollapse: null,
      editedUserInfo: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        username: '',
        password: '',
        address: '',
        emailAddress: '',
        birthday: '',
        //本次修改
        gravatarEmail: ''
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
     // generate Gravatar URL
     gravatarUrl() {
  if (this.userInfo && this.userInfo.emailAddress) {
    const email = this.gravatarEmail.trim().toLowerCase();
    const hash = CryptoJS.MD5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&r=pg&${Math.random().toString(36).substr(2, 9)}`;
  }
  return "";
}
  },
  components: {
    GoogleAutocomplete,
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
    },
    updateGravatar() {
      this.gravatarEmail = this.editedUserInfo.emailAddress;
    },
  },
  created() {
    {
    // ...
    this.gravatarEmail = this.userInfo.emailAddress;
  };
    this.setEditedUserInfo();
   
  },

};
</script>

<style scoped>
.user-avatar {
  width: 150px; /* 放大头像 */
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin: 20px auto;
  display: block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

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