<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="showFlag = false">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <!--加入购物车-->
          <div class="cartcontrol-wrapper">
            <CartControl :food="food"></CartControl>
          </div>
          <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
        <!--间隔-->
        <Split v-show="food.info"></Split>
        <!--商品信息-->
        <div class="info" v-show="food.info">
          <div class="title">商品信息</div>
          <p class="text">{{ food.info}}</p>
        </div>
        <!--间隔-->
        <Split v-show="food.info"></Split>
        <!--商品评价-->
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <RatingSelect
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
          ></RatingSelect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import CartControl from '@/components/cartcontrol/CartControl'
  import Split from '@/components/split/Split'
  import RatingSelect from '@/components/ratingSelect/RatingSelect'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data(){
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show(){
        this.showFlag = true;

        // 切换每个产品时，都复用这个组件，切换时要初始化该组件
        this.selectType = ALL;
        this.onlyContent = true;

        // 新增滚动效果
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        })
      },
      addFirst(){
        if (!event._constructed) {
          // 移动端点击时，BScroll中_constructed是true，pc端没有这个属性
          return;
        }
        Vue.set(this.food, 'count', 1);

        // 发送当前点击的按钮,这里是为了触发加购小球坠落，功能未做，先省去
        /*Bus.$emit('cart.add', event.target)*/
      }
    },
    components: {
      CartControl,
      Split,
      RatingSelect
    }

  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background-color: #fff
    &.move-enter-active, &.move-leave-active
      transition all 0.3s linear
    &.move-enter, &.move-leave-to
      transform translate3d(100%, 0, 0)
    /*头图*/
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    /* 内容 */
    .content
      position relative
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        height 10px
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 18px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        box-sizing border-box
        border-radius 12px
        font-size 10px
        color #fff
        background-color: rgb(0, 160, 220)
    /* 商品信息 */
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7, 17, 27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77, 85, 93)
  // 评价
    .rating
      padding-top 18px
      .title
        line-height 14px
        margin-left 18px
        font-size 14px
        color rgb(7, 17, 27)
</style>
