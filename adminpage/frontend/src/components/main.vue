<template>
    <div class="main">
      <!--搜索框-->
        <el-form>
          <!-- <el-icon><Search /></el-icon> -->
          <el-form-item>
            <!--search member first name-->
            <el-tooltip
              class="box-item"
              effect="light"
              content="Please Input First Name"
              placement="top"
            >
            <el-input :prefix-icon="Search" v-model="inputValue" placeholder="Search Member Information" />
            </el-tooltip>
            
          </el-form-item>
          <!--search button 绑定了方法handleClick-->
          <!-- <el-button type="primary" :icon="Search" @click="handleClick">Search</el-button> -->
        </el-form>
        <!--因为需要配合搜索功能的api，所以传入的时memberList而不是data.list-->
        <Table :list="memberList" :editClick = 'editClick' :deleteHandle = 'deleteHandle' />
        <!--分页 <pagination></pagination> -->
    </div>
    <edit :popShow = "popShow" v-if='popShow' :message='memberIfo.message' :confirmClick ='confirmClick'/>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import Table from './table.vue';
import edit from './edit.vue';
import { Search } from '@element-plus/icons-vue'
import pagination from './pagination.vue'
import { getMember, changeMemberInfo, deleteMember } from '../api/index';
import { ElMessage } from 'element-plus';
/**
 * 初始化数据
 */
const data = reactive({
  list: [], //member info list
  total: 1
})

/**
 * member列表数据的获取
 */
const getMemberData = async(query) =>{
  const id = query?.id
  const res = await getMember({id})

  data.list = res?.data.list;
  data.total = res?.data.total;
}

onMounted(() =>{
  getMemberData()
})
/**
 * 分页逻辑
 * 
 * const currentChange = (val) =>{
  if (val === 'previous') {
    if (data.page > 1) {
      data.page--
    }else{
      ElMessage({
        message: 'First Page!',
        type: 'warning',
        showClose: true
      })
    }
  }
  if (val === 'next') {
    if (data.page < Math.ceil(data.total / 5)) {
      data.page++
    }else{
      ElMessage({
        message: 'Last Page!',
        type: 'warning',
        showClose: true
      })
    }
  }
}
 */

/**
 * 搜索框的逻辑
 */
//初始化变量
const inputValue = ref('');
/**
 * 搜索的逻辑
 */
const memberList = computed(() =>{
  return data.list?.filter((item) =>{
    //通过member的first name搜索，判断搜索框input value中的值大于等于0时，有值存在 没有返回-1
    return item.firstName.indexOf(inputValue.value) >= 0;
  })
})

/**
 * 编辑数据
 */
//member修改接口调用
const changeMemberInfoData = async(query) =>{
  const {firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation, id} = query
  const res = await changeMemberInfo({firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation, id})
  if (res?.message) {
    ElMessage({
      message: res.message,
      type: 'success'
    })
  }
}
const memberIfo = reactive({
  message: {}
})

//控制编辑弹窗的展示变量
const popShow =ref(false)

//控制编辑弹窗的展示方法
const isShowPop = (show) =>{
  popShow.value = show
}

//edit button
const editClick = (val) =>{
  //控制弹窗的变量，点击edit button触发 设置为true
  isShowPop(true)
  memberIfo.message = val;
}

//取消按钮和确认按钮方法
const confirmClick = (val) =>{
  if (val === 'cancel') {
    //控制弹窗的变量，点击cancel button触发 设置为false 关闭对话框
    isShowPop(false)
    //if判断 如果 memberIfo.message = val 赋值为相同变量，则不予修改 验证表单中所有变量
  }else if (val.firstName !== memberIfo.message.firstName || val.lastName !== memberIfo.message.lastName || val.phoneNumber !== memberIfo.message.phoneNumber || val.username !== memberIfo.message.username || val.password !== memberIfo.message.password || val.address !== memberIfo.message.address || val.emailAddress !== memberIfo.message.emailAddress || val.birthday !== memberIfo.message.birthday || val.occupation !== memberIfo.message.occupation) {
    //更改member info
    data.list.map((item) =>{
      //比较修改前后的数据 item 和 val
      if (item.id === val.id) {
        item.firstName = val.firstName,
        item.lastName = val.lastName,
        item.phoneNumber = val.phoneNumber,
        item.username = val.username,
        item.password = val.password,
        item.address = val.address,
        item.emailAddress = val.emailAddress,
        item.birthday = val.birthday,
        item.occupation = val.occupation
      }
    })

    //关闭弹窗
    isShowPop(false);
    //修改接口的调用
    changeMemberInfoData({firstName: val.firstName, lastName: val.lastName, phoneNumber: val.phoneNumber, username: val.username, username: val.username, password: val.password, address: val.address, emailAddress: val.emailAddress, birthday: val.birthday, occupation: val.occupation, id:val.id});
  }else{
    ElMessage({
      showClose: true,
      message: 'No Edit',
      type: 'warning'
    })
  }
}

/**
 * member info删除
 */
//删除的接口
const deleteMemberData = async(query) =>{
  const res = await deleteMember({id: query})
  if (res.message) {
    ElMessage({
      message: res.message,
      type: 'success'
    })
  }
}
const deleteHandle = (val) =>{
  //val: 获取table中 confirm事件deleteHandle中获取到的列表的row中的id值
  if (val) {
    data.list = data.list.filter((item) =>{
      //判断main table中 当前item的id值是否等于table传递过来中的 deleteHandle传递过来的id值
      return item.id !== val
    })
    //删除接口的调用，传入val
    deleteMemberData(val)
  }
}
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
}

.main {
  background-color: whitesmoke;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: x-large;

  .input-with-select {
    width: 400px;
    margin-bottom: 40px;
  }
}

:deep(.el-table__header-wrapper) {
  position: fixed;
  z-index: 20;
}

:deep(.el-table__inner-wrapper) {
  overflow: hidden;
}

:deep(.el-table__body-wrapper) {
  margin-top: 40px;
}

:deep(.el-input__inner) {
  width: 300px;
  margin-right: 10px;
}

:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
  height: 140px !important;
}

.table {
  height: 80vh;
  width: 85vw;
  overflow: hidden;
  overflow-y: scroll;
}

.table::-webkit-scrollbar {
  display: none
}
</style>