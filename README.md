
##    使用git对本项目进行托管
### 连上github仓库的设置
1.全局设置<br>
git config --global user.name "xxxx" <br>
git config --global user.email "xxxx@qq.com"<br>

2.已有项目提交<br>
git remote add origin git@github.com:wuhuimin747/vue-cms.git<br>
git push -u origin master  (-f 表示强制)

3.基本操作
git status<br>
git add .<br>
git commit -m "code change"<br>
git push -u origin master(第一次)<br>
git push <br>


## webpack3.X的各插件的适配
```
"babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-component": "^0.10.1",
    "babel-plugin-transform-remove-strict-mode": "^0.0.2",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-stage-0": "^6.24.1",
    "css-loader": "^0.28.7",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.30.1",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "url-loader": "^0.6.2",
    "vue-loader": "^13.3.0",
    "vue-preview": "^1.0.5",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.9.3"
```

## Vue课程后知识点自检

### 1. vue基本指令
```
插值表达式{{}}  	<p>售价为{{ good.price}}</p> 可拼接，随意插值  {{'售价为' + good.price}}    
v-text	            标签指令，标签的文本节点全量替换，不可拼接. <p v-text="msg"></p>
v-html	            标签指令，全量替换文本节点，可解析字符串中的html，<p v-html="h"></p>      
v-bind / :	        属性绑定，自有属性或者自定义属性，<span :att="msg"></span>
v-on / @	        事件绑定，自有事件或者自定义事件，  @click  @change
事件描述符：            @click.stop.once.prevent     可以连着写，停止冒泡，事件处理函数执行一 次，阻止默认行（表单按钮点击默认行为是提交表单，a标签默认行为是跳转至href指向的位置）
键值描述符：         @keyup.enter   .up  .down .left .right .esc .delete .space 按这些键抬起来的时候执行处理函数
v-model	            表单元素专属，input select textarea button, 数据双向绑定，页面的v会改变m数据，m也会改变v的数据，上面的那些指令都是单向绑定，m改变v。
v-if/v-show	        控制dom的显隐，v-if是直接不渲染，v-show是加一个样式display:none;
```


### 2. 基本vue实例的创建
```
	a.如果是普通的html页面，首先要引入vue.js文件
	b.定义一个dom容器  div id="app"
	c. var vm = new Vue({
		el : '#app'   ,  //指向dom中的容器，容器范围内都可以使用vm实例的数据和方法
		data : {
			msg : '',
			list : []
		},
		methods : {
			getMsg(){},
			…
		}
	})
```	
	
### 	3. 自定义指令
```
	全局指令：v-focus
	Vue.directive('focus' , {
		mounted(d){
			d.focus();
		}
	})
	
	Vue.directive('focus' , {
		bind : function(el){  //元素绑定了指令的时机，执行该处理函数，执行一次
			
		},
		inserted : function(el){//元素背插入到dom上的时候，执行这个函数，执行一次
			el.focus();
		},
		update : function(el){//元素发生变化的时候，执行多次  是update不是updated
		
		}
	})
	
	
	私有指令：
	var vm = new Vue({
		el : '#app'   , 
		directives : {
			focus : function(d){
				d.focus();
			}
		}
	})
	组件中
	export default{
		directives : {
			focus : function(el , binding){
				d.focus();
			}
		}
		
	}
```	
### 	4. 自定义过滤器
```
全局过滤器、私有过滤器,将数据做一层包装并返回，不改变元数据
{{ date | dateformat}}
Vue.filter('dateformat', function(data , param){  //第一个参数永远是管道符前面的数值
	return  …..;
})
```
### 	5. vue生命周期函数
```
	可以放在vm实例里面，可以放在组件里面
	beforeCreate  
	created    实例中的data和methods刚准备好
	beforeMount     
	mounted        模板刚渲染到页面上
	beforeUpdate   data发生了变化， v页面上还没变化
	updated        data发生了变化，v页面上也同步变化了
	beforeDestroy
	destroyed     vm实例完全销毁了
```	
### 	6. MVVM模型的含义
```
m指的是数据，对应data{}  , v指的是页面上的dom ,  vm是一个桥梁， 沟通数据和页面元素的读写。页面v想要申请m里的数据，就向vm实例发读请求，vm从m里找到数据交给v ， m中的数据发生了变化，通过vm改变页面上的展示。v是个表单元素，想要修改数据，同样发送写请求给vm，vm来改变对应的m中的数据。
```


