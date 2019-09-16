<template>
    <div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 轮播图部分 -->
                    <lunbotu :list="lunboList" :isfull="false"></lunbotu>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        <span>市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;</span>
                        <span>销售价：<span class="now_price">￥{{goodsInfo.sell_price}}</span></span>
                    </p>
                    <p class="price">
                        <span>购买数量：</span><numberbox></numberbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

         <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsInfo.add_time | dateformat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goCmt(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import lunbotu from "../subcomponents/swiper.vue";
import numberbox from "../subcomponents/numberbox.vue";
import mui from "../../lib/mui/js/mui.min.js";


export default {
    data() {
        return {
            id : this.$route.params.id,
            lunboList: [],
            goodsInfo : {},
        };
    },
    created: function() {
        this.getlunboList();
        this.getGoodsInfo();
    },
    mounted: function() {
        mui(".mui-numbox").numbox();
    },
    methods: {
        getlunboList() {
            this.$http
                .get("api/getthumimages/" + this.id)
                .then(function(result) {
                    //console.info(result.body.message[0].src);
                    if (result.body.status == 0) {
                        result.body.message.forEach(function(v) {
                            v.img = v.src;
                        });
                        this.lunboList = result.body.message;
                    } else {
                        Toast("获取商品轮播图信息失败！");
                    }
                });
        },
        getGoodsInfo(){
            this.$http
                .get("api/goods/getinfo/" + this.id)
                .then(function(result) {
                    if (result.body.status == 0) {
                        this.goodsInfo = result.body.message[0];
                    } else {
                        Toast("获取商品参数信息失败！");
                    }
                });
        },
        goDesc(id){ //商品介绍
            this.$router.push({name : 'goodsDesc' , params : {id : this.id}})
        },
        goCmt(id){ //商品评论
            this.$router.push({name : 'goodsCmt' , params : {id : this.id}})
        }

    },
    components: {
        lunbotu: lunbotu,
        numberbox : numberbox
    }
};
</script>

<style lang="less" scoped>

.price{
    font-size: 14px;
    color: black;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
}

.mui-card-footer{
    display: block;

    button{
        margin : 15px 0;
    }
}
</style>
