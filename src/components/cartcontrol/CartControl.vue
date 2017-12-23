<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"
           @click.stop.prevent="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import Bus from '@/EventBus';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event){
        if (!event._constructed) {
          // 解决pc点击2次的问题
          return
        }
        if (!this.food.count) {

          Vue.set(this.food, 'count', 1)

        } else {
          this.food.count++;
        }

        // 发送当前点击的按钮
        Bus.$emit('cart.add', event.target)

      },
      decreaseCart(event){
        if (!event._constructed) {
          // 解决pc点击2次的问题
          return
        }
        if (this.food.count) {
          this.food.count--
        }

      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
      &.move-enter-active, &.move-leave-active
        transition all 0.4s ease
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(24px)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
</style>
