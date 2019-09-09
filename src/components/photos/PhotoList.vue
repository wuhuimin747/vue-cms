<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a @click="getPhotelistBycatesId(item.id);" :class="['mui-control-item' , item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id">{{item.title}}</a>
                </div>
            </div>

        </div>

        <!-- 懒加载图片 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
    data() {
        return {
            cates: [],
            list: []
        };
    },
    created: function() {
        this.getPhotoCategory();
        this.getPhotelistBycatesId(0); //进来加载全部
    },
    mounted: function() {
        //要操作元素，最早要在mounted里面做，这是后木偶版刚被挂载好
        //过载之后在初始化mui滑动控件，解决首次进去不能滑动的问题
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getPhotoCategory() {
            this.$http.get("api/getimgcategory").then(function(result) {
                //console.info('ok');
                if (result.body.status == 0) {
                    result.body.message.unshift({ title: "全部", id: 0 });
                    this.cates = result.body.message;
                }
            });
        },
        getPhotelistBycatesId(cid) {
            this.$http.get("api/getimages/" + cid).then(function(result) {
                if (result.body.status == 0) {
                    this.list = result.body.message;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
* {
    touch-action: pan-y; //禁用chrome控制台滑动时的提示
}

.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img {
            width: 100%;
            vertical-align: middle;
        }
        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }

        .info {
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            .info-title {
                font-size: 14px;
            }
            .info-body {
                font-size: 13px;
            }
        }
    }
}
</style>

