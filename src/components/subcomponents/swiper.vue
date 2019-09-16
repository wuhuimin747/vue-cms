<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in list" :key="item.id">
            <img :src="item.img" alt="" :class="{ width_full : isfull }">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props : ['list' , 'isfull']
};
</script>

<style lang="less" scoped>
//轮播图手动设置高度
.mint-swipe {
    height: 200px;
    //less语法设置每张轮播图的颜色
    .mint-swipe-item {
        // &:nth-child(1) {
        //     background-color: aquamarine;
        // }
        // &:nth-child(2) {
        //     background-color: cadetblue;
        // }
        // &:nth-child(3) {
        //     background-color: cornflowerblue;
        // }

        text-align: center;
        //图片的宽高
        img {
            //width: 100%;
            height: 100%;
        }
        .width_full{
            width: 100%;
        }
    }
}
</style>
