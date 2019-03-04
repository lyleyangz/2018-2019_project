<template>
	<div id="app" class="f-pr" :class="$i18n.locale">
		<div class="riseandfall-outer">
			<riseAndFall :exchangeType="exchangeType" ref="riseAndFall" class="riseandfall"></riseAndFall>
		</div>
		<div class="header-outer f-pr">
			<com-header class="com-header" :currentPage="'index'" :styleClass="headerStyle" :isLogin="isLogin"></com-header>
		</div>
		<div class="nest-area f-pr">
			<transition name="scrollRight">
				<div class="login-box-wraper f-pa" v-if="loginBoxVisible">
					<login-box class="login-box"></login-box>
				</div>
			</transition>
			<div class="banner">
				<div class="hswiper-container">
					<div class="swiper-wrapper carousel">
						<div class="swiper-slide f-pr CarouselItem">
							<img class="image" src="../../common/assets/images/ZHS/banner-f.jpg" alt="" v-if="$i18n.locale === 'ZHS'">
							<img class="image" src="../../common/assets/images/ZHT/banner-f.jpg" alt="" v-if="$i18n.locale === 'ZHT'">
							<img class="image" src="../../common/assets/images/ENG/banner-f.jpg" alt="" v-if="$i18n.locale === 'ENG'">
						</div>
						<div class="swiper-slide f-pr CarouselItem">
							<img class="image" src="../../common/assets/images/ZHS/banner-a.jpg" alt="" v-if="$i18n.locale === 'ZHS'">
							<img class="image" src="../../common/assets/images/ZHT/banner-a.jpg" alt="" v-if="$i18n.locale === 'ZHT'">
							<img class="image" src="../../common/assets/images/ENG/banner-a.jpg" alt="" v-if="$i18n.locale === 'ENG'">
						</div>
						<div class="swiper-slide f-pr CarouselItem">
							<img class="image" src="../../common/assets/images/ZHS/banner-b.jpg" alt="" v-if="$i18n.locale === 'ZHS'">
							<img class="image" src="../../common/assets/images/ZHT/banner-b.jpg" alt="" v-if="$i18n.locale === 'ZHT'">
							<img class="image" src="../../common/assets/images/ENG/banner-b.jpg" alt="" v-if="$i18n.locale === 'ENG'">
						</div>
						<div class="swiper-slide f-pr CarouselItem">
							<img class="image" src="../../common/assets/images/ZHS/banner-c.jpg" alt="" v-if="$i18n.locale === 'ZHS'">
							<img class="image" src="../../common/assets/images/ZHT/banner-c.jpg" alt="" v-if="$i18n.locale === 'ZHT'">
							<img class="image" src="../../common/assets/images/ENG/banner-c.jpg" alt="" v-if="$i18n.locale === 'ENG'">
						</div>
						<div class="swiper-slide f-pr CarouselItem">
							<img class="image" src="../../common/assets/images/ZHS/banner-e.jpg" alt="" v-if="$i18n.locale === 'ZHS'">
							<img class="image" src="../../common/assets/images/ZHT/banner-e.jpg" alt="" v-if="$i18n.locale === 'ZHT'">
							<img class="image" src="../../common/assets/images/ENG/banner-e.jpg" alt="" v-if="$i18n.locale === 'ENG'">
						</div>
					</div>
					<!-- 如果需要导航按钮 -->
					<div class="swiper-button-prev swiper-button-white"></div>
					<div class="swiper-button-next swiper-button-white"></div>
				</div>
			</div>
		</div>
		<div class="price-area-outer f-cb" ref="priceAreaOuter">
			<div class="price-area-wraper typepage f-pr f-cb" ref="priceAreaWraper">
				<div class="price-area f-pa f-cb" ref="priceArea">
					<ul class="extypelist">
						<li class="ex-member" v-for="(item, index) in exchangeType" :key="index" :class="item" @click="currentEXType = item">
							<div class="ex-member-inner f-pr"   :class="{active: currentEXType === item}">
								<span class="line f-pa f-db"></span>
								<span class="icon f-db"></span>
								<span class="text" v-if="item !== 'selfSelection'">{{`${item}${$t('homePage.tradingPost')}`}}</span>
								<span class="text" v-else>{{$t('homePage.optional')}}</span>
								<span class="bline f-pa f-db"></span>
							</div>
						</li>
					</ul>
					<ul class="title-list f-cb">
						<li class="title-member f-fl">
							<label>{{$t('homePage.coinName')}}</label>
							<div class="upanddown-outer f-dib f-pr">
								<div class="upanddown f-pa">
									<span class="up f-db" @click="arrangeRule = 'coinNameUp'" :class="{active: arrangeRule === 'coinNameUp'}"></span>
									<span class="down f-db" @click="arrangeRule = 'coinNameDown'" :class="{active: arrangeRule === 'coinNameDown'}"></span>
								</div>
							</div>
						</li>
						<li class="title-member f-fl">
							<label>{{`${$t('homePage.NewCurrentRate')}`}} <span v-if="currentEXType !== 'selfSelection'">({{currentEXType}})</span></label>
							<div class="upanddown-outer f-dib f-pr">
								<div class="upanddown f-pa">
									<span class="up f-db"  @click="arrangeRule = 'priceUp'" :class="{active: arrangeRule === 'priceUp'}"></span>
									<span class="down f-db"  @click="arrangeRule = 'priceDown'" :class="{active: arrangeRule === 'priceDown'}"></span>
								</div>
							</div>
						</li>
						<li class="title-member f-fl">
							<label>{{`${$t('homePage.hour24TurnVolume')}`}} <span v-if="currentEXType !== 'selfSelection'">({{currentEXType}})</span></label>
							<div class="upanddown-outer f-dib f-pr">
								<div class="upanddown f-pa">
									<span class="up f-db"  @click="arrangeRule = 'volumeUp'"  :class="{active: arrangeRule === 'volumeUp'}"></span>
									<span class="down f-db"  @click="arrangeRule = 'volumeDown'" :class="{active: arrangeRule === 'volumeDown'}"></span>
								</div>
							</div>
						</li>
						<li class="title-member f-fl">
							<label>{{$t('homePage.hour24Volume')}}</label>
						</li>
						<li class="title-member f-fl">
							<label>{{$t('homePage.dayHighsLows')}}</label>
							<div class="upanddown-outer f-dib f-pr">
								<div class="upanddown f-pa">
									<span class="up f-db"  @click="arrangeRule = 'amplitudeUp'"  :class="{active: arrangeRule === 'amplitudeUp'}"></span>
									<span class="down f-db"  @click="arrangeRule = 'amplitudeDown'"  :class="{active: arrangeRule === 'amplitudeDown'}"></span>
								</div>
							</div>
						</li>
						<li class="title-member f-fl">

						</li>
					</ul>
					<ul class="val-list f-cb" v-if="kInfoData[currentEXType]">
						<li class="val-member" v-for="(item, index) in kInfoData[currentEXType]" :key="index">
							<div class="val-m-member">
								<span class="choosebtn" :class="{bechoose: item.selfSelection}" @click="changeOptionalStatus(item)"></span>
								<i class="logo" :class="item.name.split('/')[0]"></i>
								<span class="name">{{currencyList[item.name.split('/')[0]]  | currencyName}} {{item.name}}</span>
							</div>
							<div class="val-m-member">{{item.current.split('/')[0] | formatFloat(decimalDigits.contractType[item.contractType].price)}}<span class="cny"> / {{item.current.split('/')[1]}}</span></div>
							<div class="val-m-member">{{item.account | formatFloat(decimalDigits.contractType[item.contractType].volume)}}</div>
							<div class="val-m-member">{{item.qty | formatFloat(decimalDigits.contractType[item.contractType].amount)}}</div>
							<div class="val-m-member" :class="item.colorClass">{{item.change}}</div>
							<div  class="val-m-member">
								<div class="button f-pr" v-if="!coldingCurrencyList.contractType.includes(item.contractType)"><span class="bg f-pa"></span><span class="text f-pa f-db" @click="redirect(item, currentEXType)">{{$t('homePage.goBusiness')}}</span></div>
								<div class="button colding f-pr" v-if="coldingCurrencyList.contractType.includes(item.contractType)"><span class="bg f-pa"></span><span class="text f-pa f-db" @click="redirect(item, currentEXType, true)">{{$t('homePage.goBusiness')}}</span></div>
							</div>
						</li>
					</ul>
					<div class="nodata" v-if="!kInfoData[currentEXType] || kInfoData[currentEXType].length <= 0">
						{{$t('homePage.noData')}}
					</div>
				</div>
			</div>
		</div>
		<div class="bridf-outer">
			<div class="outer-title"></div>
			<ul class="bridf">
				<li class="bridf-member f-fl reveal-right-1">
					<div class="image"></div>
					<p class="title">{{$t('homePage.bridfDataOneTitleOne')}}</p>
					<p class="param">{{$t('homePage.bridfDataOneParam1')}}</p>
					<p class="param">{{$t('homePage.bridfDataOneParam2')}}</p>
				</li>
				<li class="bridf-member f-fl reveal-right-2">
					<div class="image"></div>
					<p class="title">{{$t('homePage.bridfDataOneTitleTwo')}}</p>
					<p class="param">{{$t('homePage.bridfDataTwoParam1')}}</p>
					<p class="param">{{$t('homePage.bridfDataTwoParam2')}}</p>
				</li>
				<li class="bridf-member f-fl reveal-right-3">
					<div class="image"></div>
					<p class="title">{{$t('homePage.bridfDataTitleThree')}}</p>
					<p class="param">{{$t('homePage.bridfDataThreeParam1')}}</p>
					<p class="param">{{$t('homePage.bridfDataThreeParam2')}}</p>
				</li>
				<li class="bridf-member f-fl reveal-right-4">
					<div class="image"></div>
					<p class="title">{{$t('homePage.bridfDataTitleFour')}}</p>
					<p class="param">{{$t('homePage.bridfDataFourParam1')}}</p>
					<p class="param">{{$t('homePage.bridfDataFourParam2')}}</p>
				</li>
			</ul>
		</div>
		<div class="adbanner-outer">
			<img src="../../common/assets/images/ZHS/app.png" alt="" class="adbanner" v-if="$i18n.locale === 'ZHS'">
			<img src="../../common/assets/images/ZHT/app.png" alt="" class="adbanner" v-if="$i18n.locale === 'ZHT'">
			<img src="../../common/assets/images/ENG/app.png" alt="" class="adbanner" v-if="$i18n.locale === 'ENG'">
		</div>
		<div class="links-outer">
			<div class="links">
				<div class="title"></div>
				<ul class="list">
					<li class="t-member">
						<a href="text_info.html#/noviceGuide" target="_blank">> {{$t('homePage.noviceGuide')}}</a>
					</li>
					<li class="t-member">
						<a href="text_info.html#/commonQuestion" target="_blank">> {{$t('homePage.commonQuestion')}}</a>
					</li>
					<li class="t-member">
						<a href="text_info.html#/costDescription" target="_blank">> {{$t('homePage.costExplain')}}</a>
					</li>
					<li class="t-member">
						<a href="">> {{$t('homePage.currentRule')}}</a>
					</li>
					<li class="t-member">
						<a href="">> {{$t('homePage.APIjoggle')}}</a>
					</li>
				</ul>
			</div>
		</div>
		<com-footer></com-footer>
	</div>
