<template>
    <el-dialog title="Administer Information Edit" modelValue="popShow" width="35%" center :show-close="false">
        <el-form :model="editAdmin" ref="ruleFormRef">
            <!--admin数据修改-->
            <el-form-item label="Admin" prop="admin" required >
                <!-- 双向绑定数据 -->
                <el-input v-model="editAdmin.admin"/>
            </el-form-item>
            <!--password数据修改-->
            <el-form-item label="Password" prop="password" required >
                <el-input v-model="editAdmin.password"/>
            </el-form-item>
            <!--两个button-->
            <el-form-item>
                <el-button @click="confirmClick('cancel')">Cancel</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">Confirm</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { defineProps, reactive, ref } from 'vue';
//获取从父组件传过来的admin和password和其他相关的信息
const {popShow, message, confirmClick} = defineProps(['popShow', 'message', 'confirmClick']);

/**
 * 编辑组件维护的数据
 */
const editAdmin = reactive({
    admin: message.admin,
    password: message.password,
    id: message.id
})

/**
 * 表单的校验规则
 */
//初始渲染为空，当表单完成从数据库提取数据传递到前端的渲染后,就可以拿到对应的元素
const ruleFormRef = ref(null)
const submitForm = async(fromEl) =>{
    if (!fromEl) return;
    await fromEl.validate((valid, fields) =>{
        if (valid) {
            confirmClick({admin: editAdmin.admin, password: editAdmin.password, id: editAdmin.id})
        }else{
            console.log('Error Submit', fields);
        }
    })
}
</script>

<style lang="less" scoped>
.dialog-footer button:first-child{
  margin-right: 10px;
}

:deep(.el-form-item__label) {
  width: 110px !important;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

:deep(.el-form-item__content) {
  justify-content: center;
  margin-left: 0 !important;
}
</style>