<template>
<div class="tradingcenter_out">
    <coming></coming>
</div>
</template>

<script>
import eventBus from "@common/eventBus/eventBus";
import coming from '@components/coming/index'
export default {
    components:{
        'coming':coming
    },
	data() {
		return{}
	},
	created() {
		document.title = "交易中心 - 国家大数据专业委员会官网";
	},
	mounted() {
	
	},
	watch: {
		
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped="scoped">
.tradingcenter_out{
    // height: 100%；
}
</style>