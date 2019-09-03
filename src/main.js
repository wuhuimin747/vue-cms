//console.info('ok');


import Vue from "vue";

import app from "./App.vue";

//引入min-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//引入MUI的样式文件
import './lib/mui/css/mui.css'

//根组件app , 绑定index页面的容器#app
var vm = new Vue({
    el : '#app',
    render : function (createElements) {
        return createElements(app);
        
    }
})
