<template>
    <div class="phtoinfo-container">
        <h3>{{ photoMsg.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoMsg.add_time | dateformat }}</span>
            <span>点击：{{photoMsg.click}}次</span>
        </p>

        <hr>
        <!-- 图片 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in photoThumbs" :src="item.src" height="100" @click="$preview.open(index, photoThumbs)" :key="item.src">
        </div>

        <!-- 图片文字内容 -->
        <p class="content" v-html="photoMsg.content"></p>

        <!-- 评论区域 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";

export default {
    data() {
        return {
            id: this.$route.params.id,
            photoMsg: {},
            photoThumbs: []
        };
    },
    created: function() {
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo() {
            this.$http
                .get("api/getimageInfo/" + this.id)
                .then(function(result) {
                    if (result.body.status == 0) {
                        this.photoMsg = result.body.message[0];
                    } else {
                        Toast("图片信息获取失败！");
                    }
                });
        },
        getThumbs() {
            this.$http
                .get("api/getthumimages/" + this.id)
                .then(function(result) {
                    if (result.body.status == 0) {
                        result.body.message.map(function(v) {
                            v.msrc = v.src;
                            v.w = 600;
                            v.h = 400;
                        });
                        this.photoThumbs = result.body.message;
                    } else {
                        Toast("图片缩略图信息获取失败！");
                    }
                });
        }
    },
    components: {
        // 用来注册子组件的节点
        "cmt-box": comment
    }
};
</script>

<style lang="less" scoped>
.phtoinfo-container {
    h3 {
        font-size: 15px;
        color: cornflowerblue;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    .subtitle {
        font-size: 10px;
        color: grey;
        display: flex;
        justify-content: space-between;
    }
    .content {
        line-height: 1.8em;
    }

    .thumbs {
        img {
            margin: 10px;
            box-shadow: 0 0 8px #999;
        }
    }
}
</style>
