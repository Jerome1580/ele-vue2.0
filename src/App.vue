<template>
  <div id="app">
    <HeaderView></HeaderView>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
    </div>
    <div class="tab-item">
       <router-link :to="{path:'/ratings'}">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
  import HeaderView from '@/components/header/Header.vue'
  export default {
    components:{
      HeaderView
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  #app
    .tab
      display:flex
      width:100%
      height:40px
      line-height:40px
      .tab-item
        flex:1
        text-align:center
</style>