### 	7. 自定义组件
```
	全局组件或者是私有组件
	Vue.component('my_com' , {
		template : '<h1>标题</h1>'
	}) 
	
	var vm = new Vue({
		components : {
			my_com : {
				template : '<h1>标题</h1>'
			}
		}
	})
	
	或者把模板对象拿出来放外面：
	
	var tmp = {
		template : '<h1>标题</h1>'
	}
	Vue.component('my_com' , tmp )
	
	或者直接写在body里面，通过选择器来获取
	<template id="tmp">
		<h1>标题</h1>
	</template>
	Vue.component('my_com' , {
		template : '#tmp'
	})
	
	
	私有组件：
	var my_com = {  //组件模板对象
		template : '#tmp'
	}
	var vm = new Vue({
		components : {
			my_com : my_com  //把组件模板对象注册到实例上
	})  
	<my_com></my_com>
	
	.vue的组件里面是三段式结构，然后通过export导出为一个对象，然后被其他实例引入，注册到自己身上
	export default{
		data(){
			return {}  //组件里面的data一定return一个对象， 因为如果是直接的对象，可能被多次注册之后，多个组件干扰同一个对象
		}
	}
	
	
	普通组件占位符<component :is="my_com"></component>, 用于在一个位置切换组件
```	
### 	8. 父子组件互相传值，父组件向子组件传函数
```	
	<div id="app">
		<my_com  :msg="parentMsg"></my_com>   //parentMsg是父组件的数据
	</div>//msg是自定义属性，普通属性想用data数据，就得v-bind
	
	子组件里面加一个props ： ['msg'] 接收一下来自父组件的属性，然后就能像data里面的数据一样用了
	
	
	<div id="app">
		<my_com  @my_event="funcFromParent"></my_com>   //funcFromParent是父组件的函数
	</div>
	
	子组件调用函数的方法  this.$emit('my_event'   ,  函数参数)  ; 通过调用父组件的函数可以向父组件传值
```	
	
### 	9. vue-router 路由的基本使用
```
引入vue-router.js ， 建立路由规则对象 ， 定义好路由要用到的组件  ， 吧路由规则对象注册到vm实例上 ，  写好对应的router-link跳转链接  和  router-view占位坑
var routerRuleObj = new VueRouter({
	routes : [
		{ path : '/' , redirect : '/home' } ,  //路由重定向
		{ path : '/home/news' , component : news},
		{ path : '/home/photos' , component : photos ， name ：'photo'},
		{ path : '/home/login' , children : [
			{ path : 'register' , component : register},  //子路由前面不要加斜杠，是相对路径
			{ path : 'happy' , component : happy},
		]}
		
	]
})

var vm  = new Vue({
            el : '#app',
            data:{

            },
            methods:{

            },
            router:routerRuleObj  //这里vue实例多一个属性router，配上路由规则对象
        })


<router-link to="/home/login/register"    tag="div">嘻嘻</router-link>  //渲染为div标签，默认是a标签

全量替代dom中的占位符
<router-view>我是默认的路由占位符</router-view>
<router-view  name="login">我是命名的路由占位符</router-view>


子路由是怎么布局的，一个路由对应多个组件的
				   routes : [
				                {
				                    path : '/' , components : {
				                        'default' : header, //没名字的占位符router-view叫default
				                        'left' : left,
				                        'main' : main
				                    }
				                }
				            ]

路由的嵌套，就是一个路由对应的组件内部还有router-link路由的
routes :[
                {
                    path : '/account' , 
                    component : account ,
                    children : [ //子路由规则  /表示绝对路径  不加/表示相对路径
                        {path : 'login' , component : login},   //这里的路径不能加斜杠，否则就变成了根路径下的/login了
                        {path : 'register' , component : register}
                    ]
                }
            ]
```


### 	10. vue实例中的几个$开头的数据
```
this.$route.path   .params  .query  表示当前的url路由的路径  路由规则里面写/home/login/:id ，实际的路由/home/login/88 参数.params.id就能找到  /home/login?name=wuhuimin查询参数 .query.name就能找到

this.$refs.xxx   dom元素的引用，组件实例的引用。<imput ref="m">  能找到dom  <my_com ref="com"></my_com>能找到组件，顺藤摸瓜找到组件的data  methods等等

this.$router  编程式导航，可以改变当前的路由，相当于<router-link>
有好几种写法   this.$router.push({ name : '在路有规则对象里面定义的路径名'  ,  params : {a : 1 , b :1} })

this.$store   vuex状态管理器的  公共数据仓库   有state 放数据   mutations放修改数据的管理员方法  有getters读取包装后的数据
```

