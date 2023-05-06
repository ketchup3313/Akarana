<template>
  <router-view>

  </router-view>
</template>

<script>
import store from './store';


export default {

  name: 'App',
  created(){
    store.dispatch({
      type:'getUserInfo'
    })
  }

}
</script>

