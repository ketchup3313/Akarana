<template>
  <div class="photo-wall">
    <!-- action 属性表示上传文件的地址，即上传文件的接口地址。当用户选择文件并点击上传按钮时，组件会向该地址发送 HTTP POST 请求，将选中的文件上传至服务器 -->
    <!-- action 属性被设置为 http://127.0.0.1:3000/api/v1/admin/upload，这表示上传文件的接口地址为 http://127.0.0.1:3000/api/v1/admin/upload，即上传文件将被发送到该地址。
      如果该地址是有效的，那么上传操作将成功。否则，上传操作将失败，并显示相应的错误消息 -->
    <!-- action 属性是 <el-upload> 组件中的必需属性。如果没有设置 action 属性，组件将无法执行上传操作 -->
    <!-- 在这里调用，内层代码会自动追加成功后的照片,不需要操作list 手动追加 -->
    <!-- action属性中的url后期应设置为全局url，以达到规范的要求 -->
    <el-row>
      <el-upload   action="http://127.0.0.1:3000/api/v1/admin/upload" name="image" v-model:file-list="photo.list" 
      list-type="picture-card"  :on-preview="handlePictureCardPreview" :on-remove="handleRemove" >
      <el-icon><Plus /></el-icon>
      </el-upload>
      <!--预览上传完成后的图片-->
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%; object-fit: contain;"/>
      </el-dialog>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { displayImage, deleteImage } from '../../api/index';

/**
 * photo列表中image的url的获取
 */
const photo = reactive({
  list: []
})

const displayImageData = async(query) =>{
  const id = query?.id;
  const res = await displayImage({id});

  photo.list = res?.data.list
}

onMounted(() =>{
  displayImageData();
})

/**
 * previewPhoto
 */
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handlePictureCardPreview=  (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
}

/**
 * deleteImage的api调用
 */
const handleRemove = async (uploadFile, uploadFiles) => {
  const res = await deleteImage({
    id:uploadFile.id
  });
}
</script>
  
<style scoped>
.photo-wall {
  padding: 20px;
}
</style>