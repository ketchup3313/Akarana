<template>
  <el-dialog title="Rally Details" modelValue="popShow" width="60%" center :show-close="false">
    <el-form :model="rallyDetails">
      <el-descriptions :model="rallyDetails" class="font-style">
        <el-descriptions-item label="Main Title: " prop="mainTitle">
          <div>
            {{ rallyDetails.mainTitle }}
          </div>
        </el-descriptions-item>

        <el-descriptions-item label="Sub Title: ">
          <div>
            {{ rallyDetails.subTitle }}
          </div>
        </el-descriptions-item>

        <el-descriptions-item label="Time: ">
          <div>
            {{ rallyDetails.time }}
          </div>
        </el-descriptions-item>

        <el-descriptions-item label="Status: ">
          <div>
            {{ rallyDetails.status }}
          </div>
        </el-descriptions-item>

        <el-descriptions-item label="Address: ">
          <div>
            {{ rallyDetails.address }}
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions :model="rallyDetails" class="font-style">
        <el-descriptions-item label="Content: ">
          <div>
            <span class="font-size">
              {{ rallyDetails.content }}
            </span>
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions class="font-style">
        <el-descriptions-item label="Map Url: ">
          <div class="vhtml-center" v-html="rallyDetails.mapUrl" />
        </el-descriptions-item>
      </el-descriptions>
    
      <el-form-item>
        <!--传递cancel的值 ‘cancel’，当触发时将值传递给rallyPreview的组件中，关闭该对话框-->
        <el-button @click="cancelClick('cancel')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { defineProps, reactive } from 'vue';
import router from '../../router';
//获取父组件传过来的表格中的数据，通过message获取
const {popShow, message, cancelClick} = defineProps(['popShow', 'message', 'cancelClick']);

const rallyDetails = reactive({
    mainTitle: message.mainTitle,
    subTitle: message.subTitle,
    content: message.content,
    time: message.time,
    status: message.status,
    address: message.address,
    mapUrl: message.mapUrl
})
</script>

<style lang="less" scoped>
.font-size {
  font-size: 17px;
}

.vhtml-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-style {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

:deep(.el-form-item__content) {
  justify-content: center;
  margin-left: 0 !important;
}

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