</template>

<script>
import header from '@components/header/header';
import footer from '@components/footer/footer';
import riseAndFall from '@components/riseAndFall_top/riseAndFall_top';
import loginBox from '@components/login_box/login_box';
import eventBus from '@common/eventBus/eventBus';
import { getKinfoList, getNotice, getCurrencyList, addOptional, deleteOptional } from '@api/api_group';
import contractTypeGroup from '@common/settings/contractTypeGroup';
import decimalDigits from '@common/settings/decimalDigits';
import coldingCurrencyList from '@common/settings/coldingCurrencyList';
import scrollReveal from 'scrollReveal';
import { Page, Message } from 'iview';
import md5 from '../../common/assets/js/md5';
import Swiper from '@common/assets/js/swiper.js';
export default {
    data() {
        return {
			convertingFont: false,
			headerStyle: 'dark',
			bannerSwiper: {},
            isLogin: localStorage.getItem('YJS_isLogin') === 'true'
                ? true
				: false,
			loginBoxVisible: false,	
			exchangeType: ['BTC','ETH','selfSelection'],
			currentEXType: 'BTC',
			currencyList: [],
			messageTypeList: [],
			kInfoData: {BTC: []},
			middleKinfoData: {},
			contractTypeGroup: contractTypeGroup,
			decimalDigits: decimalDigits,
			coldingCurrencyList: coldingCurrencyList,
			arrangeRule: '', // coinNameUp/coinNameDown/priceUp/priceDown/volumeUp/volumeDown/amplitudeUp/amplitudeDown
			requestFlag: true,
			scrollReveal: scrollReveal()
        };
    },
    created() {
		eventBus.$on('convertFont', () => {
			setTimeout(() => {
				this.convertingFont = true;
			}, 300);
			setTimeout(() => {
				this.convertingFont = false;
			}, 600);
		});
		eventBus.$on('showLoginBox', () => {
			this.loginBoxVisible = true;
		});
		eventBus.$on('convertFont', () => {
			document.title = this.$t('homePage.pageTitle');
		});
		// 接受从顶部滚动栏传来的数据
		eventBus.$on('riseAndFallUpdate', (data) => {
			// 若未登陆，要读取localstorage中的记录，标出自选项
			if (!this.isLogin) {
				let optionalArr = localStorage.getItem('YJS_optionalArr')? JSON.parse(localStorage.getItem('YJS_optionalArr')): [];
				for (let i in data) {
					if (i !== 'selfSelection') {
						data[i].forEach((element) => {
							if (optionalArr.includes(element.contractType)) {
								element.selfSelection = true;
								data.selfSelection.push(element);
							}
						});
					}
				}
			}
			this.middleKinfoData = JSON.parse(JSON.stringify(data));
			this.kInfoData = this.arrangeRule === ''? data: this.arrangeData(data, this.arrangeRule);
			this.$nextTick(() => {
				this.initPriceAreaHeight();
			});
		});
		this.getCurrencyList();
	},
    mounted() {
		this.watchStcoll();
		setTimeout(() => {
			this.$nextTick(() => {
				this.initReveal();
				this.initSwiper();
			});
		}, 200);

    },
    methods: {
		// 货币类型
        getCurrencyList(callback) {
            getCurrencyList().then(res => {
                if (res && res.data) {
                    this.currencyList = res.data;
                }
            });
        },
		// watchScroll
		watchStcoll() {
			const scrollHandler = (callback) => {
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				if (scrollTop > 100) {
					this.headerStyle = 'light';
				} else {
					this.headerStyle = 'dark';
				}
			}
			window.addEventListener('scroll', this.globalFun.throttle(50, false,() => {
				scrollHandler();
			},));
		},
		// 计算价格模块高度
		initPriceAreaHeight() {
			let height = this.$refs.priceArea.offsetHeight;
			this.$refs.priceAreaOuter.setAttribute('style', `height: ${height - 176}px`);
		},
		// 初始化scrollreveal
		initReveal() {
            this
                .scrollReveal
                .reveal('.reveal-right-1', {
                    duration: 500,
                    origin: 'right',
					distance: '200px',
					easing: 'linear',
					delay: 0,
					opacity: 0,
                    reset: true
                });

           this
                .scrollReveal
                .reveal('.reveal-right-2', {
                    duration: 500,
                    origin: 'right',
					distance: '200px',
					easing: 'linear',
					delay: 500,
                    reset: true
                });
			this
                .scrollReveal
                .reveal('.reveal-right-3', {
                    duration: 500,
                    origin: 'right',
					distance: '200px',
					easing: 'linear',
					delay: 1000,
                    reset: true
                });
			this
                .scrollReveal
                .reveal('.reveal-right-4', {
                    duration: 500,
                    origin: 'right',
					distance: '200px',
					easing: 'linear',
					delay: 1500,
                    reset: true
                });		

		},
		// 跳转
		redirect(item, currentEXType, colding = false) {
			console.log(colding);
			if (colding) {
				Message.warning(this.$t('homePage.coldingTip'));
			} else {
				location.href = `./exchange.html?currentExType=${currentEXType}&currentConType=${item.contractType}`;
			}
		},
		initSwiper(){
			this.bannerSwiper = new Swiper('.hswiper-container', {
				effect: 'fade',
				autoplay: {
					disableOnInteraction: false,
					delay: 3000
				},
				speed: 1000,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				
				// 如果需要滚动条
				scrollbar: '.swiper-scrollbar',
			});
		},
		// 改变是否选中状态
		changeOptionalStatus(item) {
			let mItem = Object.assign({}, item);
			// 为了效果立刻更新当前数据
			this.kInfoData[this.currentEXType].forEach((element) => {
				if (element.contractType === item.contractType) {
					element.selfSelection = !element.selfSelection;
				}
			});
			// 所有操作需要对自选页面进行更新
			if (this.currentEXType === 'selfSelection') {
				let kArr = [];
				this.kInfoData['selfSelection'].forEach(element => {
					if (element.selfSelection) {
						kArr.push(element);
					}
				});
				this.kInfoData.selfSelection = kArr;
			}
			const setOptionalToStorage = () => {
				let arr = [];
				for (let i in this.kInfoData) {
					if (i !== 'selfSelection') {
						this.kInfoData[i].forEach((element) => {
							if (element.selfSelection) {
								arr.push(element.contractType);
							}
						});
					}
				}
				localStorage.setItem('YJS_optionalArr', JSON.stringify(arr));
			}
			// 已被选中转成未选
			if (!mItem.selfSelection) {
				// 若登录了，向后台发送请求添加，若未登陆，向storage中添加
				if (this.isLogin) {
					addOptional({
						contractTypes: mItem.contractType
					}).then((res) => {
						if (res && res.success) {}
					});
				} else {
					setOptionalToStorage();
				}
			} else {
				if (this.isLogin) {
					deleteOptional({
						contractTypes: mItem.contractType
					}).then((res) => {
						if (res && res.success) {}
					});
				} else {
					setOptionalToStorage();
				}
			}
			
			
		},
		// 按规则排列数据
		arrangeData(data, rule) {
			let mData = JSON.parse(JSON.stringify(data));
			// 对比方法
			function compare(property, type){
				switch(type) {
					case '1': 
						return function(a, b){
							var value1 = a[property] - 0;
							var value2 = b[property] - 0;
							return (value1 - value2);
						};
					
					case '2': 
						return function(a, b){
							var value1 = a[property][0].charCodeAt(0);
							var value2 = b[property][0].charCodeAt(0);
							return value1 - value2;
						};
					
					case '3': 
						return function(a, b){
							var value1 = a[property].split('/')[0];
							var value2 = b[property].split('/')[0];
							return value1 - value2;
						};
					case '4': 
						return function(a, b){
							var value1 = a[property].split('%')[0];
							var value2 = b[property].split('%')[0];
							return value1 - value2;
						};
					
				}
			}
			switch(rule) {  // coinNameUp/coinNameDown/priceUp/priceDown/volumeUp/volumeDown/amplitudeUp/amplitudeDown
				case 'coinNameUp':
					for (let i in mData) {
						mData[i].sort(compare('name', '2'))
					}
					return mData;
				case 'coinNameDown':
					for (let i in mData) {
						mData[i].sort(compare('name', '2')).reverse();
					}
					return mData;
				case 'priceUp':
					for (let i in mData) {
						mData[i].sort(compare('current', '3'));
					}
					return mData;
				case 'priceDown':
					for (let i in mData) {
						mData[i].sort(compare('current', '3')).reverse();
					}
					return mData;
				case 'volumeUp':
					for (let i in mData) {
						mData[i].sort(compare('account', '1'));
					}
					return mData;
				case 'volumeDown':
					for (let i in mData) {
						mData[i].sort(compare('account', '1')).reverse();
					}
					return mData;
				case 'amplitudeUp':
					for (let i in mData) {
						mData[i].sort(compare('change', '4'));
					}
					return mData;	
				case 'amplitudeDown':
					for (let i in mData) {
						mData[i].sort(compare('change', '4')).reverse();
					}
					return mData;
				default:
					break;
			}
		}
	},
	watch: {
		arrangeRule(newVal, oldVal) {
			this.kInfoData = this.arrangeData(this.middleKinfoData, newVal);
		}
	},
    components: {
        'com-header': header,
        'login-box': loginBox,
		'com-footer': footer,
		Page,
		riseAndFall
    }
}
</script>

