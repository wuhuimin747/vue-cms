<template>
    <div class="app_container">
        <!-- 这里是 header 区域 -->
        <mt-header fixed title="huimin的商城"></mt-header>

        <!-- 这里是 router-view 路由区域 -->
        <transition><!-- 使用滑动动画 -->
            <router-view></router-view>
        </transition>
        

        <!-- 这里是底端的 Tabar 区域 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
        
    </div>
</template>

<script>
</script>

<style lang="less" scoped>
.app_container{
    padding-top: 40px;
    padding-bottom: 50px;
    overflow: hidden;  //滑动是去掉滚动条
}

.v-enter {
    opacity : 0;
    transform : translateX(100%); 
}
.v-leave-to {
    opacity : 0; 
    transform : translateX(-100%); 
    position : absolute;
}
.v-enter-active , .v-leave-active{
    transition : all 0.5s ease;
}
</style>
