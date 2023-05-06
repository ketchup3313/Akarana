<template>
    <el-dialog title="Edit" modelValue="editShow" width="35%" center :show-close="false">
        <el-form :model="editRally" ref="ruleFormRef">
          <el-form-item label="Main Title" prop="mainTitle" required >
            <el-input v-model="editRally.mainTitle" />
          </el-form-item>

          <el-form-item label="Sub Title" prop="subTitle">
            <el-input v-model="editRally.subTitle" />
          </el-form-item>

          <el-form-item label="Time" prop="time" required>
            <el-input v-model="editRally.time" />
          </el-form-item>

          <el-form-item label="Address" prop="address" required>
            <el-input v-model="editRally.address" />
          </el-form-item>

          <el-form-item label="Content" prop="content" required>
            <el-input v-model="editRally.content" type="textarea"/>
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
const { editShow, item, confirmClick } = defineProps(['editShow', 'item', 'confirmClick'])

/**
 * 编辑组件的需要维护的数据
 */
const editRally = reactive({
    //其中的数据，需要维护在自己的edit该组件中，方便进行修改
    mainTitle: item.mainTitle,
    subTitle: item.subTitle,
    time: item.time,
    address: item.address,
    content: item.content,
    id: item.id
})

/**
 * 表单的校验规则
 */
const ruleFormRef = ref(null)
//拿到表单中所有需要编辑的参数formEl
const submitForm = async(formEl) =>{
    if (!formEl) return;
    await formEl.validate((valid, fields) =>{
        if (valid) {
            confirmClick({mainTitle: editRally.mainTitle, subTitle:editRally.subTitle, time: editRally.time, address: editRally.address, content: editRally.content, id: editRally.id})
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