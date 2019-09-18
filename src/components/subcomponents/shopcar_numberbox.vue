<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" ref="numb"  :value="count" @change="changeShopcar"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
    props : ['count' , 'id'] ,  //父组件向子组件传值，  数据源是异步操作  ， 会有响应时间的变化  undefined -> 确定值
    mounted : function() {
        mui(".mui-numbox").numbox();
    }, 
    methods : {
        changeShopcar(){
            //console.info(this.$refs.numb.value);
            this.$store.commit('shopcar_addToCar' , {id : this.id , count : this.$refs.numb.value})
        }
    },
    watch : {
       
    }
};
</script>

<style lang="less" scoped>
</style>

