<template>
    <div class="table">
        <!--创建表格-->
        <el-table :data="list" border stripe style="width:1390px">
            <!--first colum-->
            <el-table-column prop="id" label="Administer ID">

            </el-table-column>
            
            <!--second colum-->
            <el-table-column prop="admin" label="Admin">

            </el-table-column>

            <!--third colum-->
            <el-table-column prop="password" label="Password">

            </el-table-column>

            <el-table-column label="Operation">
                <template #default="scope">
                    <!--edit button-->
                    <el-button type="primary" :icon="Edit" circle @click="editClick(scope.row)" />
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