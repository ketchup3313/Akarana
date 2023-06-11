<template>
    <div>
        <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />

        <div class="container">

            <el-input class="search-input" v-model="searchKey" placeholder="Search" prefix-icon="Search"  @input="group"/>
            <el-select v-model="sortOrder" class="sort-select" placeholder="Sort Order" @change="group">
                <el-option v-for="option in sortOptions" :key="option.value" :value="option.value"
                    :label="option.label">
                </el-option>
            </el-select>
            <ul class="user-list">
                <li v-for="(users, firstLetter,) in groupedUsers" :key="firstLetter">
                    <h3>{{ firstLetter }}</h3>
                    <ul>
                        <li @click="userInfo(user.id)" v-for="user in users" :key="user.name">
                            <img :src="user.avatar || 'http://akarana.oss-ap-southeast-1.aliyuncs.com/uploads/avatars/Yijun-1682600472281.jpeg'" alt="User_Avatar" class="user-avatar" />
                            <span class="user-name">{{ user.name }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>



<script>
import { ref, computed } from "vue";
import http from "@/utils/request";
import { ElLoading } from "element-plus";

export default {
  // beforeCreate() {
  //     alert('Hello')
  // },
  created() {
    this.getList();
    console.log(this);
  },
  data() {
    return {
      users: [],
      groupedUsers: {},
      searchKey: "",

      sortOrder: "asc",
      sortOptions: [
        { value: "asc", label: "A-Z" },
        { value: "desc", label: "Z-A" },
      ],
    };
  },
  methods: {
    // Jump to members details page
    userInfo(id) {
      this.$router.push({
        path: "/MembersDetails",
        query: {
          id,
        },
      });
    },
    async getList() {
      let { data, status } = (await http.get(`/api/members`)).data;
      if (status === 0) {
        this.users = data.map((item) => {
          return {
            ...item,
            name: item.firstName + " " + item.lastName,
            avatar: item.avatar,
          };
        });

        this.group();
      } else {
        this.users = [];
      }
    },
    group(serch) {
      console.log(1);
      let users = [...this.users];

      const filtered = users.filter((user) => {
        return user.name.toLowerCase().includes(this.searchKey.toLowerCase());
      });

      console.log(this.sortOrder);

      if (this.sortOrder === "asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      }

      const groupedUsers = {};
      filtered.forEach((user) => {
        const firstLetter = user.name[0].toUpperCase();
        if (!groupedUsers[firstLetter]) {
          groupedUsers[firstLetter] = [];
        }
        groupedUsers[firstLetter].push(user);
      });

      this.groupedUsers = groupedUsers;
      console.log(this.groupedUsers);

      // return groupedUsers
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}

.search-input {
  width: 200px;
  margin-right: 10px;
}

.sort-select {
  width: 120px;
}

.user-list {
  list-style: none;
  padding: 0;
}

.user-list li {
  cursor: pointer;
  margin-bottom: 20px;
}

.user-list h3 {
  margin-bottom: 10px;
  display: inline-block;
  width: 100%; 
  padding: 5px 10px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.el-header {

  padding: 0 0 0 0;
  background-color: #fff;
}

.user-avatar {
  width: 70px; 
  height: 70px; 
  border-radius: 50%;
  margin-right: 10px;
}

.user-list ul {
  list-style: none;
  padding: 0;
}

.user-list ul li {
  display: flex;
  align-items: center;
}

.user-list ul li .user-name {
    font-weight: bold;
    font-size: 1.2em;
}

</style>
