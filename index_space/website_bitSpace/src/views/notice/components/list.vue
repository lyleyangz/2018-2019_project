<template>
	<div class="noticelist">
		<div class="article-title-list">
			<div class="nodata" v-if="listData.length <= 0">
				<div class="image"></div>
				<p class="text1">暂无内容</p>
				<p class="text2">抱歉，暂无内容查看</p>
			</div>
			<ul class="list" v-if="listData.length > 0">
                <li class="t-member" v-for="(item, index) in listData" :key="index" @click="redirect(item)">
                    <div class="image">
                        <img :src="item.imageurl" alt="">
                    </div>
                    <div class="discription">
                        <h3 class="title over1line">{{item.title}}</h3>
                        <p class="date">{{globalFun.dateFormat(item.createOn, 'yyyy-MM-dd hh:mm:ss')}}</p>
                    </div>
                </li>
			</ul>
		</div>
	</div>
</template>

<script>
import header from '@components/header/header'
import footer from '@components/footer/footer'
import { getNoticeList } from '@api/api_group.js';
export default {
	data() {
		return {
			listData: []
		}
	},
	created() {
		getNoticeList({
			channel: this.globalFun.getQueryString('page').split('#')[0] === 'affairs'? 0: 1
		}).then((res) => {
			if (res && res.success) {
				this.listData = res.data;
				this.listData.forEach((element) => {
					if (!element.imageurl || element.imageurl === '') {
						element.imageurl = require('../../../common/assets/images/defaultbg.jpg');
					}
				});
			}
		});
	},
	mounted() {

	},
	methods: {
		redirect(item) {
			if (item.link) {
				window.open(item.link, '_blank');
			} else {
				this.$router.push({
					name: 'noticeDetail',
					params: {
						id: item.id
					}
				});
			}
		}
	},
	components: {
		'com-header': header,
		'com-footer': footer
	}
}
</script>

<style lang="scss"  scoped="scoped">
	.noticelist {
		width: 100%;
		background-color: #ebebeb;
		.article-title-list {
			width: 1200px;
			min-height: 550px;
			background-color: #ffffff;
			margin: 18px auto 160px;
			padding-bottom: 120px;
			.nodata {
				width: 100%;
				padding-top: 100px;
				display: flex;
				flex-direction: column;
				align-items: center;
				.image {
					width: 67px;
					height: 77px;
					background-image: url('../../../common/assets/images/announcement_nodata.png');
				}
				.text1 {
					color: #4f5864;
					font-size: 30px;
					line-height: 30px;
					font-weight: 600;
					margin-top: 30px;
				}
				.text2 {
					color: #999999;
					font-size: 16px;
					margin-top: 18px;
				}
			}
			.list {
				width: 916px;
				margin:  16px auto;
				.t-member {
					width: 100%;
					height: 80px;
					color: #e6e8eb;
					border-bottom: 1px solid #e6e8eb;
					display: flex;
					align-items: center;
					cursor: pointer;
					.image {
						width: 60px;
						height: 60px;
						background-color: #e6e8eb;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.discription {
						margin-left: 16px;
						.title {
							height: 16px;
							line-height: 16px;
							color: #333333;
							font-size: 16px;
						}
						.date {
							color: #999999;
							line-height: 14px;
							font-size: 14px;
							margin-top: 10px;
						}
					}
				}
			}
		}
	}
</style>



