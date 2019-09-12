<template>
  <div class="goods-list">
    
    <!-- <router-link tag="div" class="goods-item" v-for="item in list" :key="item.id" :to="'/home/goodsinfo/' + item.id">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 编程式导航 -->
    <div class="goods-item" @click="getDetail(item.id)" v-for="item in list" :key="item.id" >
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex : 1,
            list : []
        }
    },
    created(){
        this.getGoodList();
    },
    methods : {
        getGoodList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageIndex)
            .then(function(data){
                if(data.body.status == 0){
                    this.list = this.list.concat(data.body.message);
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getGoodList();
        },
        getDetail(id){
            // 命名的路由  $route里面是当前路由的参数     $router是路由导航对象
            this.$router.push({ name: 'goodinfo', params: { id : id }})
        }
    }
}
</script>

<style lang="less" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img{
      width: 100%;
    }
    .title{
      font-size: 14px;
    }

    .info{
      background-color: #eee;
      p{
        margin: 0;
        padding: 5px;
      }
      .price{
        .now{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old{
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
