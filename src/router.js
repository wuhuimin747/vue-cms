//为了main。js简洁，将涉及到vue-router的部分挪到这里来
import VueRouter from 'vue-router';

//导入组件模板对象
import home from './components/tabbar/HomeContainer.vue'
import member from './components/tabbar/MemberContainer.vue'
import search from './components/tabbar/SearchContainer.vue'
import shopcar from './components/tabbar/ShopcarContainer.vue'
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/NewsInfo.vue'
import photolist from './components/photos/PhotoList.vue'
import photoinfo from './components/photos/PhotoInfo.vue'
import goodslist from './components/goods/GoodsList.vue'

//创建路有规则对象
var routerRuleObj = new VueRouter({
    routes : [
        {path : '/' , redirect : '/home' },  //默认进来是根路径'/'  来个路由重定向
        {path : '/home' , component : home },
        {path : '/member' , component : member },
        {path : '/search' , component : search },
        {path : '/shopcar' , component : shopcar },
        {path : '/home/newslist' , component : newslist },
        {path : '/home/newsinfo/:id' , component : newsinfo },
        {path : '/home/photolist' , component : photolist },
        {path : '/home/photoinfo/:id' , component : photoinfo },
        {path : '/home/goodslist' , component : goodslist },
    ],
    //路由高亮的类设置，使用mui提供的一个类mui-active
    linkActiveClass : 'mui-active'
})



export default routerRuleObj;