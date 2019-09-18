<template>
    <div class="shopcarContainer">
        <!-- 商品列表区域 -->
        <div class="good-list" v-for="(item , index) in list" :key="item.id">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch @change="goodSelectChange(item.id , $store.getters.getGoodSelected[item.id])" v-model="$store.getters.getGoodSelected[item.id]"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numberbox :count="$store.getters.id_count[item.id]" :id="item.id"></numberbox>
                                <a href="#" @click.prevent="remove(item.id , index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="jiesuan">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger" >去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numberbox from "../subcomponents/shopcar_numberbox.vue";
export default {
    components : {
        numberbox : numberbox,
    },
    data(){
        return {
            list : [],
        }
    },
    created(){
        this.getGoodList();
    },
    methods : {
        getGoodList(){
            var ids = this.$store.getters.ids;
            if(ids.length <= 0 ) return;
            this.$http.get('api/goods/getshopcarlist/' + ids  )
            .then(function(result){
                if(result.body.status == 0){
                    this.list = result.body.message;
                }
            })
        },
        remove(id , i){ //删除一个商品 ， 需要把store删了   还需要把list数据删了
            this.$store.commit('removeGood' , id);
            this.list.splice(i , 1);
        },
        goodSelectChange(id , val){ //商品select变化  ， 将最新的selected值写入store和localStorage
            //console.info(id + '---' + val);
            this.$store.commit('updateGoodSelected' , {id : id , selected : val});
        }
    }
};
</script>

<style lang="less" scoped>
.shopcarContainer {
    background-color: #eee;
    overflow: hidden;

    .good-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;  //元素居中
        }

        img{
            height : 60px;
            width: 60px;
        }

        h3{
            font-size: 13px;
        }

        .price{
            color:crimson;
            font-weight: bold;
        }
    }
    .jiesuan{
        display : flex;
        justify-content: space-between;
        align-items: center;

        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>

