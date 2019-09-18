//console.info('ok');
import Vue from "vue";

//导入根组件App.vue
import app from "./App.vue";

//引入min-ui组件
import { Header , Swipe, SwipeItem , Button , Lazyload , Switch } from 'mint-ui';
Vue.component(Header.name, Header); //全局注册组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);

//引入MUI的样式文件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


//导入路由的包,项目启用vue-router路由组件,带入路由规则对象
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routerRuleObj from './router.js'

//导入vue-resource组件
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';//设置数据请求地址的base路径
Vue.http.options.emulateJSON = true; //以表单格式post  application/x-www-form-urlencoded

//导入vue-preview图片缩略图组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview)

//引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);

//本地存储，每次刷新页面的时候也能读出来
var car = JSON.parse(localStorage.getItem('car') || '[]');  //存储中读取出来的一定是string

//创建store仓库
var store = new Vuex.Store({
    state : {  // this.$store.state.xxx
        car : car,  //用来存储购物车里的商品{id : 商品id , count : 商品数量 , price : 单价 , selected : true 商品书否在购物车中选中}
    },
    mutations : { // this.$store.commit('方法名' , '按需传递唯一参数')
        goodsinfo_addToCar(state , goodsInfo){ //goodsinfo场景：添加商品到公共数据car中
            //1.如果car里有这个商品，只加数量count
            //2.如果没有这个商品，加一个完整的商品进购物车
            var existFlag = false;
            state.car.some(function(v){
                if(v.id == goodsInfo.id){
                    v.count += parseInt(goodsInfo.count);  //担心count是string
                    existFlag = true;
                    return true;
                }
            })

            if(!existFlag){
                state.car.push(goodsInfo);
            }

            //加入本地存储，每次刷新页面的时候也能读出来
            localStorage.setItem('car' , JSON.stringify(state.car));
        },
        shopcar_addToCar(state , good){ //shopcar场景， 点击numberbox添加至购物车
            //分析：对应商品的数量不是累加，而是直接修改
            //监听每个numberbox的输入框数字变化，找到car里对应的goodsinfo,更改count,存入本地存储
            state.car.some(function(item){
                if(item.id == good.id){
                    item.count = parseInt(good.count);
                    return true;  //找到就停下来，不用全部遍历
                }
            })
            localStorage.setItem('car' , JSON.stringify(state.car));
        },
        removeGood(state , id){//删除商品
            state.car.some((item , i) => {
                if(item.id == id){
                    state.car.splice(i ,1);
                    return true;
                }
            })
            localStorage.setItem('car' , JSON.stringify(state.car));
        },
        updateGoodSelected(state , good){ //更新商品的选中状态
            state.car.some((item , i) => {
                if(item.id == good.id){
                    item.selected = good.selected
                    return true;
                }
            })
            localStorage.setItem('car' , JSON.stringify(state.car));
        }
    },
    getters : {  // this.$store.getters.xxx
        carCount(state){//购物车商品数量和
            var total = 0;
            state.car.forEach(function (v) {
                total += parseInt(v.count); 
            })
            //console.info(total);
            return total;
        },
        ids(state){//购物车商品ids
            var ids = [];
            state.car.forEach(item => ids.push(item.id));
            //console.info(ids.join(','));
            
            return ids.join(',');
        },
        id_count(state){ //购物车商品 id-数量的对象
            var o = {};
            state.car.forEach(item =>{
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodSelected(state){ //id-selected 
            var o = {};
            state.car.forEach(item =>{
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsCountAndAmount(state){//获取勾选商品的总数量和总价
            var o = {
                count : 0,
                amount : 0
            };
            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count;
                    o.amount += item.count * item.price;
                }
            })

            return o; 
        }
    }
})

//全局时间格式过滤器,使用moment插件
import moment from 'moment'
Vue.filter('dateformat' , function (data , pattern = 'YYYY-MM-DD') { //第一个参数永远是被过滤的数据,  设置一个默认模式patern
    return moment(data).format(pattern);
})
//根组件app , 绑定index页面的容器#app
var vm = new Vue({
    el : '#app',
    render : function (createElements) {
        return createElements(app);

    },
    router : routerRuleObj,
    store : store //挂载vuex的store对象到跟实例上
})
