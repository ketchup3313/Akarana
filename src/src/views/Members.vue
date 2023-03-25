<template>
    <div>
        <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />

        <div class="container">

            <el-input class="search-input" v-model="searchKey" placeholder="Search" prefix-icon="Search" />
            <el-select v-model="sortOrder" class="sort-select" placeholder="Sort Order">
                <el-option v-for="option in sortOptions" :key="option.value" :value="option.value"
                    :label="option.label">
                </el-option>
            </el-select>
            <ul class="user-list">
                <li v-for="(users, firstLetter) in filteredUsers" :key="firstLetter">
                    <h3>{{ firstLetter }}</h3>
                    <ul>
                        <li v-for="user in users" :key="user.name">{{ user.name }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import router from "../router/index";
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import Main from '../components/Main.vue'

const searchKey = ref('')
const sortOrder = ref('asc')
const users = [
    { name: 'Janelle Chang' },
    { name: 'Mark Chang' },
    { name: 'Robbie George' },
    { name: 'Kevin Wu' },
    { name: 'Jane Wang' },
]

const sortOptions = [
    { value: 'asc', label: 'A-Z' },
    { value: 'desc', label: 'Z-A' },
]

const filteredUsers = computed(() => {
    const filtered = users.filter(user => {
        return user.name.toLowerCase().includes(searchKey.value.toLowerCase())
    })

    if (sortOrder.value === 'asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else {
        filtered.sort((a, b) => b.name.localeCompare(a.name))
    }

    const groupedUsers = {}
    filtered.forEach(user => {
        const firstLetter = user.name[0].toUpperCase()
        if (!groupedUsers[firstLetter]) {
            groupedUsers[firstLetter] = []
        }
        groupedUsers[firstLetter].push(user)
    })

    return groupedUsers
})



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
    margin-bottom: 20px;
}

.user-list h3 {
    margin-bottom: 10px;
}

.el-header {
    //Header的样式
    padding: 0 0 0 0;
    background-color: #fff;
}
</style>