<template>
    <!-- Title -->
   <div>
    <div id = title>AKARANA CARAVAN CLUB INCORPORATED</div>
    <div id = application>Application for individual membership</div>
    <div id = description>This application must be ratified by the Committee after a minimum of two rallies have been attended and access to the website will not be granted before then.</div>
    


</div>
<!-- form -->
   <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon>
    <!-- FirstName -->
    <el-form-item label="First Name" prop="FirstName" required >
      <el-input class="FirstName" v-model="ruleForm.FirstName" ></el-input>  
    </el-form-item>
    <!-- Surname -->
    <el-form-item label="Surname" prop="SurName" required="true" >
      <el-input class="SurName" v-model="ruleForm.SurName" ></el-input>  
    </el-form-item>
    <!-- Birthdate -->
    <el-form-item label="Birthdate" prop="Birthdate" required="true" >
      <el-date-picker
        type="date"
        placeholder="Pick a day"
      
        required="true"
        
        class="BirthDate"
        v-model="ruleForm.Birthdate">
        
      </el-date-picker>
    </el-form-item>
    <!-- Occupation -->
    <el-form-item label="Occupation" prop="Occupation" required="true">
        <el-input class="Occupation" v-model="ruleForm.Occupation"></el-input>  
    </el-form-item>
    <!-- Address -->
    <el-form-item label="Address" prop="Address" required="true">
        <el-input class="Address" v-model="ruleForm.Address"></el-input>
    </el-form-item>
    <!-- Postcode -->
    <el-form-item label="Postcode" prop="Postcode" required="true">
        <el-input class="Postcode" v-model="ruleForm.Postcode"></el-input>
    </el-form-item>
    <!-- Phone -->
    <el-form-item label="Phone"  prop="Phone" required="true">
        <el-input class="Phone"  v-model="ruleForm.Phone"></el-input>
        </el-form-item>
    <!-- Email -->
    <el-form-item label="Email" prop="Email" required="true">
        <el-input class="Email" v-model="ruleForm.Email"></el-input>
        </el-form-item>
        <!-- notive -->
        <div>
            <el-checkbox label="I agree all statements in Terms of service" name="type" required="true" /> 
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      
    </el-form-item>



















</el-form>
  

  
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue'
import  { FormInstance, FormRules } from 'element-plus'
import router from "../router/index";
const formSize = ref('default')
const formRef = ref<FormInstance>()

const ruleForm = reactive({
  FirstName: '',
  SurName: '',
  Occupation: '',
  Address: '',
  Phone: '',
  Postcode: '',
  Birthdate: '',
  Email: '',

})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}


</script>

<style lang="less" scoped>
#title{
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
#application{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
#description{
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.FirstName{
    width: 150px;

}
.SurName{
    width: 150px;
}
.BirthDate{
    width: 150px;
}
.Occupation{
    width: 200px;
}
.Address{
    width: 250px;
}
.Postcode{
    width:100px
}
.Phone{
    width: 150px;
}
.pvt{
    width: 50px;
}
.Email{
    width: 210px;
}
</style>