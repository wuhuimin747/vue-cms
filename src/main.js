//console.info('ok');
import Vue from "vue";

//导入根组件App.vue
import app from "./App.vue";

//引入min-ui组件
import { Header , Swipe, SwipeItem} from 'mint-ui';
Vue.component(Header.name, Header); //全局注册组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

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

//根组件app , 绑定index页面的容器#app
var vm = new Vue({
    el : '#app',
    render : function (createElements) {
        return createElements(app);

    },
    router : routerRuleObj
})
