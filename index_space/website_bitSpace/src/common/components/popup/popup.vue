<template>
    <div class="popup">
		<slot class="slot f-pa"></slot>
    </div>
</template>

<script>
	export default {
		created() {
			document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;');
		},
		destroyed() {
			document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: auto;');
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.popup {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999999;
		.slot {
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>