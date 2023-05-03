<template>
    <div class="table">
        <!--创建表格-->
        <el-table :data="list" border stripe style="width:1390px">
            <!--第一列-->
            <el-table-column prop="id" label="Member ID">

            </el-table-column>

            <el-table-column prop="firstName" label="First Name">

            </el-table-column>

            <el-table-column prop="lastName" label="Last Name">

            </el-table-column>

            <el-table-column prop="phoneNumber" label="Phone Number">

            </el-table-column>

            <el-table-column prop="username" label="Username">

            </el-table-column>

            <el-table-column prop="password" label="Password">

            </el-table-column>

            <el-table-column prop="address" label="Address">

            </el-table-column>

            <el-table-column prop="emailAddress" label="Email">

            </el-table-column>

            <el-table-column prop="birthday" label="Birthday">

            </el-table-column>

            <el-table-column prop="occupation" label="Occupation">

            </el-table-column>

            <el-table-column label="Operation">
                <template #default="scope">
                    <!--edit button-->
                    <el-button type="primary" :icon="Edit" circle @click="editClick(scope.row)" />

                    <!--delete button scope.row.id传递局部对应的id值-->
                    <el-popconfirm title="Are you sure to delete this information?" @confirm="deleteHandle(scope.row.id)">
                        <template #reference>
                            <el-button type="danger" :icon="Delete" circle ></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { defineProps,onMounted } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue'
const {list, editClick, deleteHandle} = defineProps(['list', 'editClick', 'deleteHandle']);
</script>

<style lang="less" scoped>

</style>