<style lang="scss"  scoped="scoped">
	#app {
		width: 100%;
		min-height: 100%;
		background-color: #f8fbfe;
		.header-outer {
			z-index: 99999;
		}
		.nest-area {
			height: 862px;
			padding-top: 30px;
			z-index: 0;
			.login-box-wraper {
				right: 280px;
				top: 19.5%;
				z-index: 999;
			}
			.banner {
				height: 100%;
				.hswiper-container {
					width: 100%;
					height: 100%;
					.image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.price-area-outer {
			width: 100%;
			background-color: #ffffff;
			.price-area-wraper {
				margin: 0 auto;
				left: 0;
				top: -180px;
				background-color: #ffffff;
				.price-area {
					width: 100%;
					background-color: #ffffff;
					box-shadow: 0px 5px 30px #f8f8f8;
					.extypelist {
						width: 100%;
						height: 70px;
						display: flex;
						border-bottom: 1px solid #dddddd;
						.ex-member {
							width: 190px;
							height: 100%;
							.ex-member-inner {
								width: 100%;
								height: 100%;
								display: flex;
								justify-content: center;
								align-items: center;
								cursor: pointer;
								box-sizing: border-box;
								.icon {
									width: 48px;
									height: 48px;
									transition: background-image 0.5s;
								}
								.text {
									font-size: 16px;
									color: #999999;
									transition: color 0.5s;
									margin-left: 14px;
								}
								.line {
									width: 190px;
									height: 3px;
									left: 0;
									top: 0;
									background-color: transparent;
									transition: background-color 0.5s;
								}
								.bline {
									width: 190px;
									height: 1px;
									left: 0;
									bottom: -1px;
									background-color: transparent;
									transition: background-color 0.5s;
								}
							}
							.active {
								border-left: 1px solid #dddddd;
								border-right: 1px solid #dddddd;
							}
							&:first-child {
								.active {
									border-left: none;
								}
							}
							&.BTC {
								.icon {
									background-image: url('../../common/assets/images/btc-b.png');
								}
								.active {
									.icon {
										background-image: url('../../common/assets/images/btc-a.png');
									}
									.text {
										color: #333333;
									}
									.line {
										background-color: #ff8a00;
									}
									.bline {
										background-color: #ffffff;
									}
								}
							}
							&.ETH {
								.icon {
									background-image: url('../../common/assets/images/ETH-b.png');
								}
								.active {
									.icon {
										background-image: url('../../common/assets/images/ETH-a.png');
									}
									.text {
										color: #333333;
									}
									.line {
										background-color: #ff8a00;
									}
									.bline {
										background-color: #ffffff;
									}
								}
							}
							&.selfSelection {
								.icon {
									background-image: url('../../common/assets/images/optional-b.png');
								}
								.active {
									.icon {
										background-image: url('../../common/assets/images/optional-a.png');
									}
									.text {
										color: #333333;
									}
									.line {
										background-color: #ff8a00;
									}
									.bline {
										background-color: #ffffff;
									}
								}
							}
						}
					}
					.title-list {
						width: 100%;
						height: 50px;
						margin-top: 26px;
						margin-bottom: 9px;
						display: flex;
						padding: 0 40px;
						border-bottom: 1px solid #dddddd;
						.title-member {
							flex: 1;
							height: 50px;
							line-height: 50px;
							color: #333333;
							font-size: 14px;
							&:first-child {
								label{
									margin-left: 25px;
								}
							}
							&:nth-child(2) {
								text-indent: 4.5%;
							}
							&:nth-child(3) {
								text-indent: 5%;
							}
							&:nth-child(4) {
								text-indent: 5.5%;
							}
							&:nth-child(5) {
								text-indent: 7%;
							}
							.upanddown-outer {
								width: 9px;
								height: 100%;
								margin-left: 3px;
								vertical-align: middle;
								.upanddown {
									width: 100%;
									height: 12px;
									left: 0;
									top: 48%;
									transform: translateY(-50%);
									.up {
										width: 9px;
										height: 5px;
										background-image: url('../../common/assets/images/up-b.png');
										cursor: pointer;
										margin-bottom: 2px;
										&.active {
											background-image: url('../../common/assets/images/up-a.png');
										}
									}
									.down {
										width: 9px;
										height: 5px;
										background-image: url('../../common/assets/images/down-b.png');
										cursor: pointer;
										&.active {
											background-image: url('../../common/assets/images/down-a.png');
										}
									}
								}
							}
							
						}
					}
					.val-list {
						width: 100%;
						 min-height: 100px;
						.val-member {
							color: #333333;
							font-size: 14px;
							display: flex;
							margin: 0 40px;
							border-top:1px dashed #ddd;
							&:hover {
								background-color: #f8f9fa;
							}
							&:nth-child(1){
								border-top:0;
							}
							.val-m-member {
								flex: 1;
								height: 54px;
								line-height: 54px;
								.cny {
									color: #999999;
								}
								&:nth-child(1) {
									display: flex;
									align-items: center;
									.choosebtn {
										width: 14px;
										height: 14px;
										border: 1px solid #cccccc;
										border-radius: 50%;
										margin-right: 10px;
										cursor: pointer;
										&.bechoose::after {
											content: '';
											display: block;
											width: 10px;
											height: 10px;
											border-radius: 50%;
											background-color: #ff8a00;
											margin: 1px auto;
										}
									}
									.icon {
										width: 24px;
										height: 24px;
										
									}
									.ETH{
										margin: 0 0 0 4px;
									}
									.name {
										margin-left: 10px;
									}
								}
								&:nth-child(2) {
									text-indent: 4.5%;
								}
								&:nth-child(3) {
									text-indent: 5%;
								}
								&:nth-child(4) {
									text-indent: 5.5%;
								}
								&:nth-child(5) {
									text-indent: 6%;
								}
								&:nth-child(6) {
								
									.button {
										width: 112px;
										height: 28px;
										font-size: 14px;
										border: 1px solid #ff8a00;
										border-radius: 4px;
										cursor: pointer;
										float: right;
    									margin-top: 14px;
										.text {
											width: 100%;
											height: 100%;
											line-height: 25px;
											text-align: center;
											color: #ff8a00;
											transition: color 0.5s;
											z-index: 999;
										}
										.bg {
											width: 0;
											height: 28px;
											border-radius: 4px;
											background-color: #ff8a00;
											left: 0;
											top: 0;
											transition: width 0.5s;
										}
										&:hover {
											.text {
												color: #ffffff;
											}
											.bg {
												width: 112px;
											}
										}
										&.colding {
											border: none;
											border-radius: 4px;
											.text {
												border: 1px solid #eee;
												background-color: #eee;
												color: #fff;
												border-radius: 4px;
											}
											.bg {
												border: 1px solid #eee;
												background-color: #eee;
												color: #fff;
												border-radius: 4px;
											}
										}
									}
								}
							}
						}
					}
					.nodata {
						width: 100%;
						height: 150px;
						line-height: 150px;
						font-size: 14px;
						text-align: center;
					}
				}
			}
		}
		.bridf-outer {
			width: 100%;
			background-color: #ffffff;
			overflow: hidden;
			.outer-title{
				width: 677px;
				height: 111px;
				margin: 106px auto 66px auto;
				background-image: url('../../common/assets/images/our-services.png');
			}
			.bridf {
				width: 1200px;
				height: 330px;
				margin: 0 auto 134px auto;
				.bridf-member {
					width: 276px;
					height: 100%;
					display: flex;
					flex-direction: column;
					// justify-content: center;
					align-items: center;
					margin-left: 32px;
					.image {
						width: 78px;
						height: 78px;
						margin: 46px 0 60px 0;
						display:inline-block;
						background-repeat: no-repeat; 
					}
					.title {
						line-height: 60px;
						font-size: 22px;
						font-weight: 700;
						color: #fff;
						line-height: 24px;
						margin-bottom: 36px;
						text-align: center;
					}
					.param {
						line-height: 20px;
						font-size: 12px;
						color: #fff;
						transform:scale(0.95);
						text-align: center;
					}
					&:nth-child(1) {
						border:1px solid #f9be31;
						background-color: #f9be31;
						.image {
							background-image: url('../../common/assets/images/global.png');
						}
					}
					&:nth-child(2) {
						border:1px solid #eee;
						.title {
							color: #333;
						}
						.param {
							color: #999;
						}
						.image {
							
							background-image: url('../../common/assets/images/industry.png') ;
						}
					}
					&:nth-child(3) {
						border:1px solid #8E77F0;
						background-color: #8E77F0;
						.image {
							background-image: url('../../common/assets/images/diversification.png');
						}
					}
					&:nth-child(4) {
						border:1px solid #eee;
						.title {
							color: #333;
						}
						.param {
							color: #999;
						}
						.image {
							background-image: url('../../common/assets/images/stabilization.png');
						}
					}
				}
				.bridf-member:nth-child(1){
					margin-left: 0;
				}
			}
		}
		.adbanner-outer {
			width: 100%;
			.adbanner {
				width: 100%;
				display: inherit;
			}
		}
		.links-outer {
			width: 100%;
			.links {
				width: 1200px;
				margin: 0 auto;
				text-align: center;
				padding: 103px 0 170px 0;
				background: #f4fbff;
				.title {
					width: 687px;
					height: 111px;
					margin: 0 auto 95px auto;
					background-image: url('../../common/assets/images/help.png');
				}
				.list {
					width: 100%;
					display: flex;
					justify-content: center;
					.t-member {
						flex: 1;
						line-height: 18px;
						font-size: 18px;
						text-align: center;
						a {
							color: #666;
						}
					}
				}
			}
		}
	}
	#app.ENG {
		.bridf-member {
			.title {
				font-size: 18px !important;
			}
			.image{
				margin: 46px 0 37px 0 !important;
			}
			.param {
				width: 100%;
				max-width: 272px;
				text-align: left !important;
			}
			&:nth-child(3) {
				.title {
					margin-top: -20px !important;
				}
			}
		}
	}
</style>
<style>
	.banner .ivu-carousel-list {
		height: 100%;
	}
	.banner .ivu-carousel-track {
		height: 100%;
	}
	.banner .ivu-carousel-item {
		height: 100% !important;
	}
</style>
