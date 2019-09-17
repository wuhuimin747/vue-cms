<template>
    <div class="mui-numbox" data-numbox-min='1'  :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="getChangeedCount" ref="count"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
    props : ['max'] ,  //父组件向子组件传值，  数据源是异步操作  ， 会有响应时间的变化  undefined -> 确定值
    mounted : function() {
        mui(".mui-numbox").numbox();
    },
    methods : {
        getChangeedCount(){
            this.$emit('getcount' , this.$refs.count.value);  //子组件向父组件传值
        }
    },
    watch : {
        max : function(newval , oldval){ //max值的获取虽然是异步传输，但总有一个时刻会拿到，使用watch监听机制，将max赋给组件的最大值
            //使用mui的js api 手动设置numberbox的最大值值
            mui('.mui-numbox').numbox().setOption('max',newval)
        }
    }
};
</script>

<style lang="less" scoped>
</style>

