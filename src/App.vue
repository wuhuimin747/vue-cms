<template>
    <div class="app_container">
        <!-- 这里是 header 区域 -->
        <mt-header fixed title="huimin的商城"></mt-header>

        <!-- 这里是 router-view 路由区域 -->
        <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">购物车</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</a>
		</nav>
        <!-- 这里是底端的 Tabar 区域 -->
        <p>123</p>
    </div>
</template>

<script>
</script>

<style scoped>
.app_container{
    padding-top: 40px;
}
</style>
