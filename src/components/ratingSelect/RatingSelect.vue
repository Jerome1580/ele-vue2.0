<template>
  <div class="ratingselect">
    <!--选择类型-->
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive"
            :class="{'active':self_selectType === 2}">{{ desc.all }}<span
        class="count">{{ ratings.length }}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':self_selectType === 0}">{{ desc.positive }}<span
        class="count">{{ positive.length }}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':self_selectType === 1}">{{ desc.negative }}<span
        class="count">{{ negative.length }}</span></span>
    </div>
    <!--只看内容-->
    <div @click="toggleContent" class="switch" :class="{'on':self_onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EventBus from '@/EventBus'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default(){
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data(){
      return {
        // 最好不要去修改父组件，传过来的值，用自身的data，computed来代替
        self_selectType: this.selectType,
        self_onlyContent: this.onlyContent
      }
    },
    computed: {
      positive(){
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negative(){
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select(type, event){
        // 要传event，是因为外层有better-scroll
        if (!event._constructed) {
          return;
        }

        this.self_selectType = type;
        // 通知父组件，更改数据
        EventBus.$emit('ratingType.select', type);
      },
      toggleContent(event){
        if (!event._constructed) {
          return;
        }
        this.self_onlyContent = !this.self_onlyContent;
        EventBus.$emit('content.toggle', this.self_onlyContent);
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import '../../common/stylus/mixin.styl'

  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        line-height 16px
        border-radius 1px
        font-size 12px
        color rgb(77, 85, 93)
        &.active
          color #fff
        .count
          margin-left 2px
          font-size 8px
        &.positive
          background-color: rgba(0, 160, 220, 0.2)
          &.active
            background-color: rgb(0, 160, 220)
        &.negative
          background-color: rgba(77, 85, 93, 0.2)
          &.active
            background-color: rgb(77, 85, 93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153, 159)
      font-size 0
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      .text
        font-size 12px
</style>
