<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalPrice>0}">&yen;{{ totalPrice }}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <!--去结算-->
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{ payDesc }}</div>
        </div>
      </div>
      <!-- 添加动画小球-->
      <div class="ball-container">
        <transition-group name="drop">
          <div v-for="(ball,index) in balls" v-show="ball.show" class="ball" :key="index"></div>
        </transition-group>
        <!--      <transition name="drop-inner">
                <div class="inner"></div>
              </transition>-->
      </div>
      <!--购物车详情-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>&yen;{{ food.price * food.count }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!--遮罩-->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import CartControl from '@/components/cartcontrol/CartControl'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default(){
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        fold: true
      }
    },
    computed: {
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        });
        return total;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count
        });
        return count;
      },
      payDesc(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`
        } else {
          return '去结算';
        }
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow(){
        if (!this.totalCount) {
          this.fold = true;
          return false
        }
        let show = !this.fold;

        // 当列表展示时listShow，需要给better-scroll初始化,所以要写在listShow的计算属性中
        // 当列表展现时，有DOM的变化（讲food的li添加进去ul中）
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              // 如果没有实例化better-scroll
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              // 如果已经实例化，就不用再实例化，直接更新下
              this.scroll.refresh();
            }

          })
        }
        return show;
      }
    },
    methods: {
      // 添加小球动画
      drop(el){
        // 添加小球动画，从cartControl组件$emit（cart.add） -> 到Goods组件 ，再由Goods组件$ref.shopcart 获取到该购物车组件，调用方法drop
        // TODO 具体实现省略
        // console.log(el)
      },
      toggleList(){
        // 点击底部购物车，切换购物车详情的显示隐藏
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold
      },
      empty(){
        // 清空购物车
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      },
      hideList(){
        // 点击遮罩隐藏购物车详情
        this.fold = true;
      },
      pay(){
        // 去结算
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      }
    },
    components: {
      CartControl
    }
  }
</script>


<style scoped lang="stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background-color: #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background-color: #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background-color rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 18px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background-color: rgb(240, 20, 20)
            box-shadow 0 4px 8px rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          background-color: #2b333b
          &.not-enough
            background-color: #2b333b
          &.enough
            background-color: #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-enter-active, &.drop-leave-active
          transition all 0.4s ease
        &.drop-inner-enter-active, &.drop-inner-leave-active
          transition all 0.4s ease
      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0, 160, 220)
    .shopcart-list
      position absolute
      transform translate3d(0, -100%, 0)
      left 0
      top 0
      z-index -1
      width 100%
      /*购物车动画*/
      &.fold-enter-active, &.fold-leave-to
        transition all 0.5s
      &.fold-enter, &.fold-leave-to
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background-color: #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    opacity 0.5
    background-color: rgba(7, 17, 27, 0.6)
    -webkit-backdrop-filter blur(10px)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background-color: rgba(7, 17, 27, 0)
</style>
