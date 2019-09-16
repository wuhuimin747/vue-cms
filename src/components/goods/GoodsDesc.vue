<template>
    <div>
        <p class="header">{{goodDesc.title}}</p>
        <hr>
        <div class="content" v-html="goodDesc.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            goodDesc: {}
        };
    },
    created() {
        this.getDesc();
    },
    methods: {
        getDesc() {
            this.$http
                .get("api/goods/getdesc/" + this.id)
                .then(function(result) {
                    if (result.body.status == 0) {
                        this.goodDesc = result.body.message[0];
                    }
                });
        }
    }
};
</script>

<style lang="less">
.header {
    text-align: center;
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: lightseagreen;
}

.content {
    padding : 0 5px;
    img{
        width: 100%;  //去掉scoped 可以让这里的图片百分百
    }
}

</style>
