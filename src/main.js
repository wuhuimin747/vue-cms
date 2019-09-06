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
    router : routerRuleObj
})
