<template>
    <div class="register">
        <div class="backGroundImage"></div>
        <div class="register_container">
            <h1 class="h1">Akarana Club Rally Register</h1>
            <el-form :model="createRally" :rules="rules" ref="ref_form">
                <!--rally 信息输入-->
                <el-form-item prop="mainTitle">
                  <el-input v-model="createRally.mainTitle" placeholder="Main Title" clearable>
                        <template #prepend>
                            <el-icon><List /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="subTitle">
                    <el-input v-model="createRally.subTitle" placeholder="Sub Title" clearable>
                        <template #prepend>
                            <el-icon><List /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="time">
                    <el-input v-model="createRally.time" placeholder="Rally Time" clearable>
                        <template #prepend>
                            <el-icon><Calendar /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="address">
                    <el-input v-model="createRally.address" placeholder="Rally Address" clearable>
                        <template #prepend>
                            <el-icon><Place /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="mapUrl">
                    <el-input v-model="createRally.mapUrl" placeholder="Google Map URL" clearable>
                        <template #prepend>
                          <el-icon><MapLocation /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="content">
                    <el-input v-model="createRally.content" placeholder="Content" type="textarea" clearable />
                </el-form-item>

                <!-- upload cover image  -->
                <el-upload
                  ref="uploadRef"
                  class="upload-demo"
                  action="http://127.0.0.1:3000/api/v1/admin/create"
                  :auto-upload="false"
                  @change="onFileChange"
                >
                  <template #trigger>
                    <el-button type="primary">select file</el-button>
                  </template>

                  <template #tip>
                    <div class="el-upload__tip">
                      jpg/png files with a size less than 500kb
                    </div>
                  </template>
                </el-upload>
                <!--home button-->
                <el-button class="register_submit" @click="goHome">Cancel</el-button>
                <!--register button-->
                <el-button type="primary" class="register_submit" @click="Rally">Create</el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import router from '../router/index';
import { reactive, ref } from "vue";
import { getRally } from '../api/index';
/**
 * 初始的ref
 */
const ref_form = ref(null);

/**
 * rally表单的数据声明
 */
const createRally = reactive({
    mainTitle:'',
    subTitle:'',
    content:'',
    time:'',
    address:'',
    mapUrl: '',
    image: null,
})

//创建一个onFileChange方法，是位于el-upload组件中的@change事件的处理程序，它在用户选择一个文件时被调用
//file 参数包含有关所选文件的信息
const onFileChange = (file) => {
  // file.raw 是一个 File 对象，它包含所选文件的原始数据，将 file.raw 赋值给 createRally.image，以便稍后将其与其他表单数据一起上传
  createRally.image = file.raw;
};

/**
 * 表单的数据检验，定义rules，检查输入框是否为空
 */
const rules = {
    mainTitle:[{required: 'true', trigger: 'blur', message: 'Please input main title'}],
    time:[{required: 'true', trigger: 'blur', message: 'Please input precise time'}],
    address:[{required: 'true', trigger: 'blur', message: 'Please input correct address'}],
    content:[{required: 'true', trigger: 'blur', message: 'Please input details of the rally'}]
}

/**
 * create rally 的方法
 */
const Rally = () =>{
    ref_form.value.validate((val) =>{
        if (val) {
            getRallyData();
        }
    })
}

/**
 * create rally api 的调用
 */
const getRallyData = async() => {
  //创建一个新的FormData对象
  const formData = new FormData();
  //将表单中的各个字段添加到对象中
  formData.append('mainTitle', createRally.mainTitle);
  formData.append('subTitle', createRally.subTitle);
  formData.append('content', createRally.content);
  formData.append('time', createRally.time);
  formData.append('address', createRally.address);
  formData.append('mapUrl', createRally.mapUrl);
  //将所选图片（File 对象）添加到FormData对象中
  formData.append('image', createRally.image);

  //处理可能的错误
  try {
    //使用axios发送一个api的post请求，将FormData对象上传，api地址为 http://127.0.0.1:3000/api/v1/admin/upload，即上传文件将被发送到该地址
    //api的url后期应设置为全局url，以达到规范的要求
    const res = await axios.post('http://127.0.0.1:3000/api/v1/admin/create', formData, {
      //请求的headers包含'Content-Type': 'multipart/form-data'，这表示我们正在发送多部分表单数据（包括文本和文件）
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    //上传成功，收到后端发送的message后打印提示信息
    if (res?.data?.message) {
      ElMessage({
        message: 'Create Rally Success!',
        type: 'success',
      });
      //打印提示信息后跳转至rally相关的page
      router.push('/rally');
    }
  } catch (error) {
    //如果发生错误，在控制台中记录错误
    console.error(error);
  }
};

//click to home button
const goHome = () =>{
    router.push('/rally');
}
</script>

<style lang="less" scoped>
@-webkit-keyframes fadenum{
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
}
//class login样式
  .register {
    height: 100%;
    .backGroundImage{
      height: 100%;
      background-image: url("../assets/caravan.jpg");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 50% 50%;
      background-color: darkgray;
    }

    //icon样式
    .el_icon{
      height: 30px !important;
    }
  
    //登录框样式
    .register_container{
      animation: fadenum 1s ease;
      position: absolute;
      z-index: 1;
      width: 400px;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 1s;
      min-height: 200px;
      text-align: center;
      background-color: whitesmoke;
      border-radius: 10px;
      padding: 20px;
    }

    //登录框中h1样式
    h1{
      font-size: 20px;
      transition: all 1s;
      font-weight: bold;
      margin-bottom: 36px;
    }

    .el_form{
      border-radius: 20px;
    }

    .el_card{
      .register_submit{
        width: 100%;
        height: 50px;
        border-radius: 20px;
      }

      :deep(.el-input-group_prepend){
        padding: 0 10px;
      }
    }
  }
</style>