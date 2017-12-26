<template>
  <div id="app">
    <HeaderView :seller="seller"></HeaderView>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}" active-class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}" active-class="active">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}" active-class="active">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from '@/common/js/util'
  import HeaderView from '@/components/header/Header.vue'
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    components: {
      HeaderView
    },
    mounted(){
      this.fecthSellData()
    },
    methods: {
      fecthSellData(){
        this.$http.get('/data.json').then((req) => {

          this.seller = Object.assign({}, this.seller, req.data.seller)
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "./common/stylus/mixin.styl";

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)


</style>
