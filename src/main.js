//console.info('ok');
import Vue from "vue";

//导入根组件App.vue
import app from "./App.vue";

//引入min-ui组件
import { Header , Swipe, SwipeItem , Button , Lazyload } from 'mint-ui';
Vue.component(Header.name, Header); //全局注册组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
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
        addToCar(state , goodsInfo){ //添加商品到公共数据car中
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
        }
    },
    getters : {  // this.$store.getters.xxx
        carCount(state){
            var total = 0;
            state.car.forEach(function (v) {
                total += parseInt(v.count); 
            })
            console.info(total);
            
            return total;
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
