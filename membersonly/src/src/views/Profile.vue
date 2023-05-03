<template>
 
    <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
  <div class="user-profile">
    <h2 class="profile-title">Personal Profile</h2>
    <div v-if="userInfo" class="profile-content">
      <img :src="gravatarUrl" alt="用户头像" class="user-avatar" />
      <div v-if="userInfo" class="profile-content">
        <div class="change-avatar"></div>
        <div>
          <p class="bold-text">Email Address:</p>
          <p v-if="btnState">{{ userInfo.emailAddress }}</p>
          <p v-else>
            <input
              id="emailAddress"
              v-model="editedUserInfo.emailAddress"
              type="text"
              @input="updateGravatar"
              @blur="validateEmail"
              :class="{ error: emailError }"
            />
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </p>
        </div>
        <div>
          <p class="bold-text">First Name:</p>
          <p v-if="btnState">{{ userInfo.firstName }}</p>
          <p v-else>
            <input
              id="firstName"
              v-model="editedUserInfo.firstName"
              type="text"
            />
          </p>
        </div>
        <div>
          <p class="bold-text">Last Name:</p>
          <p v-if="btnState">{{ userInfo.lastName }}</p>
          <p v-else>
            <input
              id="lastName"
              v-model="editedUserInfo.lastName"
              type="text"
            />
          </p>
        </div>
        <div>
          <p class="bold-text">Phone Number:</p>
          <p v-if="btnState">{{ userInfo.phoneNumber }}</p>
          <p v-else>
            <input
              id="phoneNumber"
              v-model="editedUserInfo.phoneNumber"
              type="text"
            />
          </p>
        </div>
        <div>
          <p class="bold-text">Username:</p>
          <p v-if="btnState">{{ userInfo.username }}</p>
          <p v-else>
            <input
              id="username"
              v-model="editedUserInfo.username"
              type="text"
            />
          </p>
        </div>
        <div>
          <p class="bold-text">Password:</p>
          <p v-if="btnState">{{ userInfo.password }}</p>
          <p v-else>
            <input
              id="password"
              v-model="editedUserInfo.password"
              type="text"
            />
          </p>
        </div>
        <div>
          <p class="bold-text">Address:</p>
          <p v-if="btnState">{{ userInfo.address }}</p>
          <p v-else>
            <google-autocomplete
              id="address"
              v-model="editedUserInfo.address"
              type="text"
            />
          </p>
        </div>
        <div>
          <p class="bold-text">Birthday:</p>
          <p v-if="btnState">{{ userInfo.birthday }}</p>
          <p v-else>
            <el-date-picker
            size="large"
            class="custom-datepicker"
      id="birthday"
     
      v-model="editedUserInfo.birthday"
      type=“date”
      placeholder="Select Birthday"
      format="YYYY-MM-DD"
    ></el-date-picker>
          </p>
        </div>
        <button v-if="btnState" @click="btnState = false">Edit</button>
        <button v-else :disabled="emailError !== ''" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CryptoJS from "crypto-js";
import GoogleAutocomplete from "../components/GoogleAutocomplete.vue";

export default {
  data() {
    return {
      btnState: true,
      emailError: "",
      showEditForm: false,
      isCollapse: false,
      handleCollapse: null,
      editedUserInfo: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        username: "",
        password: "",
        address: "",
        emailAddress: "",
        birthday: "",
        gravatarEmail: "",
      },
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
    // generate Gravatar URL
    gravatarUrl() {
      if (this.userInfo && this.userInfo.emailAddress) {
        return this.userInfo.avatar === null
          ? "http://akarana.oss-ap-southeast-1.aliyuncs.com/car1.jpg"
          : this.userInfo.avatar;
      }
      return "";
    },
  },
  components: {
    GoogleAutocomplete,
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.editedUserInfo.emailAddress)) {
        this.emailError = "Please enter a valid email address.";
        console.log(this.emailError);
      } else {
        this.emailError = "";
      }
    },
    async save() {
      
      if (this.editedUserInfo.birthday instanceof Date) {
    this.editedUserInfo.birthday = this.editedUserInfo.birthday.toLocaleDateString('en-CA');
  }
      await this.$store.dispatch({
        type: "changeUserInfo",
        payload: this.editedUserInfo,
      });
      this.btnState = true;
      this.setEditedUserInfo();
    },
    setEditedUserInfo() {
      this.editedUserInfo = {
        ...this.$store.state.userInfo,
      };
    },
    updateGravatar() {
      this.gravatarEmail = this.editedUserInfo.emailAddress;
    },
  },
  created() {
    {
      console.log(localStorage.getItem("userInfo"));
      // ...
      this.gravatarEmail = this.userInfo.emailAddress;
    }
    this.setEditedUserInfo();
  },
};
</script>

<style scoped>
.bold-text {
  font-weight: 900; /* 更粗的字体权重 */
  font-size: 25px;
  margin-top: -10px;
  margin-bottom: -10px;
  
}
.user-avatar {
  width: 100px; /* 放大头像 */
  height: 100px;
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
  height: auto;
}

.profile-title {
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: -35px;
  margin-top: -20px;
  color: #333;
  padding: 20px;
}

.profile-content {
  padding: 20px;
}



.profile-content span {
  color: #333;
}

.profile-content input {
  flex-grow: 1;
  height: 30px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  margin-left: 8px;
 
  width: 20%; /* 增大输入框长度 */
  border: none;
  /* 边框颜色变灰色 */
  border-bottom: 1px solid #ccc;
} 


button {
  width: 300px;
  height: 40px;
  background-color: #ff8936;
  border: none;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 20px; /* 修改此处 */
  margin-bottom: 20px; /* 修改此处 */
}

.custom-datepicker .el-input__inner {
  width: 100%; /* 修改此处以自定义输入框的宽度 */
}



button:hover {
  
  border-bottom: 1px solid #ccc;
}

.editbut {
  background-color: #1e90ff;
}

.editbut:hover {
  
}

.profile-content input.error {
  border-color: red;
  border-bottom: 1px solid #ccc;
}
input.error {
  border-color: red;
  color: red;
}
.error,
.profile-content span[data-v-ced23842].error {
  color: red;
  
}
/* 日期选择器宽度 */
.el-date-picker.el-input {
  width: 1000%;
}
</style>