### 	11. watch   computed  属性的使用
```
watch ： {
	msg : function（newval , oldval）{
		//监视data中的数据的变化
	},
	'$route.path' : funtion(){
		//监听路由路径的变化
	} 
}
watch可以时刻监听关注的数据的变化，可多次执行处理函数，一变就进来执行，参数有新值和旧值

computed 计算属性，必须返回一个值，用的时候和data里面的数据一样用，但有一点很厉害，就是计算属性用到的数据一旦发生变化，就会重新计算，计算值会跟着变
data : { firstName : 'wu' , lastName : 'huimin'},
computed : {
	finalName : function(){
		return this.firstName  + this.lastName 
	}
}

全名是{{finalName}}
```
### 	12. vue-resource的使用，异步请求服务器数据
```
	先引入vue-resource的包或者咋工程化里面npm装一下 ，然后在main.js里面import一下
	看官方的api文档，  get请求基本上就是  this.$http.get('').then()
	post请求基本上是 this.$http.post('' , {传递的对象} ，{'emulateJSON': 'application/x-www-form-urlencoded'}).then() 用表单提交的格式传输数据
	或者在全局配置一下Vue.http.options.emulateJSON = true;
```
### 	13. webpack的打包原理
```
	打包的目的是为了将高级的js语法编译成低级的浏览器可以解析的语法，把前端资源文件.css   .less  .scss  .js   .jpg  .png  .eot  等资源文件打包放在一个文件里面，all  in  one ，所以最终生成的文件就是一个index。html和一个bundle.js文件，不依赖别的文件，解决了过去工程中一大堆文件相互依赖的问题。有时候webpack自己解析不了某些格式的文件，需要第三方加载器来干这个活儿，css-loader , less-loader  , url-loader。
	在开发的时候每次修改一点，就得重新打包，很麻烦，所以在开发是时候引入一个插件嫩动态打包，叫 webpack-dev-server       ,  这玩意儿生成的bundle.js文件是放在内存里面的，所以访问很快。
	//test.js向外暴露默认的成员,ES6语法
	var info = {name : 'wuhuimin' , age : 17}
	export default info;
	//向外暴露其他的成员
	export var title = {production : '产品锦鲤'};
	export var price = 123;
	
	//main.js 导入别的默认尘缘名字随便,ES6语法
	import test from './test.js'; 
	import {title , price} from './test.js'; //非默认成员，名字得一致
```	
### 	14. webpack.config.js里面的基本配置和src文件夹布局
```
	src放源码，dist放打包好的发布的产品文件bundle.js,  src底下放index.html  main.js   App.vue  router.js   barbel   .gitignore  node_mudules  components   libs  images
	
	基本配置:
	使用node语法写打包的入口文件main.js  和出口文件bundle.js  引入各种第三方加载器，把各种webpack解析不了的后缀文件配置好对应的加载器
	
	在package.json里面写上 启动hot热部署的配置 
```    
### 	15. vuex状态管理器的用处和使用方法
```
vuex的目的是解决父子组件之间 、 祖孙组件之间 、 不相干组件之间传值的问题，解决方案是吧一些大家都用到的公共数据放在一个store仓库里面，然后在mutations里面提供一些操作仓库数据的方法，在getters里面提供一些数据包装的读取方法，第一好store变凉以后，注册到跟实例上，就像注册router一样，这样全局的各个组件都鞥使用store仓库里的数据了，写操作也是可以做到的。

var store = new Vuex.Store({
	state : {
	//仓库数据
		car : []
	},
	mutations : {
	//写方法
		addTocar(state){   //第一个参数默认是state仓库数据
			…
		}
	},
	getters : {
	//读方法，state数据包装，类似filter
	}
})

组件使用这些数据的方法是：
state  : this.$store.state.car
mutations  :   this.$store.commit('addTocar' , /*唯一参数*/) 这么使用就像是给仓库管理员提交写申请一样，让数据不会乱。
getters  : this.$store.getters.xxx


需要注意的一点是，如果在表单元素的v-model=“xx”这个位置里面绑定了仓库里的state数据，不会改变state里的值,一般这里使用的是getters里的方法，双向绑定的是getters里面新建并返回的对象或数组之流。所以页面上的变化，会导致这个数值的变化。

```