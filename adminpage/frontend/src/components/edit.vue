<template>
    <!--编辑当前信息的edit功能 使用dialog对话框 内嵌一个form表单-->
    <el-dialog title="Edit" modelValue="popShow" width="30%" center :show-close="false">
        <el-form :model="editData" ref="ruleFromRef">
          <el-form-item label="First Name" prop="firstName">
            <!--input first name-->
            <el-input v-model="editData.firstName" placeholder="First Name" />
          </el-form-item>
          
          <el-form-item label="Last Name" prop="lastName">
            <!--input last name-->
            <el-input v-model="editData.lastName" placeholder="Last Name" />
          </el-form-item>

          <el-form-item label="Phone Number" prop="phoneNumber">
            <!--input Phone number-->
            <el-input v-model="editData.phoneNumber" placeholder="Phone Number" />
          </el-form-item>

          <el-form-item label="User Name" prop="username">
            <!--input user name-->
            <el-input v-model="editData.username" placeholder="User Name" />
          </el-form-item>

          <el-form-item label="Pass Word" prop="password">
            <!--input user name-->
            <el-input v-model="editData.password" placeholder="Pass Word" />
          </el-form-item>

          <el-form-item label="Address" prop="address">
            <!--input user name-->
            <el-input v-model="editData.address" placeholder="Address" />
          </el-form-item>

          <el-form-item label="Email Address" prop="emailAddress">
            <!--input user name-->
            <el-input v-model="editData.emailAddress" placeholder="Email Address" />
          </el-form-item>

          <el-form-item label="Birthday" prop="birthday">
            <!--input user name-->
            <el-input v-model="editData.birthday" placeholder="birthday" />
          </el-form-item>

          <el-form-item label="Occupation" prop="occupation">
            <!--input user name-->
            <el-input v-model="editData.occupation" placeholder="Occupation" />
          </el-form-item>

          <el-form-item>
            <!--2 buttons confirm and cancel-->
            <el-button @click="confirmClick('cancel')">Cancel</el-button>
            <el-button type="primary" @click="submitForm(ruleFromRef)">Confirm</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { defineProps, reactive, ref} from 'vue';

const  { popShow, message, confirmClick } = defineProps(['popShow', 'message', 'confirmClick'])
/**
 * 编辑组件维护的数据
 */
const editData = reactive({
    id: message.id,
    firstName: message.firstName,
    lastName: message.lastName,
    phoneNumber: message.phoneNumber,
    username: message.username,
    password: message.password,
    address: message.address,
    emailAddress: message.emailAddress,
    birthday: message.birthday,
    occupation: message.occupation
})

/**
 * 表单的校验规则
 */
const ruleFromRef = ref(null);
//初始渲染为空，当表单完成从数据库提取数据传递到前端的渲染后,就可以拿到对应的元素
const submitForm = async(fromEl) =>{
    if (!fromEl) return;
    await fromEl.validate((valid, fields) =>{
        if(valid){
            confirmClick({firstName: editData.firstName, lastName: editData.lastName, phoneNumber: editData.phoneNumber,
              username:editData.username, password:editData.password, address:editData.address, emailAddress:editData.emailAddress, birthday:editData.birthday, occupation:editData.occupation,
               id:editData.id})
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