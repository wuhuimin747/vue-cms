<template>
    <div>
        <!-- 轮播图部分 -->
        <lunbotu :list="lunboList" :isfull="true"></lunbotu>

        <!-- 六宫格部分 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
//按需引入toast组件
import { Toast } from "mint-ui";
import lunbotu from "../subcomponents/swiper.vue";

export default {
    data() {
        return {
            lunboList: [] //保存轮播图的数组
        };
    },
    created: function() {
        //组件实例的data和methods初始化完成的时机
        this.getlunbodata();
    },
    methods: {
        //获取轮播图数据
        getlunbodata() {
            //status为0表示请求成功
            this.$http
                .get("api/getlunbo")
                .then(function(result) {
                    console.info(result.body);
                    if (result.body.status == 0) {
                        this.lunboList = result.body.message;
                    } else {
                        Toast("加载轮播图数据失败！");
                    }
                });
        }
    },
    components : {
        lunbotu : lunbotu
    }
};
</script>

<style lang="less" scoped>

//重写六宫格mui样式  ul
.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img{ //图标
        width: 60px;
        height: 60px;
    }
    .mui-media-body{ //文字
        font-size: 13px;
    }
}
// li
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
}
</style>

