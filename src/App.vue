<template>
  <div id="app">
    <HeaderView></HeaderView>
    <div class="tab">
      I am tab
    </div>
    <div class="content">
      I am content
    </div>
  </div>
</template>

<script>
  import HeaderView from '@/components/Header/Header.vue'
  export default {
    components:{
      HeaderView
    }
  }
</script>

<style>

</style>
