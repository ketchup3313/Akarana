<template>
 <p>Hello World</p>
 

  <el-icon><AlarmClock /></el-icon>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


<style lang ="less" scoped>
p{
  color: aqua;
}

</style>
