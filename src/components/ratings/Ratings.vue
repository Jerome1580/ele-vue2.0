<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star
              :size="36"
              :score="seller.serviceScore"
            ></Star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star
              :size="36"
              :score="seller.foodScore"
            ></Star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <RatingSelect
        :selectType="selectType"
        :onlyContent="onlyContent"
        :desc="desc"
        :ratings="ratings"
      ></RatingSelect>
      <!--评价列表-->
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <Star :size="24" :score="rating.score"></Star>
                <span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{ item }}</span>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import EventBus from '@/EventBus'
  import Star from '@/components/star/Star.vue'
  import Split from '@/components/split/Split'
  import RatingSelect from '@/components/ratingSelect/RatingSelect'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  const ERR_OK = 200;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    created(){
      this.$http.get('/data.json').then((res) => {
        if (res.status === ERR_OK) {
          this.ratings = res.data.ratings;

          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })

        }
      })
    },
    mounted(){
      // 接收子组件传过来的触发事件
      let _this = this;

      EventBus.$on('ratingType.select', function (type) {
        _this.selectType = type;
        // 数据更新，scroll重新计算，因为vue数据更新触发DOM是异步的
        _this.$nextTick(() => {
          _this.scroll.refresh();
        })
      });

      EventBus.$on('content.toggle', function (onlyContent) {
        _this.onlyContent = onlyContent;
        _this.$nextTick(() => {
          _this.scroll.refresh();
        })
      });
    },
    methods: {
      needShow(type, text){
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    components: {
      Star,
      Split,
      RatingSelect
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"

  /* 固定内容 */
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px 0
        width 137px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .star
            display inline-block
            vertical-align top
            margin 0 12px
          .score
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(255, 153, 0)
        .delivery-wrapper
          font-size 0
          .title
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .delivery
            margin-left 12px
            font-size 12px
            color rgb(147, 153, 159)

  // 评价列表
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              vertical-align top
              margin-right 6px
            .delivery
              display inline-block
              vertical-align top
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)

          .text
            margin-bottom 8px
            line-height 18px
            color rgb(7, 17, 27)
            font-size 12px
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up, .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0, 161, 220)
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              color rgb(147, 153, 159)
              background-color: #fff
            .time
              position absolute
              top: 0
              right 0
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
</style>
