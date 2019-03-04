<template>
    <section class="footer">
		<div class="footer-top">
			<div class="page-board">
				<div class="logo"></div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="page-board">
				Copyright@ 2018-2021 国家大数据专业委员会
			</div>
		</div>
       
    </section>
</template>

<script>
export default {
	props: {},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped="scoped">
.footer {
	text-align: center;
	
	.footer-top{
		background: #000000;
		padding: 26px 0 27px 0;
	}
    .footer-bottom{
		background: #1B1B1B;
		color: #999;
		line-height: 30px;
	}
	.logo{
		background: url("./../../assets/images/bottom.png") no-repeat;
		width: 230px;
		height: 39px;
		margin: 0 auto;
	}
    
}
</style>
