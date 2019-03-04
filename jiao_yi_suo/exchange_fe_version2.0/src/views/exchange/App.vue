<template>
	<div id="app" :class="pageStyleClass">
		<div class="header-wraper">
			<com-header class="com-header" :currentPage="'exchange'" :isLogin="isLogin" :styleClass="pageStyleClass"></com-header>
		</div>
		<div class="container" ref="container">
			<div class="notice">
				<h3 class="sys-title"><span class="f-db icon"></span><span class="text">{{$t('exchange.systemNotice')}}:</span></h3>
				<div class="nxt">{{$t('exchange.noNotice')}}</div>
			</div>
            <div class="staticstics-and-handlearea f-pr">
                <div class="left-sider-wraper f-pa">
                    <div class="left-sider">
                        <div class="lastetdata-wraper">
                            <Spin fix size="large" v-show="spinOpt.currencySpinIsShow"></Spin>
                            <ul class="tab">
                                <li class="t-member f-fl"   :class="{'active': currentExType === item}"  v-for="(item, index) in exchangeTypeGroup" :key="index" @click="changeExType(item)">
                                    <span class="text" v-if="item !== 'selfSelection'">{{item}}</span>
                                    <span class="text" v-if="item === 'selfSelection'">{{$t('exchange.optional')}}</span>
                                </li>
                            </ul>
                            <div class="price-list-wrap f-pr">
                                <ul class="art">
                                    <li class="t-member bz">
                                        <span>{{$t('exchange.currency')}}</span>
                                        <div class="upanddown-outer f-dib f-pr">
                                            <div class="upanddown f-pa">
                                                <span class="up f-db" @click="arrangeRule = 'coinNameUp'" :class="{active: arrangeRule === 'coinNameUp'}"></span>
                                                <span class="down f-db" @click="arrangeRule = 'coinNameDown'" :class="{active: arrangeRule === 'coinNameDown'}"></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="t-member">
                                        <span>{{$t('exchange.latestPrice')}}</span>
                                        <div class="upanddown-outer f-dib f-pr">
                                            <div class="upanddown f-pa">
                                                <span class="up f-db"  @click="arrangeRule = 'priceUp'" :class="{active: arrangeRule === 'priceUp'}"></span>
                                                <span class="down f-db"  @click="arrangeRule = 'priceDown'" :class="{active: arrangeRule === 'priceDown'}"></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="t-member">
                                        <span>{{$t('exchange.amountOfIncrease')}}</span>
                                        <div class="upanddown-outer f-dib f-pr">
                                            <div class="upanddown f-pa">
                                                <span class="up f-db"  @click="arrangeRule = 'amplitudeUp'"  :class="{active: arrangeRule === 'amplitudeUp'}"></span>
                                                <span class="down f-db"  @click="arrangeRule = 'amplitudeDown'"  :class="{active: arrangeRule === 'amplitudeDown'}"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul class="list">                                
                                    <li class="t-member" v-for="(item, index) in kInfoData[currentExType]" :key="index" :class="{'active': item.contractType === currentConType}" @click="changeConType(item.contractType)" v-if="contractTypeGroup[item.contractType]">
                                        <div class="f-db first">
                                            <span class="choosebtn" :class="{bechoose: item.selfSelection}" @click.stop="changeOptionalStatus(item)"></span>
                                            <span v-show="currentExType !== 'selfSelection'">{{contractTypeGroup[item.contractType].split('_')[1]}}</span>
                                            <span v-show="currentExType === 'selfSelection'">{{contractTypeGroup[item.contractType].split('_')[1]}}/{{contractTypeGroup[item.contractType].split('_')[0]}}</span>
                                        </div>
                                        <div class="con f-db"><span>{{item.current | formatFloat(decimalDigits.contractType[item.contractType]? decimalDigits.contractType[item.contractType].price: 8)}}</span></div>
                                        <!-- 暂时添加两种币的开盘价 -->
                                        <div class="con f-db"  :class="item.colorClass"><span>{{item.change}}</span></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- 平台交易记录 -->
                        <div class="deal-record-wraper">
                            <div class="deal-record f-pr">
                                <div class="empty f-pa" v-if="dealRecordData.length === 0">{{$t('exchange.noRecord')}}</div>
                                <div class="con f-pr">
                                    <Spin fix size="large" v-show="spinOpt.recordSpinIsShow"></Spin>
                                    <ul class="art" v-if="dealRecordData.length > 0">
                                        <li class="t-member">{{$t('exchange.comTime')}}</li>
                                        <li class="t-member"><span>{{$t('exchange.price')}}</span></li>
                                        <li class="t-member"><span>{{$t('exchange.amount')}}</span></li>
                                    </ul>
                                    <ul class="list"  v-if="dealRecordData.length > 0">
                                        <li class="t-member" v-for="(item, index) in dealRecordData" :key="index" v-if="index < 50">
                                            <div><span>{{globalFun.dateFormat(item.matchTime,'hh:mm:ss')}}</span></div>
                                            <div><span>{{item.matchPrice | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].price: 8)}}</span></div>
                                            <div><span>{{item.matchQty | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].amount: 8)}}</span></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="middle-content">
                    <div class="chart-wrap-outer f-pr">
                        <Spin fix size="large" v-show="spinOpt.chartSpinIsShow"></Spin>
                        <div class="com-info">
                            <ul class="info-list" v-if="kInfoData[currentExType] && contractTypeGroup[currentConType] && comInfo">
                                <li class="t-member strong" v-show="currentExType !== 'selfSelection'">{{contractTypeGroup[currentConType].split('_')[1]}}/{{currentExType}}</li>
                                <li class="t-member strong" v-show="currentExType === 'selfSelection'">{{contractTypeGroup[currentConType].split('_')[1]}}/{{contractTypeGroup[currentConType].split('_')[0]}}</li>
                                <li class="t-member strong">
                                    {{comInfo.current  | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].price: 8)}} 
                                    ≈ {{comInfo.cny}} CNY</li>
                                <!-- <li class="t-member">≈ xxxxxCNY</li> -->
                                <li class="t-member">
                                    {{$t('exchange.amountOfIncrease')}}
                                    <!-- 暂时添加两种币的开盘价 -->
                                    <span  :class="comInfo.colorClass">
                                        {{comInfo.change}}
                                    </span>
                                </li>
                                <li class="t-member"> {{$t('exchange.high')}} {{comInfo.high  | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].price: 8)}} </li>
                                <li class="t-member"> {{$t('exchange.low')}} {{comInfo.low  | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].price: 8)}} </li>
                            </ul>
                        </div>
                        <div class="chart-info">
                            <div class="options" :class="{depthType: chartType === 'depth'}">
                                <ul class="interval" v-if="!convertFont && chartType === 'candleStick'">
                                    <li class="t-member" v-for="(item, index) in timeIntervalGroup" :key="index" :class="{'active': currentTimeInterval === item.key}" @click="changeTimeInterval(item.key)">
                                        <span class="f-db t-member-inner">{{item.interval}}</span>
                                    </li>
                                </ul>
                                <ul class="chartswitch">
                                    <li class="t-member candlestick" :class="{active: chartType === 'candleStick'}" @click="chartType = 'candleStick'">{{$t('exchange.candleStick')}}</li>
                                    <li class="t-member depth" :class="{active: chartType === 'depth'}" @click="chartType = 'depth'">{{$t('exchange.depth')}}</li>
                                </ul>
                            </div>
                            <div class="chart-wrap f-pr">
                                <div class="chart-main" ref="mainChartWrap">
                                    <iframe :src="chartAddress" frameborder="0" class="iframe" ref="chartIframe" v-if="!convertFont && chartType === 'candleStick'"></iframe>
                                    <div class="chart-depth f-pa"  v-if="platformEntrustInfo.buy.length >= 2 && platformEntrustInfo.sell.length >= 2 && chartType === 'depth'">
                                        <chartDepth ref="chartDepth" :chartData="platformEntrustInfo"></chartDepth>
                                    </div>
                                    <div class="noData" v-if="(platformEntrustInfo.buy.length < 2 || platformEntrustInfo.sell.length < 2) && chartType === 'depth'">
                                        <span>{{$t('exchange.noData')}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 交易盒子 -->
                    <div class="exbox-wraper f-pr">
                        <div class="shadowbg f-pa"></div>
                        <div class="exbox f-pa">
                            <!-- 买入操作盒子 -->
                            <div class="t-member buy f-fl f-pr">
                                <h3 class="title f-pr">
                                    <span class="point f-db"></span>
                                    <span>{{$t('exchange.buyIn')}}{{contractTypeGroup[currentConType]? contractTypeGroup[currentConType].split('_')[1]: ''}}</span>
                                </h3>
                                <div class="balance t-wraper">
                                    <div class="t-title">{{$t('exchange.usable')}}</div>
                                    <div class="valanddispoint" v-if="contractTypeGroup[currentConType] && currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]] && balanceData[[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]]]]">
                                        <span class="val f-db">
                                            {{balanceData[[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]]]].balance | formatFloat(decimalDigits.currency[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]]]? decimalDigits.currency[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]]]: 8)}}
                                            {{contractTypeGroup[currentConType].split('_')[0]}}
                                        </span>
                                        <span class="dispoint f-db" @click="redirect('dispointBuy')">{{$t('exchange.recharge')}}</span>
                                    </div>
                                    <div class="valanddispoint" v-if="contractTypeGroup[currentConType] && currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]] && !balanceData[[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]]]]">
                                        <span class="val f-db">
                                            {{0 | formatFloat(decimalDigits.currency[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]]]? decimalDigits.currency[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[0]]]: 8)}}
                                            {{contractTypeGroup[currentConType].split('_')[0]}}
                                        </span>
                                    </div>
                                </div>
                                <div class="best-price t-wraper">
                                    <div class="t-title">{{$t('exchange.buyPrice')}}</div>
                                    <input class="input" type="type" v-model.trim="buyOptions.price"  maxlength="14">
                                </div>
                                <div class=" t-wraper">
                                    <div class="t-title">{{$t('exchange.buyQty')}}</div>
                                    <input class="input Qty" type="type" v-model.trim="buyOptions.Qty" maxlength="14">
                                </div>
                                <div class="slider">
                                    <slider 
                                        ref="buySlider"
                                        :wareVal.sync="buyOptions.wareVal" 
                                        :coinType="contractTypeGroup[currentConType]?contractTypeGroup[currentConType].split('_')[1]: ''"
                                        :maxCoin="globalFun.formatFloat(buyMaximum, decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].amount: 8)"
                                    ></slider>
                                </div>
                                <div class="count  t-wraper">
                                    <p class="mon over1line" v-if="contractTypeGroup[currentConType]">
                                        {{$t('exchange.tradingVol')}}： 
                                        <span class="val">{{buyCostCount | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].volume: 8)}}</span> 
                                        <span class="val" v-if="contractTypeGroup[currentConType]">{{contractTypeGroup[currentConType].split('_')[0]}}</span>
                                    </p>
                                </div>
                                <div class="submit">
                                    <i-button class="btn" :disabled="buyBtnDisabled" @click="entrustToBuy">{{$t('exchange.buyIn')}}</i-button>
                                </div>
                            </div>
                            <!-- 卖出操作盒子 -->
                            <div class="t-member sell f-fr">
                                <h3 class="title f-pr">
                                    <span class="point f-db"></span>
                                    <span>{{$t('exchange.sellOut')}}{{contractTypeGroup[currentConType]? contractTypeGroup[currentConType].split('_')[1]: ''}}</span>
                                </h3>
                                <div class="balance t-wraper">
                                    <div class="t-title">{{$t('exchange.usable')}}</div>
                                    <div class="valanddispoint" v-if="contractTypeGroup[currentConType] && currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]] && balanceData[[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]]]]">
                                        <span class="val f-db">
                                            {{balanceData[[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]]]].balance | formatFloat(decimalDigits.currency[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]]]? decimalDigits.currency[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]]]: 8)}}
                                            {{contractTypeGroup[currentConType].split('_')[1]}}
                                        </span>
                                        <span class="dispoint f-db" @click="redirect('dispointSell')">{{$t('exchange.recharge')}}</span>
                                    </div>
                                    <div class="valanddispoint" v-if="contractTypeGroup[currentConType] && currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]] && !balanceData[[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]]]]">
                                        <span class="val f-db">
                                            {{0 | formatFloat(decimalDigits.currency[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]]]? decimalDigits.currency[currencyTypeGroup[contractTypeGroup[currentConType].split('_')[1]]]: 8)}}
                                            {{contractTypeGroup[currentConType].split('_')[1]}}
                                        </span>
                                    </div>
                                </div>
                                <div class="best-price  t-wraper">
                                    <div class="t-title">{{$t('exchange.sellPrice')}}</div>
                                    <input class="input" type="type" v-model.trim="sellOptions.price" maxlength="14">
                                </div>
                                <div class=" t-wraper">
                                    <div class="t-title">{{$t('exchange.sellQty')}}</div>
                                    <input class="input Qty" type="type" v-model.trim="sellOptions.Qty"  maxlength="14">
                                </div>
                                <div class="slider">
                                    <slider 
                                        ref="sellSlider"
                                        :wareVal.sync="sellOptions.wareVal" 
                                        :coinType="contractTypeGroup[currentConType]?contractTypeGroup[currentConType].split('_')[1]: ''"
                                        :maxCoin="globalFun.formatFloat(sellMaximun, decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].amount: 8)"
                                    ></slider>
                                </div>
                                <div class="count t-wraper">
                                    <p class="mon over1line" v-if="contractTypeGroup[currentConType]">
                                        {{$t('exchange.tradingVol')}}： 
                                        <span class="val">{{sellCostCount | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].volume: 8)}}</span>
                                        <span class="val" v-if="contractTypeGroup[currentConType]">{{contractTypeGroup[currentConType].split('_')[0]}}</span>
                                    </p>
                                </div>
                                <div class="submit">
                                    <i-button class="btn" :disabled="sellBtnDisabled" @click="entrustToSell">{{$t('exchange.sellOut')}}</i-button>
                                </div>
                            </div>
                            <div class="t-member sell"></div>
                        </div>
                    </div>
                </div>
                <div class="right-sider-wraper f-pa">
                    <div class="current-price">
                        <span class="point f-db"></span>
                        <p class="price">
                            <span class="text">{{$t('exchange.currentPrice')}}：</span>
                            <span class="price" v-if="comInfo && contractTypeGroup[currentConType]">
                                {{comInfo.current  | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].price: 8)}} 
                                {{contractTypeGroup[currentConType].split('_')[1]}}
                                ≈ {{comInfo.cny}} CNY
                            </span>
                        </p>
                    </div>
                    <div class="right-sider">
                        <div class="title-list">
                            <li class="title-member">{{$t('exchange.buy')}}/{{$t('exchange.sell')}}</li>
                            <li class="title-member">{{$t('exchange.price')}}</li>
                            <li class="title-member">{{$t('exchange.amount')}}</li>
                            <li class="title-member">{{$t('exchange.total')}}</li>
                        </div>
                        <!-- 卖出委托列表 -->
                        <ul class="entrust-sell-list f-pr bslist" v-if="platformEntrustInfo.sell">
                            <Spin fix size="large" v-show="spinOpt.allEnSpinIsShow"></Spin>
                            <li class="entrust-sell-member bslist-member f-pr" 
                                v-for="(item, index) in entrustListShowCount" 
                                :key="index"  
                                :class="{hv: platformEntrustInfo.sell[entrustListShowCount.length - index - 1]}"
                                @click="changePrice(platformEntrustInfo.sell[entrustListShowCount.length - index - 1], 'sell')"
                            >
                                <div class="upColor m-member">{{$t('exchange.sell')}}{{entrustListShowCount.length - index}}</div>
                                <div class="price m-member">
                                    <span class="f-fr"  v-if="platformEntrustInfo.sell[entrustListShowCount.length - index - 1]">
                                        {{platformEntrustInfo.sell[entrustListShowCount.length - index - 1][0]  | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].price: 8)}}
                                    </span>
                                </div>
								<div class="Qty m-member">
                                    <span class="f-fr"  v-if="platformEntrustInfo.sell[entrustListShowCount.length - index - 1]">
                                        {{platformEntrustInfo.sell[entrustListShowCount.length - index - 1][1]  | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].amount: 8)}}
                                    </span>
                                </div>
								<div class="count m-member">
                                    <span class="f-fr"  v-if="platformEntrustInfo.sell[entrustListShowCount.length - index - 1]">
                                        {{new Big(platformEntrustInfo.sell[entrustListShowCount.length - index - 1][0] - 0).mul(platformEntrustInfo.sell[entrustListShowCount.length - index - 1][1] - 0) | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].volume: 8)}}
                                    </span>
                                </div>
                                <span class="rate f-pa f-db upBgColor"  v-if="platformEntrustInfo.sell[entrustListShowCount.length - index - 1]"
                                    :style="`width:${(platformEntrustInfo.sell[entrustListShowCount.length - index - 1][1] - 0)  / (platformEntrustInfo.showEntrustMaxAmount - 0) * 100}%`">
                                </span>
                            </li>
                        </ul>
                        <!-- 买入委托列表 -->
                        <ul class="entrust-buy-list bslist f-pr" v-if="platformEntrustInfo.buy">
                            <Spin fix size="large" v-show="spinOpt.allEnSpinIsShow"></Spin>
                            <li class="entrust-buy-member bslist-member f-pr" 
                                v-for="(item, index) in entrustListShowCount" 
                                :key="index" 
                                :class="{hv: platformEntrustInfo.buy[index]}"
                                @click="changePrice(platformEntrustInfo.buy[index], 'buy')"
                            >
                                <div class="downColor m-member">{{$t('exchange.buy')}}{{index + 1}}</div>
                                <div class="price m-member">
                                    <span class="f-fr"  v-if="platformEntrustInfo.buy[index]">
                                        {{platformEntrustInfo.buy[index][0]  | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].price: 8)}}
                                    </span>
                                </div>
								<div class="Qty m-member">
                                    <span class="f-fr"  v-if="platformEntrustInfo.buy[index]">
                                        {{platformEntrustInfo.buy[index][1]  | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].amount: 8)}}
                                    </span>
                                </div>
								<div class="count m-member">
                                    <span class="f-fr"  v-if="platformEntrustInfo.buy[index]">
                                        {{new Big(platformEntrustInfo.buy[index][0] - 0).mul(platformEntrustInfo.buy[index][1] - 0) | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].volume: 8)}}
                                    </span>
                                </div>
                                <span class="rate f-pa f-db downBgColor" v-if="platformEntrustInfo.buy[index]"
                                    :style="`width:${(platformEntrustInfo.buy[index][1] - 0)  / (platformEntrustInfo.showEntrustMaxAmount - 0) * 100}%`">
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="entrusts-record-wraper" v-if="isLogin">
                <div class="entrusts-record f-pr">
                    <ul class="type-select">
                        <li class="f-fl f-pr s-member" :class="{active: userEntrustDataType === 'current'}" @click="convertUserEntrustType('current')">
                            {{$t('exchange.nowEntrust')}}
                            <span class="line f-pa"></span>
                        </li>
                        <li class="f-fl f-pr s-member" :class="{active: userEntrustDataType === 'history'}" @click="convertUserEntrustType('history')">
                            {{$t('exchange.historyEntrust')}}
                            <span class="line f-pa"></span>
                        </li>
                    </ul>
                    <div class="empty" v-if="userEntrustData.length === 0">{{$t('exchange.userNoEntrust')}}</div>
                    <div class="con f-pr">
                        <Spin fix size="large" v-show="spinOpt.userEnSpinIsShow"></Spin>
                        <ul class="art" v-if="userEntrustData.length > 0">
                            <li class="t-member">{{$t('exchange.submitTime')}}</li>
                            <li class="t-member">{{$t('exchange.buy')}}/{{$t('exchange.sell')}}</li>
                            <li class="t-member"><span>{{$t('exchange.price')}}</span></li>
                            <li class="t-member"><span>{{$t('exchange.amount')}}</span></li>
                            <li class="t-member"><span>{{$t('exchange.turnOver')}}</span></li>
                            <li class="t-member"><span>{{$t('exchange.total')}}</span></li>
                            <li v-if="userEntrustDataType === 'current'" class="t-member">{{$t('exchange.operation')}}</li>
                        </ul>
                        <ul class="list"  v-if="userEntrustData.length > 0">
                            <li class="t-member" v-for="(item, index) in userEntrustData" :key="index">
                                <div><span>{{globalFun.dateFormat(item.orderTime, 'yyyy-MM-dd hh:mm:ss')}}</span></div>
                                <div><span><span v-if="item.bsFlag === 1" class="downColor">{{$t('exchange.buyIn')}}</span><span v-if="item.bsFlag === 2" class="upColor">{{$t('exchange.sellOut')}}</span></span></div>
                                <div><span>{{item.orderPrice   | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].price: 8)}}</span></div>
                                <div><span>{{item.orderQty   | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].amount: 8)}}</span></div>
                                <div><span>{{item.matchQty   | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].amount: 8)}}</span></div>
                                <div>
                                    <span v-if="item.bsFlag === 1">{{new Big(item.orderPrice - 0).mul(item.orderQty - 0) | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].volume: 8)}}</span>
                                    <span v-if="item.bsFlag === 2">{{new Big(item.orderPrice - 0).mul(item.orderQty - 0) | formatFloat(decimalDigits.contractType[currentConType]? decimalDigits.contractType[currentConType].volume: 8)}}</span>
                                </div>
                                <div v-if="userEntrustDataType === 'current'"><button style="line-height: 18px;" @click="cancelOrder(item.orderNo)">{{$t('exchange.revoke')}}</button></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="page"  v-if="userEntrustData.length > 0">
                    <Page v-if="!convertFont" :total="userEntrustPageOpt.total" show-elevator show-total :current="userEntrustPageOpt.pageIndex" :page-size="userEntrustPageOpt.pageSize" @on-change="convertUserEntrustPage"></Page>
                </div>
            </div>
            <div class="coinprofile" v-if="currencyInfo">
                <div class="left-part">
                    <h2 class="coin-name">
                        <span class="fname">{{currencyInfo.fullName}}</span>
                        <!-- <span class="sname">({{currencyInfo.fullName}})</span> -->
                    </h2>
                    <div class="line"></div>
                    <ul class="dpinfo">
                        <li class="t-member time">
                            <p class="val">
                                <span v-if="!isNaN(currencyInfo.releaseTime)">{{globalFun.dateFormat(currencyInfo.releaseTime,'yyyy-MM-dd')}}</span>
                                <span v-if="isNaN(currencyInfo.releaseTime)">--</span>
                            </p>
                            <p class="title">{{$t('exchange.releaseTime')}}</p>
                        </li>
                        <li class="t-member">
                            <p class="val">{{currencyInfo.distributionAmount}}</p>
                            <p class="title">{{$t('exchange.releaseCount')}}</p>
                        </li>
                        <li class="t-member">
                            <p class="val">{{currencyInfo.circulationAmount}}</p>
                            <p class="title">{{$t('exchange.ltCount')}}</p>
                        </li>
                        <li class="t-member">
                            <p class="val">{{currencyInfo.raisePrice}}</p>
                            <p class="title">{{$t('exchange.zcPrice')}}</p>
                        </li>
                    </ul>
                </div>
                <div class="right-part">
                    <p class="desc">
                        <span class="syh"><i>"</i></span>
                            {{currencyInfo.briefIntroduction}}
                        <span class="xyh f-pr"><i class="f-pa">"</i></span>
                    </p>
                    <ul class="links">
                        <li class="l-member">
                            <span class="ti f-db">{{$t('exchange.whitePaper')}}</span>
                            <a :href="currencyInfo.whitePaper" target="_blank">{{currencyInfo.whitePaper}}</a>
                        </li>
                        <li class="l-member">
                            <span class="ti f-db">{{$t('exchange.website')}}</span>
                            <a :href="currencyInfo.officialWebSite" target="_blank">{{currencyInfo.officialWebSite}}</a>
                        </li>
                        <li class="l-member">
                            <span class="ti f-db">{{$t('exchange.blockCheck')}}</span>
                            <a :href="currencyInfo.blockQuery" target="_blank">{{currencyInfo.blockQuery}}</a>
                        </li>
                    </ul>
                </div>
            </div>
		</div>
		<com-footer></com-footer>
        <!-- 支付密码弹框 -->
        <Modal v-model="payPwdPopupOptions.payPwdPopupVisible" width="472" class="payPwdPopup" :styles="{top: '200px'}" @on-visible-change="pwdPopupVisibleChange">
            <p slot="header" style="color:#f60;text-align:center;background-color: #f9f9f9;">
                <span>{{$t('exchange.payPwePopupTitle')}}</span>
            </p>
            <div class="popup-content">
                <div class="enter-wraper f-pr">
                    <input type="text" ref="pwdInput"  class="hiddeninput f-pa" @keyup="enterPayPassword" v-model="payPwdPopupOptions.payPassword" :disabled="payPwdPopupOptions.disabled">
                    <div class="showinput">
                        <ul class="val-list">
                            <li class="val-member" v-for="(item, index) in 6" :key="index">
                                <span class="f-db circle" v-if="payPwdPopupOptions.payPassword[index]"></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="loading-wraper">
                    <div class="icon">
                        <Spin size="large" v-if="payPwdPopupOptions.loading"></Spin>
                    </div>
                </div>
            </div>
            <div slot="footer"></div>
        </Modal>
	</div>
</template>

<script>
import header from "@components/header/header";
import footer from "@components/footer/footer";
import eventBus from '@common/eventBus/eventBus';
import chartDepth from "@components/chart_depth/chart_depth";
import slider from '@components/slider/slider';
import Big from 'big.js';
import {
    getKinfoList,
    getbalance,
    getEntrustInfo,
    getExConfig,
    setOrder,
    getUserEntrustList,
    getTradeRecord,
    cancelOrder,
    getContractList,
    getCurrencyList,
    currencyIntro,
    addOptional,
    deleteOptional,
    getUserDetail
} from "@api/api_group";
import {
    Layout,
    Sider,
    Content,
    Spin,
    Notice,
    Message,
    Select,
    Option,
    Button,
    Page,
    Modal,
    
} from 'iview';
import contractTypeGroup from "@common/settings/contractTypeGroup";
import decimalDigits from "@common/settings/decimalDigits";
import coldingCurrencyList from '@common/settings/coldingCurrencyList';
import md5 from "@common/assets/js/md5.js";

export default {
    data() {
        return {
            // 风格切换
            pageStyleClass: 'deepDark',
            Big: Big,
            // 用户详细信息
            userData: {},
            // 可交易币种，被交易币
            exchangeTypeGroup: ['BTC','ETH', 'selfSelection'],
            // 时间区间数组
            timeIntervalGroup:[],
            // 当前选择时间区间
            currentTimeInterval: "3",
            // 选择不同时间区间对应的请求条数
            // <<<<==========================================================    可调整默认值
            // =================================================<<<
            kInfocount: {
                "1": 1000, // 1分钟
                "2": 1000, // 5分钟
                "3": 1000, // 15分钟
                "4": 1000, // 30分钟
                "5": 1000, // 1小时
                "6": 1000, // 日
                "7": 1000 // 周
            },
            // 当前选中的基础币种
            currentExType: this
                .globalFun
                .getQueryString('currentExType')
                    ? this
                        .globalFun
                        .getQueryString('currentExType')
                    : 'BTC',
            // 当前选中的交易方式
            currentConType: this
                .globalFun
                .getQueryString('currentConType')
                    ? this
                        .globalFun
                        .getQueryString('currentConType') - 0
                    : '',
            // 可选择的币种
            currencyTypeGroup: [],
            // 交易方式
            contractTypeGroup: contractTypeGroup,
            // 保留小数点的配置
            decimalDigits: decimalDigits,
            // 等待上线的交易方式
            coldingCurrencyList: coldingCurrencyList,
            // 所有k线最新一天的数据
            kInfoData: {},
            // 所有k线最新一天的数据（用来过度排序）
            middleKinfoData: {},
            arrangeRule: '',
            // 指定k线的数据
            specKinfoData: {},
            // 计时器 ==== 各个请求的周期不一，所以需要多个计时器 ====
            kInfoTimer: {}, // 特定k线计时器
            platformEntrustInfoTimer: {}, // 委托计时器
            lastKTimer: {}, // 获取最后一条k线数据计时器
            recordTimer: {}, // 获取平台交易记录的计时器
            requestFlag: {
                kInfoFlag: true,
                platformEntrustInfoFlag: true,
                lastKFlag: true,
                recordFlag: true
            },
            isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
            // 余额
            balanceData: {},
            // 主图的数据
            mainChartData: {
                timeData: [],
                barData: [],
                exData: []
            },
            chartAddress:'',
            // 主图上方显示的概括信息
            comInfo: {},
            // 主图显示线状图还是k线图
            chartType: "candleStick",
            // 深度图的数据
            depthChartData: {},
            // 记录交易操作模块展示的数据类型('default'/'buy'/'sell')
            entrustType: "default",
            // 交易的相关设定参数,
            exConfig: {},
            // 买入设置
            buyOptions: {
                bestBuy: 0,
                price: "",
                Qty: "",
                wareVal: 0,
                poundage: "0.00000000",
                btnDisable: this.isLogin
            },
            // 卖出设置
            sellOptions: {
                bestSell: 0,
                price: "",
                Qty: "",
                wareVal: 0,
                poundage: "0.00000000",
                btnDisable: this.isLogin
            },
            payPwdPopupOptions: {
                // 买入或卖出弹框 buy/sell
                popupType: '',
                // 支付密码弹框
                payPwdPopupVisible: false,
                // 支付密码
                payPassword: '',
                // loading
                loading: false,
                // 禁用
                disabled: false
            },
            // 是否同步价格（最佳买入卖出 < --- > 价格）
            isKeepPricePace: true,
            // 平台实时委托记录
            platformEntrustInfo: {
                buy: [],
                sell: []
            },
            // 委托列表的显示类型
            userEntrustDataType: 'current', // current or history
            // 委托列表数据
            userEntrustData: [],
            // 委托列表显示条数
            entrustListShowCount: new Array(13), 
            // 委托分页设置
            // <<<==========================================================    可调整默认值
            // =================================================<<<
            userEntrustPageOpt: {
                pageSize: 10,
                pageIndex: 1,
                total: 10
            },
            // 平台实时成交记录
            dealRecordData: [],
            // 平台成交记录的分页设置     <<<==========================================================
            // 可调整默认值  =================================================<<<
            dealRecordPageOpt: {
                pageSize: 50,
                pageIndex: 1,
                total: 50
            },
            // 加上spin效果
            spinOpt: {
                currencySpinIsShow: false,
                chartSpinIsShow: false,
                allEnSpinIsShow: false,
                userEnSpinIsShow: false,
                recordSpinIsShow: false,
                payPwdPopupSpinIsShow: false
            },
            // 切换语言时重置组件
            convertFont: false,
            // 币种信息
            currencyInfo:{}
        };
    },
    created() {
        eventBus.$on('convertFont', () => {
            this.timeIntervalGroup =  [
                {
                    key: "1",
                    interval: this.$t('exchange.timeInterval.min')
                }, {
                    key: "2",
                    interval: this.$t('exchange.timeInterval.min5')
                }, {
                    key: "3",
                    interval: this.$t('exchange.timeInterval.min15')
                }, {
                    key: "4",
                    interval: this.$t('exchange.timeInterval.min30')
                }, {
                    key: "5",
                    interval: this.$t('exchange.timeInterval.hour')
                }, {
                    key: "6",
                    interval: this.$t('exchange.timeInterval.day')
                }, {
                    key: "7",
                    interval: this.$t('exchange.timeInterval.week')
                }
            ];
            document.title = this.$t('exchange.pageTitle');
            this.convertFont = true;
            setTimeout(() => {
                this.convertFont = false;
            }, 200);
            this.changechartAddress();
        });
        eventBus.$on('convertStyleClass', (style) => {
            
            this.pageStyleClass = style;
            this.changechartAddress();
        });
    },
    mounted() {   
        this.$nextTick(() => {
            if (this.globalFun.mobileCheck()) {
                let h = document.documentElement.clientHeight - 78 - 344;
                this
                    .$refs
                    .container
                    .setAttribute("style", `min-height:${h}px;`);
            }
            // =====================================         首次进入页面请求数据
            // =========================================== 目前contract没有接口，先手动书写文件引入
            // ===========================================================================
            // const contractTypePromise = new Promise((resolve, reject) => {
            // getContractList().then((res) => { 		if (res && res.success) { 		} 	}); });
            // const currencyTypePromise = new Promise((resolve, reject) => {
            // getCurrencyList().then((res) => { 		if (res && res.success) {
            // this.currencyTypeGroup = res.data; 			resolve(); 		} 	}); });
            // Promise.all(currencyTypePromise, contractTypePromise).then(() => { });

            getCurrencyList().then(res => {
                if (res && res.success) {
                    this.currencyTypeGroup = res.data;
                    // 获取列表数据
                    this.loopGetKinfoList(
                        () => {
                            // ============  此时currentConType已经被赋值，可以调用其他需要contractType的接口， 页面初次展开需要调用
                            this.changechartAddress();
                            // 获取平台委托数据
                            this.getEntrustInfo();
                            // 获取用户当前的委托数据
                            this.getUserEntrustList();
                            // 获取平台交易记录
                            this.getTradeRecord();
                            // 获取设置参数
                            this.getExConfig();
                        },
                        this.globalFun.getQueryString('currentConType')
                            ? false
                            : true
                    ); // 假如已经有传过来的参数，则不重置currentConType，否则重置
                    // 获取余额
                    this.getbalance(() => {
                        this.getUserDetail();
                    });
                }
            });
        });
    },
    methods: {
        // 切换委托列表类型
        convertUserEntrustType(type) {
            this.userEntrustDataType = type;
            this.userEntrustPageOpt.pageIndex = 1;
            this.getUserEntrustList();
        },
        // 改变当前选择的时间区间时,k线相关数据会发生改变
        changeTimeInterval(type) {
            this.currentTimeInterval = type;
            this.resetExBox();
            this.changechartAddress();
        },
        // 改变当前交易的实际货币（HKD，USD），关联的一系列信息会发生变化
        changeExType(type) {
            this.currentExType = type;
            this.resetExBox();
            // 这里要getKinfoList以后，获得第一条转换模式，再决定contractType，所以这里的getUserEntrustlist要在loopGetKinfoList的回调里面调用才会正确
            this.loopGetKinfoList(() => {
                this.changechartAddress();
                this.getUserEntrustList();
                this.getEntrustInfo();
                this.getTradeRecord();
            });
        },
        // 改变当前交易的兑换模式（HKD-BTC、HKD-ACTC...），关联的一系列信息会发生变化
        changeConType(type) {
            if (this.coldingCurrencyList.contractType.includes(type)) {
                Message.warning(this.$t('homePage.coldingTip'));
                return;
            }
            this.currentConType = type;
            this.getEntrustInfo();
            this.getTradeRecord();
            this.getUserEntrustList();
            this.resetExBox();
            this.changechartAddress();
            this.getCurrencyIntro();
        },
        // 改变K线图iframe地址
        changechartAddress(){
            if (this.currentConType === '') { return; }
            let lang = 'en';
            if(this.$i18n.locale == 'ZHS'){
                lang = 'zh';
            }else if(this.$i18n.locale == 'ZHT'){
                lang = 'zh_TW';
            }
            var style = this.pageStyleClass || 'deepDark';
            this.chartAddress = `./static/exchange/index.html?contractType=${this.currentConType}&kType=${this.currentTimeInterval}&lang=${lang}&style=`+style;
        },
        // 获取币种介绍
        getCurrencyIntro(){
            var code = this.decimalDigits.currencyCode[this.contractTypeGroup[this.currentConType].split('_')[1]]
            currencyIntro({
                code
            }).then(res =>{
                if(res && res.success){
                    this.currencyInfo = res.data[0];
                }
            });
        },
        // 改变委托列表的页数
        convertUserEntrustPage(index) {
            this.userEntrustPageOpt.pageIndex = index;
            this.getUserEntrustList();
        },
        // 改变平台成交记录的页数
        exRecordPage(index) {
            this.dealRecordPageOpt.pageIndex = index;
            this.getTradeRecord();
        },
        // 充值操作盒子的数据
        resetExBox() {
            // 买入设置
            (this.buyOptions = {
                price: "",
                Qty: "",
                password: "",
                poundage: "0.00000000",
                btnDisable: this.isLogin
            }),
            // 卖出设置
            (this.sellOptions = {
                price: "",
                Qty: "",
                password: "",
                poundage: "0.00000000",
                btnDisable: this.isLogin
            });
        },
        // 点击价格列表改变价格
        changePrice(item, type) {
            if (!item) { return; }
            if (type === 'sell') {
                this.sellOptions.price = item[0];
            } else {
                this.buyOptions.price = item[0];
            }
        },
        // 获取k线数据的最后一条
        getKinfoList(callback) {
            this.requestFlag.lastKFlag = false;
            const isKeepPricePace = this.isKeepPricePace;
            getKinfoList().then(res => {
                this.requestFlag.lastKFlag = true;
                if (res.success) {
                    for (let i in res.data.transactionInfo) {
                        res.data.transactionInfo[i].forEach((element) => {
                            element.contractTypeStr = `${this.contractTypeGroup[element.contractType].split('_')[1]}`;
                            element.current = element.current.split('/')[0];
                            if (element.change !== '--') {
                                element.colorClass = element.change.split('%')[0] - 0 >= 0? 'upColor': 'downColor';
                            }
                        });
                    } 
                    // 赋值给最佳买入和最佳卖出时，如果当前已经得到了contractType，取当前contractType的值，如果首次加载还未得到的话，使用第一条的contractType对应的值
                    let curContractType = this.currentConType === ''? res.data.transactionInfo[this.currentExType][0].contractType: this.currentConType;
                    this.comInfo = res.data.transactionInfo[this.currentExType].filter(item => item.contractType === curContractType)[0]; 
                    if (this.comInfo) {  
                        this.comInfo.cny = res.data.priceData[curContractType].cnyPrice; 
                        this.comInfo.current = res.data.priceData[curContractType].current;
                    };
                    // ================ 已选择和排序处理 start ==================
                    if (!this.isLogin) {
                        let optionalArr = localStorage.getItem('YJS_optionalArr')? JSON.parse(localStorage.getItem('YJS_optionalArr')): [];
                        for (let i in res.data.transactionInfo) {
                            if (i !== 'selfSelection') {
                                res.data.transactionInfo[i].forEach((element) => {
                                    if (optionalArr.includes(element.contractType)) {
                                        element.selfSelection = true;
                                        res.data.transactionInfo.selfSelection.push(element);
                                    }
                                });
                            }
                        }
                    }
                    this.middleKinfoData = JSON.parse(JSON.stringify(res.data.transactionInfo));
			        this.kInfoData = this.arrangeRule === ''? res.data.transactionInfo: this.arrangeData(res.data.transactionInfo, this.arrangeRule);
                    // ================  已选择和排序处理 end ==================
                    this.buyOptions.bestBuy = this
                        .globalFun
                        .formatFloat(
                            res.data.priceData[curContractType].bestBuy,
                            this.decimalDigits.contractType[curContractType].price
                        );
                    this.sellOptions.bestSell = this
                        .globalFun
                        .formatFloat(
                            res.data.priceData[curContractType].bestSell,
                            this.decimalDigits.contractType[curContractType].price
                        );
                    // 是否需要同步买入卖出价格到input框？
                    if (isKeepPricePace) {
                        [this.buyOptions.price, this.sellOptions.price] = [this.buyOptions.bestBuy, this.sellOptions.bestSell];
                        this.isKeepPricePace = false;
                    }
                    if (callback) {
                        // 默认选中第一条虚拟币，因此赋予数组的第一项contractType
                        callback(res.data.transactionInfo[this.currentExType][0].contractType);
                    }
                }
            });
        },
        // 循环运行getkinfoList
        loopGetKinfoList(cbfollowContype, isResetContractType = true) { // 是否重置contractType
            clearInterval(this.lastKTimer);
            // 获取所有币种最新数据，之后还要循环更新
            this.getKinfoList((type) => {
                // 得出当前首条该展示的数据对应键值
                if (isResetContractType) {
                    this.currentConType = type;
                }
                if (cbfollowContype) {
                    cbfollowContype();
                }
                this.changechartAddress();
                this.getCurrencyIntro();
            });
            this.lastKTimer = setInterval(() => {
                if (this.requestFlag.lastKFlag) {
                    this.getKinfoList();
                }
            }, 2000);
        },
        // 获取用户详细信息
        getUserDetail() {
            getUserDetail().then((res) => {
                if (res && res.success) {
                    this.userData = res.data;
                }
            });
        },
        // 获取余额
        getbalance(callback) {
            getbalance().then(res => {
                if (res.notLogin) {
                    this.isLogin = false;
                }
                if (res.success) {
                    this.isLogin = true;
                    this.balanceData = res.data.account;
                    if (callback) {
                        callback();
                    }
                }
            });
        },
        // 获取平台委托的数据
        getEntrustInfo() {
            this.spinOpt.allEnSpinIsShow = true;
            clearInterval(this.platformEntrustInfoTimer);
            let run = (callback) => {
                this.requestFlag.platformEntrustInfoFlag = false;
                getEntrustInfo().then(res => {
                    this.requestFlag.platformEntrustInfoFlag = true;
                    if (res.success) {
                        let obj = res.data[this.currentConType];
                        if (obj) {
                            this.platformEntrustInfo = {
                                buy: (() => {
                                    let arr = [];
                                    for (let i = 0; i < obj.buyPrice.length; i++) {
                                        arr.push([
                                            obj.buyPrice[i], obj.buyQty[i]
                                        ]);
                                    }
                                    return arr;
                                })(),
                                sell: (() => {
                                    let arr = [];
                                    for (let i = 0; i < obj.sellPrice.length; i++) {
                                        arr.push([
                                            obj.sellPrice[i], obj.sellQty[i]
                                        ]);
                                    }
                                    return arr;
                                })()
                            };
                            // 更新深度图
                            if (this.$refs.chartDepth) {
                                this
                                    .$refs
                                    .chartDepth
                                    .refreshChart();
                            }
                        }
                    }
                    if (callback) {
                        callback();
                    }
                    // 遍历出要展示的信息中最大的数值
                    let showEntrustAmountList = [];
                    for (let i = 0; i < this.entrustListShowCount.length; i++) {
                        if (this.platformEntrustInfo.buy[i]) {
                            showEntrustAmountList.push(this.platformEntrustInfo.buy[i][1] - 0);
                        }
                        if (this.platformEntrustInfo.sell[i]) {
                            showEntrustAmountList.push(this.platformEntrustInfo.sell[i][1] - 0);
                        }
                    }
                    this.platformEntrustInfo.showEntrustMaxAmount = Math.max(...showEntrustAmountList);
                });
            };
            run(() => {
                this.spinOpt.allEnSpinIsShow = false;
            });
            this.platformEntrustInfoTimer = setInterval(() => {
                if (this.requestFlag.platformEntrustInfoFlag) {
                    run();
                }
            }, 2000);
        },
        // 获取用户委托的数据
        getUserEntrustList() {
            this.spinOpt.userEnSpinIsShow = true;
            getUserEntrustList({
                contractType: this.currentConType,
                pageNum: this.userEntrustPageOpt.pageIndex,
                count: this.userEntrustPageOpt.pageSize,
                entrustmentState: this.userEntrustDataType === 'current'? 1: 2
            }).then(res => {
                if (res && res.success) {
                    let group = [];
                    for (let i in res.data[this.currentConType]) {
                        group.push(res.data[this.currentConType][i]);
                    }
                    this.userEntrustData = group;
                    this.userEntrustData.reverse();
                    this.userEntrustPageOpt.total = res.recordTotal;
                }
                this.spinOpt.userEnSpinIsShow = false;
            });
        },
        // 获取平台成交记录
        getTradeRecord() {
            clearInterval(this.recordTimer);
            this.spinOpt.recordSpinIsShow = true;
            let run = (callback) => {
                this.requestFlag.recordFlag = false;
                getTradeRecord({
                    pageNum: this.dealRecordPageOpt.pageIndex,
                    count: this.dealRecordPageOpt.pageSize,
                    contractType: this.currentConType
                }).then(res => {
                    this.requestFlag.recordFlag = true;
                    if (res.success) {
                        if (res.data[this.currentConType]) {
                            this.dealRecordData = res.data[this.currentConType];
                            this.dealRecordPageOpt.total = res.recordTotal;
                        }
                    }
                    if (callback) {
                        callback();
                    }
                });
            };
            run(() => {
                this.spinOpt.recordSpinIsShow = false;
            });
            this.recordTimer = setInterval(() => {
                if (this.requestFlag.recordFlag) {
                    run();
                }
            }, 2000);
        },
        // 获取交易中的配置参数
        getExConfig() {
            getExConfig().then(res => {
                if (res.success) {
                    this.exConfig = res.data.contract;
                }
            });
        },
        // 委托买入
        entrustToBuy() {
            // 判断买入价格框中的条件
            if (this.buyOptions.price === "") {
                Notice.error({title: this.$t('exchange.alertMes.pleaseEnterPrice')});
            }
            //  else if (new Big(this.buyOptions.price - 0).gt(new Big(this.kInfoData.priceData[this.currentConType].current - 0).mul(1.1))) {
            //     Notice.error({title: this.$t('exchange.alertMes.buyBox.priceFloatMax')});
            // } else if (new Big(this.buyOptions.price - 0).lt(new Big(this.kInfoData.priceData[this.currentConType].current - 0).mul(0.9))) {
            //     Notice.error({title: this.$t('exchange.alertMes.buyBox.priceFloatMin')});
            // } 
            else if (this.buyOptions.Qty === "") {
                // 判断买入数量框中的条件
                Notice.error({title: this.$t('exchange.alertMes.buyBox.pleaseEnterAmount')});
            } 
            else if (new Big(this.buyOptions.Qty - 0).lt(this.exConfig[this.currentConType].minBuyAmount - 0)) {
                Notice.error({title: `${this.$t('exchange.alertMes.buyBox.minBuyAmount')}${this.exConfig[this.currentConType].minBuyAmount}`});
            } 
            else if (new Big(this.buyOptions.Qty - 0).gt(this.buyMaximum - 0)) {
                Notice.error({
                    title: `${this.$t('exchange.alertMes.buyBox.maxBuyAmount')}${this
                        .globalFun
                        .formatFloat(this.buyMaximum, this.decimalDigits.contractType[this.currentConType]? this.decimalDigits.contractType[this.currentConType].amount: 8)}`
                });
            } else {
                if (!this.userData.paySet && this.userData.status === 3) {
                    location.href = `./user_center.html#/guide`;
                    return;
                } else if (!this.userData.paySet) {
                    location.href = `./user_center.html#/guide?name=setPayPassword`;
                    return;
                } else if (this.userData.status === 3) {
                    location.href = `./user_center.html#/guide`;
                    return;
                }
                this.payPwdPopupOptions.payType = 'buy';
                this.payPwdPopupOptions.payPwdPopupVisible = true;
                setTimeout(() => {
                    this.$refs.pwdInput.focus();
                }, 100);
            }
        },
        // 委托卖出
        entrustToSell() {
            // 判断买入价格框中的条件
            if (this.sellOptions.price === "") {
                Notice.error({title: this.$t('exchange.alertMes.pleaseEnterPrice')});
            }
            //  else if (new Big(this.sellOptions.price - 0).gt(new Big(this.kInfoData.priceData[this.currentConType].current - 0).mul(1.1))) {
            //     Notice.error({title: this.$t('exchange.alertMes.sellBox.priceFloatMax')});
            // } else if (new Big(this.sellOptions.price - 0).lt(new Big(this.kInfoData.priceData[this.currentConType].current - 0).mul(0.9))) {
            //     Notice.error({title: this.$t('exchange.alertMes.sellBox.priceFloatMin')});
            // }
             else if (this.sellOptions.Qty === "") {
                // 判断买入数量框中的条件
                Notice.error({title: this.$t('exchange.alertMes.sellBox.pleaseEnterAmount')});
            } 
            else if (new Big(this.sellOptions.Qty - 0).lt(this.exConfig[this.currentConType].minSellAmount - 0)) {
                Notice.error({title: `${this.$t('exchange.alertMes.sellBox.minSellAmount')}${this.exConfig[this.currentConType].minSellAmount}`});
            }
             else if (new Big(this.sellOptions.Qty - 0).gt(this.sellMaximun - 0)) {
                Notice.error({
                    title: `${this.$t('exchange.alertMes.sellBox.maxSellAmount')}${this
                        .globalFun
                        .formatFloat(this.sellMaximun, this.decimalDigits.contractType[this.currentConType]? this.decimalDigits.contractType[this.currentConType].amount: 8)}`
                });
            } else {
                if (!this.userData.paySet && this.userData.status === 3) {
                    location.href = `./user_center.html#/guide`;
                    return;
                } else if (!this.userData.paySet) {
                    location.href = `./user_center.html#/guide?name=setPayPassword`;
                    return;
                } else if (this.userData.status === 3) {
                    location.href = `./user_center.html#/guide`;
                    return;
                }
                 this.payPwdPopupOptions.payType = 'sell';
                 this.payPwdPopupOptions.payPwdPopupVisible = true;
                 setTimeout(() => {
                    this.$refs.pwdInput.focus();
                }, 100);
            }
        },
        // 监控密码框输入情况
        enterPayPassword() {
            if (this.payPwdPopupOptions.payPassword.length >=6) {
                this.payPwdPopupOptions.disabled = true;
                this.payPwdPopupOptions.loading = true;
                if (this.payPwdPopupOptions.payType === 'buy') {
                    setOrder({
                        bsFlag: 1,
                        orderPrice: this.buyOptions.price - 0,
                        orderQty: this.buyOptions.Qty - 0,
                        orderType: 1,
                        contractType: this.currentConType,
                        passwd: md5(this.payPwdPopupOptions.payPassword)
                    }).then(res => {
                        setTimeout(() => {
                            if (res && res.success) {
                                Notice.success({
                                    title: this.$t('exchange.alertMes.exchangeMes'), 
                                    desc: this.$t('exchange.alertMes.buyBox.entrustSuccess')
                                });
                                // 交易成功以后，要更新相关联的一些信息
                                this.getbalance();
                                this.getUserEntrustList();
                                this.getEntrustInfo();
                                // 清空当前填入的信息
                                this.buyOptions.password = "";
                                this.buyOptions.price = '';
                                this.buyOptions.Qty = '';
                                this.payPwdPopupOptions.payPwdPopupVisible = false;
                                this.$refs.buySlider.setVal(0);
                            } else {
                                this.buyOptions.password = "";
                                this.payPwdPopupOptions.payPwdPopupVisible = false;
                            }
                        }, 500);
                    });
                } else {
                    setOrder({
                        bsFlag: 2,
                        orderPrice: this.sellOptions.price - 0,
                        orderQty: this.sellOptions.Qty - 0,
                        orderType: 1,
                        contractType: this.currentConType,
                        passwd: md5(this.payPwdPopupOptions.payPassword)
                    }).then(res => {
                        setTimeout(() => {
                            if (res.success) {
                                Notice.success({
                                    title: this.$t('exchange.alertMes.exchangeMes'), 
                                    desc: this.$t('exchange.alertMes.sellBox.entrustSuccess')
                                });
                                // 交易成功以后，要更新相关联的一些信息
                                this.getbalance();
                                this.getUserEntrustList();
                                this.getEntrustInfo();
                                // 清空当前填入的信息
                                this.sellOptions.password = "";
                                this.sellOptions.price = '';
                                this.sellOptions.Qty = '';
                                this.payPwdPopupOptions.payPwdPopupVisible = false;
                                this.$refs.sellSlider.setVal(0);
                            } else {
                                this.sellOptions.password = "";
                                this.payPwdPopupOptions.payPwdPopupVisible = false;
                            }
                        }, 500);
                    });
                }
            }
        },
        // 取消委托
        cancelOrder(orderId) {
            Modal.confirm({
                title: this.$t('exchange.alertMes.cancelEntrust'),
                content: this.$t('exchange.alertMes.confirmCancelEntrust'),
                loading: true,
                onOk: () => {
                    cancelOrder({orderId: orderId, contractType: this.currentConType}).then(
                        res => {
                            setTimeout(() => {
                                Modal.remove();
                                if (res.success) {
                                    Notice.success(
                                        {title: this.$t('exchange.alertMes.cancelEntrust'), desc: this.$t('exchange.alertMes.cancelEntrustSuccess')}
                                    );
                                    // 撤销成功的话，更新用户当前委托列表，更新平台当前委托列表
                                    this.getbalance();
                                    this.getUserEntrustList();
                                    this.getEntrustInfo();
                                } else {
                                    Notice.error(
                                        {title: this.$t('exchange.alertMes.cancelEntrust'), desc: this.$t('exchange.alertMes.cancelEntrustFaild')}
                                    );
                                }
                            }, 1000);
                        }
                    );
                }
            });
        },
        // 计算比例
        calculateRate(open, close) {
            if (open - 0 === 0) {
                return `+0.00%`;
            } else {
                let val = new Big(close - 0).minus(open - 0).div(open - 0);
                return val >= 0
                ? `+${(new Big(val).mul(100).toFixed(2))}%`
                : `${(new Big(val).mul(100).toFixed(2))}%`;
            } 
        },
        // formatNum, 强制改变输入信息
        formatNum(val, len) {
            let reg = new RegExp(`^\\d+\\.?\\d{0,${len}}$`);
            if (reg.test(val) && !isNaN(val)) {
                if (len === 0) {
                    return parseInt(val);
                } else {
                    return val;
                }
            } else if (/\./.test(val) && val.match(/\./).length > 1) {
                return val.substring(0, val.length - 2);
            } else {
                return val.substring(0, val.length - 1);
            }
        },
        // 切换资金密码框状态
        pwdPopupVisibleChange(status) {
            if (!status) {
                this.payPwdPopupOptions.payType = '';
                this.payPwdPopupOptions.payPassword = '';
                this.payPwdPopupOptions.disabled = false;
                this.payPwdPopupOptions.loading = false;
            }
        },
        // 改变是否选中状态
		changeOptionalStatus(item) {
			let mItem = Object.assign({}, item);
            // 为了效果立刻更新当前数据
			this.kInfoData[this.currentExType].forEach((element) => {
				if (element.contractType === item.contractType) {
					element.selfSelection = !element.selfSelection;
				}
			});
			// 所有操作需要对自选页面进行更新
			if (this.currentExType === 'selfSelection') {
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
		},
        // 跳转页面
        redirect(type, path) {
            switch(type) {
                case 'dispointBuy':
                    location.href = `./fund.html#/balance?currency=${this.currencyTypeGroup[this.contractTypeGroup[this.currentConType].split('_')[0]]}`;
                    break;
                case 'dispointSell':
                    location.href = `./fund.html#/balance?currency=${this.currencyTypeGroup[this.contractTypeGroup[this.currentConType].split('_')[1]]}`;
                    break;
                default:
                    break;
            }
        }
    },
    watch: {
        "buyOptions.price" (newVal, oldVal) {
            if (newVal) {
                this.buyOptions.price = this.formatNum(
                    newVal,
                    this.decimalDigits.contractType[this.currentConType].price
                );
            }
        },
        "buyOptions.Qty" (newVal, oldVal) {
            if (newVal) {
                this.buyOptions.Qty = this.formatNum(
                    newVal,
                    this.decimalDigits.contractType[this.currentConType].amount
                );
                let sliderVal = this.buyOptions.Qty - 0 > 0 && this.buyMaximum - 0 > 0? new Big(newVal).div(this.buyMaximum).mul(100): 0;
                this.$refs.buySlider.setVal(sliderVal - 0);
            }
        },
        "buyOptions.wareVal"(newVal, oldval) {
            if (newVal) {
                this.buyOptions.Qty = this.globalFun.formatFloat(
                    new Big(newVal).div(100).mul(this.buyMaximum),
                    this.decimalDigits.contractType[this.currentConType].amount
                );
            }
        },
        "sellOptions.price" (newVal, oldVal) {
            if (newVal) {
                this.sellOptions.price = this.formatNum(
                    newVal,
                    this.decimalDigits.contractType[this.currentConType].price
                );
            }
        },
        "sellOptions.Qty" (newVal, oldVal) {
            if (newVal) {
                this.sellOptions.Qty = this.formatNum(
                    newVal,
                    this.decimalDigits.contractType[this.currentConType].amount
                );
                let sliderVal = this.sellOptions.Qty - 0 > 0 && this.sellMaximun - 0 > 0? new Big(newVal).div(this.sellMaximun).mul(100): 0;
                this.$refs.sellSlider.setVal(sliderVal - 0);
            }
        },
        "sellOptions.wareVal"(newVal, oldval) {
            if (newVal) {
                this.sellOptions.Qty = this.globalFun.formatFloat(
                    new Big(newVal).div(100).mul(this.sellMaximun),
                    this.decimalDigits.contractType[this.currentConType].amount
                );
            }
        },
        arrangeRule(newVal, oldVal) {
			this.kInfoData = this.arrangeData(this.middleKinfoData, newVal);
		},
        currentConType() {
            this.isKeepPricePace = true;
            this.$refs.buySlider.setVal(0);
            this.$refs.sellSlider.setVal(0);
        }
    },
    computed: {
        buyMaximum() {
            if (this.balanceData[[this.currencyTypeGroup[this.currentExType]]] && this.buyOptions.price !== "" && this.buyOptions.price - 0 !== 0) {
                return this.globalFun.scientificToNumber(new Big(this.balanceData[[this.currencyTypeGroup[this.currentExType]]].balance - 0).div(this.buyOptions.price - 0));
            } else {
                return 0;
            }
        },
        buyCostCount() {
            return new Big(this.buyOptions.price - 0).mul(this.buyOptions.Qty - 0);    
        },
        buyBtnDisabled() {
            return !this.isLogin;
        },
        sellMaximun() {
            if (this.contractTypeGroup[this.currentConType]) {
                let key = this.currencyTypeGroup[
                    this
                        .contractTypeGroup[this.currentConType]
                        .split("_")[1]
                ];
                if (this.balanceData[key]) {
                    return this.balanceData[key].balance;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        },
        sellCostCount() {
            return new Big(this.sellOptions.price - 0).mul(this.sellOptions.Qty - 0);    
        },
        sellBtnDisabled() {
            return !this.isLogin;
        }
    },
    components: {
        "com-header": header,
        "com-footer": footer,
        'i-button': Button,
        slider,
        Layout,
        Spin,
        Sider,
        Page,
        Content,
        Select,
        Option,
        chartDepth,
        Modal
        
    }
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../common/settings/colorOptions.scss";
#app {
    width: 100%;
    color: #ffffff;
    min-height: 100%;
    background-color: #1f232d;
    transition: background-color 0.5s;
    .header-wraper {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
    }
    .container {
        width: 100%;
        padding: 78px 14px 0;
        box-sizing: border-box;
        .notice {
            width: 100%;
            height: 48px;
            background-color: #1a1e28;
            transition: background-color 0.5s;
            border-radius: 4px;
            display: flex;
            margin: 12px 0;
            .sys-title {
                height: 100%;
                color: #333333;
                display: flex;
                align-items: center;
                .icon {
                    width: 24px;
                    height: 24px;
                    background-image: url("../../common/assets/images/announcement.png");
                    margin: 0 12px;
                }
                .text {
                    color: #ffffff;
                    font-size: 16px;
                    line-height: 16px;
                    margin-right: 26px;
                }
            }
            .nxt {
                color: #ffffff;
                height: 48px;
                line-height: 48px;
                font-size: 12px;
            }
        }
        .staticstics-and-handlearea {
            width: 100%;
            height: 1200px;
            margin-bottom: 10px;
            .left-sider-wraper {
                width: 356px;
                height: 1200px;
                top: 0;
                left: 0;
                background-color: #1f232d;
                transition: background-color 0.5s;
                border-radius: 4px;
                .left-sider {
                    width: 100%;
                    height: 1200px;
                    transition: background-color 0.5s;
                    padding-bottom: 25px;
                    .lastetdata-wraper {
                        background-color: #1a1e28;
                        transition: background-color 0.5s;
                        .tab {
                            width: 100%;
                            height: 60px;
                            display: flex;
                            overflow: hidden;
                            .t-member {
                                flex: 1;
                                height: 60px;
                                line-height: 60px;
                                text-align: center;
                                border-bottom: 2px solid #292c33;
                                cursor: pointer;
                                .text {
                                    color: #ffffff;
                                    font-size: 16px;
                                }
                                &.active {
                                    border-bottom: 2px solid #ffffff;
                                }
                            }
                        }
                        .balance-wrap {
                            width: 100%;
                            background-color: #1a1e28;
                            transition: background-color 0.5s;
                            padding: 0 17px;
                            .balance {
                                width: 100%;
                                margin: 0 auto;
                                padding-top: 27px;
                                p {
                                    width: 100%;
                                    height: 40px;
                                    color: #ffffff;
                                    font-size: 16px;
                                    line-height: 43px;
                                    .ltitle {
                                        color: #747474;
                                    }
                                }
                                .recharge {
                                    font-size: 16px;
                                    height: 38px;
                                    line-height: 38px;
                                    text-align: center;
                                    color: #ffffff;
                                    background-color: #ff8a00;
                                    transition: background-color 0.5s;
                                    border-radius: 2px;
                                    border: none;
                                    cursor: pointer;
                                    margin-top: 17px;
                                    margin-bottom: 40px;
                                    a {
                                        color: #ffffff;
                                        display: block;
                                    }
                                }
                            }
                            .toLoginBox {
                                width: 100%;
                                height: 208px;
                                line-height: 208px;
                                text-align: center;
                                font-size: 16px;
                                a {
                                    color: #ff8903;
                                }
                            }
                            h3 {
                                width: 100%;
                                height: 76px;
                                font-size: 16px;
                                color: #ffffff;
                                display: flex;
                                align-items: center;
                                padding: 0 17px;
                                border-top: 2px solid #292c33;
                                .point {
                                    width: 5px;
                                    height: 5px;
                                    border-radius: 50%;
                                    background-color: #ffffff;
                                    transition: background-color 0.5s;
                                    margin-right: 8px;
                                }
                            }
                        }
                        .price-list-wrap {
                            width: 100%;
                            padding: 0 17px;
                            box-sizing: border-box;
                            margin-top: 18px;
                            .art {
                                width: 100%;
                                height: 16px;
                                line-height: 16px;
                                display: flex;
                                margin-bottom: 18px;
                                .t-member {
                                    height: 16px;
                                    line-height: 16px;
                                    font-size: 14px;
                                    color: #747474;
                                    text-align: center;
                                    &.bz {
                                        text-align: left;
                                        span {
                                            margin-left: 5px;
                                        }
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
                                    &:nth-child(1) {
                                        width: 100px;
                                    }
                                    &:nth-child(2) {
                                        flex: 1;
                                        text-align: left;
                                    }
                                    &:nth-child(3) {
                                        flex: 1;
                                        text-align: right;
                                        .upanddown-outer {
                                            margin-right: 38px;
                                        }
                                    }
                                }
                            }
                            .list {
                                width: 100%;
                                height: 495px;
                                box-sizing: border-box;
                                .t-member {
                                    width: 100%;
                                    height: 34px;
                                    font-size: 12px;
                                    display: flex;
                                    align-items: center;
                                    cursor: pointer;
                                    .first {
                                        display: flex;
                                        align-items: center;
                                        .choosebtn {
                                            width: 10px;
                                            height: 10px;
                                            border: 1px solid #cccccc;
                                            border-radius: 50%;
                                            margin-left: 10px;
                                            margin-right: 4px;
                                            cursor: pointer;
                                            &.bechoose::after {
                                                content: '';
                                                display: block;
                                                width: 6px;
                                                height: 6px;
                                                border-radius: 50%;
                                                background-color: #ff8a00;
                                                margin: 1px auto;
                                            }
                                        }
                                    }
                                    &:hover {
                                        background-color: #292c33;
                                        transition: background-color 0.5s;
                                    }
                                    &.active {
                                        background-color: #292c33;
                                        transition: background-color 0.5s;
                                    }
                                    .con {
                                        flex: 1;
                                        text-align: center;
                                    }
                                    > div {
                                        &:nth-child(1) {
                                            width: 100px;
                                            text-align: center;
                                        }
                                        &:nth-child(2) {
                                            text-align: left;
                                            span {
                                                // margin-right: 48px;
                                            }
                                        }
                                        &:nth-child(3) {
                                            text-align: right;
                                            span {
                                                margin-right: 48px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .deal-record-wraper {
                        width: 100%;
                        background-color: #1a1e28;
                        padding: 1px 18px;
                        box-sizing: border-box;
                        .deal-record {
                            width: 100%;
                            border-top: 2px solid #292c33;
                            .empty {
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100px;
                                line-height: 100px;
                                font-size: 16px;
                                text-align: center;
                                z-index: 999;
                            }
                            .con {
                                width: 100%;
                                height: 590px;
                                background-color: #1a1e28;
                                .art {
                                    width: 100%;
                                    height: 48px;
                                    display: flex;
                                    .t-member {
                                        flex: 1;
                                        color: #ffffff;
                                        font-size: 14px;
                                        line-height: 48px;
                                        &:nth-child(1) {
                                            text-indent: 10px;
                                        }
                                        &:nth-child(2) {
                                            text-indent: 20px;
                                        }
                                        &:nth-child(3) {
                                            text-indent: 20px;
                                        }
                                    }
                                }
                                .list {
                                    width: 100%;
                                    height: 542px;
                                    overflow: auto;
                                    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
                                    &::-webkit-scrollbar
                                    {
                                        width: 8px;
                                        height: 8px;
                                        background-color: #1a1e28;
                                    }
                                    
                                    /*定义滚动条轨道 内阴影+圆角*/
                                    &::-webkit-scrollbar-track
                                    {
                                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                                        border-radius: 2px;
                                        background-color: #292c33;
                                    }
                                    
                                    /*定义滑块 内阴影+圆角*/
                                    &::-webkit-scrollbar-thumb
                                    {
                                        border-radius: 2px;
                                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                                        background-color: #555;
                                    }
                                    .t-member {
                                        width: 100%;
                                        display: flex;
                                        height: 34px;
                                        div {
                                            flex: 1;
                                            line-height: 34px;
                                            font-size: 12px;
                                            color: #747474;
                                            &:nth-child(1) {
                                                text-indent: 10px;
                                            }
                                            &:nth-child(2) {
                                                text-indent: 10px;
                                            }
                                            &:nth-child(3) {
                                                text-indent: 14px;
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }
            .middle-content {
                width: 100%;
                padding: 0 370px;
                box-sizing: border-box;
                .chart-wrap-outer {
                    width: 100%;
                    box-sizing: border-box;
                    overflow: hidden;
                    .com-info {
                        width: 100%;
                        height: 60px;
                        background-color: #1a1e28;
                        transition: background-color 0.5s;
                        border-radius: 2px;
                        .info-list {
                            height: 60px;
                            display: flex;
                            align-items: center;
                            margin-left: 13px;
                            .t-member {
                                color: #ffffff;
                                font-size: 14px;
                                padding: 0 13px;
                            }
                        }
                    }
                    .chart-info {
                        width: 100%;
                        background-color: #1a1e28;
                        transition: background-color 0.5s;
                        border-radius: 2px;
                        padding-left: 10px;
                        box-sizing: border-box;
                        .options {
                            width: 100%;
                            height: 50px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            &.depthType {
                                justify-content: flex-end;
                            }
                            .interval {
                                width: 500px;
                                display: flex;
                                .t-member {
                                    flex: 1;
                                    height: 22px;
                                    line-height: 22px;
                                    font-size: 12px;
                                    color: #747474;
                                    text-align: center;
                                    cursor: pointer;
                                    &:hover .t-member-inner {
                                        color: #ffffff;
                                        background-color: #ffcc8e;
                                        transition: background-color 0.5s;
                                    }
                                    &.active .t-member-inner {
                                        color: #ffffff;
                                        background-color: #ffcc8e;
                                        transition: background-color 0.5s;
                                    }
                                    .t-member-inner {
                                        width: 44px;
                                        height: 100%;
                                    }
                                }
                            }
                            .chartswitch {
                                display: flex;
                                align-items: center;
                                .t-member {
                                    font-size: 14px;
                                    height: 14px;
                                    line-height: 14px;
                                    color: #6f7070;
                                    cursor: pointer;
                                    &.active {
                                        color: #ffffff;
                                    }
                                    &.candlestick {
                                        padding-right: 11px;
                                        border-right: 2px solid #6f7070;
                                    }
                                    &.depth {
                                        padding-left: 11px;
                                        padding-right: 10px;
                                    }
                                }
                            }
                        }
                        .chart-wrap {
                            width: 100%;
                            .chart-main {
                                width: 100%;
                                height: 600px;
                                .iframe {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .chart-depth {
                                width: 100%;
                                height: 600px;
                                top: 0;
                                right: 0;
                            }
                            .noData {
                                width: 100%;
                                height: 100%;
                                color: #ffffff;
                                font-size: 16px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                    }
                }
                .exbox-wraper {
                    width: 100%;
                    height: 477px;
                    background-color: #1a1e28;
                    transition: background-color 0.5s;
                    margin-top: 14px;
                    border-radius: 2px;
                    .exbox {
                        width: 100%;
                        height: 100%;
                        font-size: 14px;
                        color: #ffffff;
                        padding: 0 24px;
                        box-sizing: border-box;
                        .t-member {
                            width: 47.3%;
                            flex: 1;
                            height: 100%;
                            .t-wraper {
                                display: flex;
                                align-items: center;
                                margin-top: 14px;
                                &:first-child {
                                    margin-top: 10px;
                                }
                                .t-title {
                                    width: 76px;
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                }
                                .valanddispoint {
                                    width: 100%;
                                    height: 24px;
                                    color: #ff8a00;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    .val {
                                        width: 160px;
                                        font-weight: 600;
                                        font-size: 13px;
                                    }
                                    .dispoint {
                                        width: 30%;
                                        max-width: 90px;
                                        height: 22px;
                                        line-height: 19px;
                                        text-align: center;
                                        border: 1px solid #ff8a00;
                                        border-radius: 2px;
                                        cursor: pointer;
                                    }
                                }
                                input {
                                    width: 100%;
                                    height: 42px;
                                    font-size: 14px;
                                    text-indent: 13px;
                                    color: #ffffff;
                                    background-color: #292c33;
                                    transition: background-color 0.5s;
                                    border-radius: 2px;
                                    border: none;
                                }
                            }
                            .title {
                                width: 100%;
                                height: 60px;
                                font-size: 16px;
                                font-weight: 400;
                                display: flex;
                                align-items: center;
                                .point {
                                    width: 5px;
                                    height: 5px;
                                    border-radius: 50%;
                                    background-color: #ffffff;
                                    transition: background-color 0.5s;
                                    margin-right: 8px;
                                }
                            }
                            .best-price {
                                width: 100%;
                                .text {
                                    height: 38px;
                                    line-height: 38px;
                                    margin-bottom: 9px;
                                }
                            }
                            .canbuy {
                                width: 100%;
                                height: 56px;
                                line-height: 56px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .all {
                                    height: 24px;
                                    line-height: 24px;
                                    color: #ff8a00;
                                    background-color: transparent;
                                    border: 1px solid #ff8a00;
                                    border-radius: 2px;
                                    padding: 0 20px;
                                    cursor: pointer;
                                }
                            }
                            .count {
                                width: 100%;
                                height: 56px;
                                p {
                                    height: 56px;
                                    line-height: 56px;
                                    .val {
                                        color: #ff8a00;
                                    }
                                }
                            }
                            .slider {
                                margin-top: 10px;
                                margin-bottom: 34px;
                            }
                        }
                        .buy {
                            input:focus {
                                background: "red" !important;
                                border: 1px solid $downColor;
                                box-shadow: 0 0 3px $downColor;
                            }
                            .btn {
                                background-color: $downColor;
                                transition: background-color 0.5s;
                            }
                        }
                        .sell {
                            input:focus {
                                background: "red" !important;
                                border: 1px solid $upColor;
                                box-shadow: 0 0 3px $upColor;
                            }
                            .btn {
                                background-color: $upColor;
                                transition: background-color 0.5s;
                            }
                        }
                    }
                }
            }
            .right-sider-wraper {
                width: 356px;
                top: 0;
                right: 0;
                background-color: #1a1e28;
                transition: background-color 0.5s;
                border-radius: 2px;
                .current-price {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    border-bottom: 2px solid #292c33;
                    .point {
                        width: 5px;
                        height: 5px;
                        background-color: #ffffff;
                        transition: background-color 0.5s;
                        border-radius: 50%;
                        margin-right: 8px;
                        margin-left: 18px;
                    }
                }
                .right-sider {
                    width: 100%;
                    height: 1134px;
                    padding: 0 18px;
                    box-sizing: border-box;
                    border-radius: 2px;
                    .title-list {
                        width: 100%;
                        height: 62px;
                        font-size: 14px;
                        color: #ffffff;
                        display: flex;
                        align-items: center;
                        margin-top: 6px;
                        .title-member {
                            flex: 3;
                            text-align: center;
                        }
                        .title-member:nth-child(1) {
                            flex: 2;
                        }
                    }
                    .bslist {
                        width: 100%;
                        padding-bottom: 24px;
                        .bslist-member {
                            width: 100%;
                            height: 34px;
                            display: flex;
                            position: relative;
                            align-items: center;
                            margin-bottom: 4px;
                            &.hv {
                                cursor: pointer;
                            }
                            .m-member {
                                flex: 3;
                                display: flex;
                                justify-content: center;
                            }
                            .m-member:first-child {
                                flex: 2;
                            }
                            .rate {
                                height: 100%;
                                top: 0;
                                right: 0;
                                opacity: 0.3;
                            }
                        } 
                        &.entrust-sell-list {
                            border-bottom: 2px solid #1f222b;
                        }
                        &.entrust-buy-list {
                            padding-top: 28px;
                        }
                    }
                }
            }
        }
        .entrusts-record-wraper {
            width: 100%;
            margin-top: 14px;
            .entrusts-record {
                width: 100%;
                background-color: #1a1e28;
                transition: background-color 0.5s;
                border-radius: 2px;
                .type-select {
                    width: 100%;
                    height: 60px;
                    border-bottom: 2px solid #292c33;
                    margin-bottom: 18px;
                    .s-member {
                        width: 200px;
                        height: 60px;
                        line-height: 60px;
                        color: #ffffff;
                        font-size: 14px;
                        text-align: center;
                        cursor: pointer;
                        &.active {
                            .line {
                                width: 100%;
                                height: 2px;
                                background-color: #ffffff;
                                transition: background-color 0.5s;
                                top: 60px;
                                left: 0;
                            }
                        }
                    }
                }
                .empty {
                        width: 100%;
                        height: 100px;
                        line-height: 100px;
                        font-size: 16px;
                        text-align: center;
                    }
                .con {
                    width: 100%;
                    min-height: 268px;
                    .art {
                        width: 100%;
                        height: 48px;
                        display: flex;
                        margin-top: 3px;
                        .t-member {
                            flex: 1;
                            height: 48px;
                            line-height: 48px;
                            font-size: 14px;
                            font-weight: 600;
                            text-align: center;
                            &:nth-child(1) {
                                flex: 1;
                            }
                            &:nth-child(3),
                            &:nth-child(4),
                            &:nth-child(5),
                            &:nth-child(6) {
                                text-align: right;
                                span {
                                    margin-right: 20%;
                                }
                            }
                        }
                    }
                    .list {
                        width: 100%;
                        color: #747474;
                        font-size: 14px;
                        .t-member {
                            height: 44px;
                            line-height: 44px;
                            display: flex;
                            div {
                                flex: 1;
                                height: 44px;
                                line-height: 44px;
                                text-align: center;
                                &:first-child {
                                    flex: 1;
                                }
                                &:nth-child(3),
                                &:nth-child(4),
                                &:nth-child(5),
                                &:nth-child(6) {
                                    text-align: right;
                                    span {
                                        margin-right: 20%;
                                    }
                                }
                                &:last-child {
                                    button {
                                        height: 20px;
                                        line-height: 20px;
                                        font-size: 12px;
                                        color: #ff8a00;
                                        background-color: #1a1e28;
                                        transition: background-color 0.5s;
                                        border: 1px solid #ff8a00;
                                        border-radius: 2px;
                                        padding: 0 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .page {
                width: 100%;
                height: 68px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    .coinprofile {
        width: 100%;
        height: 318px;
        background-image: url('../../common/assets/images/coinprofilebanner-black.png');
        margin-top: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .left-part {
            .coin-name {
                color: #ffffff;
                line-height: 34px;
                margin-bottom: 24px;
                .fname {
                    font-size: 34px;
                    font-weight: 600;
                }
                .sname {
                    font-size: 24px;
                    font-weight: 400;
                    margin-left: 28px;
                }
            }
            .line {
                width: 120px;
                height: 3px;
                background: linear-gradient(to right, #ffa323, #ff6a73);
            }
            .dpinfo {
                width: 558px;
                height: 80px;
                background-color: #292c33;
                margin-top: 60px;
                display: flex;
                align-items: center;
                .t-member {
                    flex: 1;
                    .val {
                        font-size: 18px;
                        line-height: 18px;
                        text-align: center;
                    }
                    .title {
                        font-size: 12px;
                        line-height: 12px;
                        color: #999999;
                        text-align: center;
                        margin-top: 14px;
                    }
                }
            }
        }
        .right-part {
            margin-left: 220px;
            .desc {
                width: 614px;
                color: #999999;
                line-height: 20px;
                .syh, .xyh {
                    display: inline-block;
                    position: relative;
                    width: 0;
                    height: 0;
                    i {
                        position: absolute;
                        font-size: 40px;
                    }
                }
                .syh {
                    top: -20px;
                    left: -20px;
                }
                .xyh {
                    top: 10px;
                }
            }
            .links {
                margin-top: 30px;
                .l-member {
                    height: 24px;
                    display: flex;
                    .ti {
                        width: 75px;
                        color: #999999;
                        text-align: left;
                    }
                    a {
                        color: #ffffff;
                    }
                }
            }
        }
    }
 }

}
#app.light {
    color: #333333;
    background-color: #f5f5fa;
    .container {
        .notice {
            background-color: #ffffff;
            .sys-title {
                color: #333333;
                .icon {
                    background-image: url("../../common/assets/images/announcement-b.png");
                }
                .text {
                    color: #333333;
                }
            }
            .nxt {
                color: #333333;
            }
        }
        .staticstics-and-handlearea {
            .left-sider-wraper {
                background-color: #f0f0f7;
                .left-sider {
                    background-color: #ffffff;
                    .lastetdata-wraper {
                        background-color: #ffffff;
                        .tab {
                            .t-member {
                                border: none;
                                background-color: #f0f0f7;
                                .text {
                                    color: #333333;
                                }
                                &.active {
                                    color: #ff8a00;
                                    background-color: #ffffff;
                                }
                            }
                        }
                        .balance-wrap {
                            background-color: #ffffff;
                            .balance {
                                p {
                                    color: #333333;
                                    .ltitle {
                                        color: #333333;
                                    }
                                }
                                .recharge {
                                    color: #ffffff;
                                    background-color: #ff8a00;
                                }
                            }
                            .toLoginBox {
                                a {
                                    color: #ff8903;
                                }
                            }
                            h3 {
                                color: #333333;
                                border-top: 2px solid #dddddd;
                                .point { 
                                    background-color: #333333;
                                }
                            }
                        }
                        .price-list-wrap {
                            .art {
                                .t-member {
                                    color: #666666;
                                }
                            }
                            .list {
                                .t-member {
                                    &:hover {
                                        background-color: #f0f0f7;
                                    }
                                    &.active {
                                        background-color: #f0f0f7;
                                    }
                                }
                            }
                        }
                    }
                    .deal-record-wraper {
                        background-color: #ffffff;
                        .deal-record {
                            width: 100%;
                            border-top: 2px solid #f6f6fb;
                            .empty {
                                color: #333333;
                            }
                            .con {
                                background-color: #ffffff;
                                .art {
                                    .t-member {
                                        color: #747474;
                                    }
                                }
                                .list {
                                    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
                                    &::-webkit-scrollbar
                                    {
                                        width: 8px;
                                        height: 8px;
                                        background-color: #ffffff;
                                    }
                                    
                                    /*定义滚动条轨道 内阴影+圆角*/
                                    &::-webkit-scrollbar-track
                                    {
                                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
                                        border-radius: 2px;
                                        background-color: #ffffff;
                                    }
                                    
                                    /*定义滑块 内阴影+圆角*/
                                    &::-webkit-scrollbar-thumb
                                    {
                                        border-radius: 2px;
                                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
                                        background-color: #f6f6fb;
                                    }
                                    .t-member {
                                        width: 100%;
                                        display: flex;
                                        height: 34px;
                                        div {
                                            flex: 1;
                                            line-height: 34px;
                                            font-size: 12px;
                                            color: #747474;
                                            &:nth-child(1) {
                                                text-indent: 10px;
                                            }
                                            &:nth-child(2) {
                                                text-indent: 10px;
                                            }
                                            &:nth-child(3) {
                                                text-indent: 14px;
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }
            .middle-content {
                .chart-wrap-outer {
                    .com-info {
                        background-color: #f0f0f7;
                        .info-list {
                            .t-member {
                                color: #333333;
                                &:nth-child(1) {
                                    color: #ff8a00;
                                }
                            }
                        }
                    }
                    .chart-info {
                        background-color: #ffffff;
                        transition: background-color 0.5s;
                        .options {
                            .interval {
                                .t-member {
                                    color: #666666;
                                    &:hover .t-member-inner {
                                        color: #ffffff;
                                        background-color: #ff8a00;
                                    }
                                    &.active .t-member-inner {
                                        color: #ffffff;
                                        background-color: #ff8a00;
                                    }
                                }
                            }
                            .chartswitch {
                                .t-member {
                                    color: #999999;
                                    font-size: 14px;
                                    cursor: pointer;
                                    &.active {
                                        color: #ff8a00;
                                    }
                                    &.candlestick {
                                        border-right: 2px solid #dddddd;
                                    }
                                }
                            }
                        }
                        .chart-wrap {
                            .noData {
                                color: #999999;
                            }
                        }
                    }
                }
                .exbox-wraper {
                    background-color: #ffffff;
                    .shadowbg {
                        width: 100%;
                        height: 56px;
                        background-color: #f0f0f7;
                    }
                    .exbox {
                        color: #333333;
                        z-index: 999;
                        .t-member {
                            .t-wraper  {
                                .t-title {
                                    color: #747474;
                                    input {
                                        color: #747474;
                                    }
                                }
                                &.balance {
                                    .t-title {
                                        color: #333333;
                                    }  
                                }
                            }
                            input {
                                color: #333333;
                                background-color: #ffffff;
                                border: 1px solid #dddddd;
                            }
                            .title {
                                .point {
                                    background-color: #333333;
                                }
                            }
                            .count {
                                p {
                                    .val {
                                        color: #ff8a00;
                                    }
                                }
                            }
                        }
                        .buy {
                            input:focus {
                                background: "red" !important;
                                border: 1px solid $downColor;
                                box-shadow: 0 0 3px $downColor;
                            }
                            .btn {
                                background-color: $downColor;
                                transition: background-color 0.5s;
                            }
                        }
                        .sell {
                            input:focus {
                                background: "red" !important;
                                border: 1px solid $upColor;
                                box-shadow: 0 0 3px $upColor;
                            }
                            .btn {
                                background-color: $upColor;
                            }
                        }
                    }
                }
            }
            .right-sider-wraper {
                background-color: #ffffff;
                .current-price {
                    background-color: #f0f0f7;
                    border: none;
                    .point {
                        background-color: #333333;
                    }
                }
                .right-sider {
                    .title-list {
                        color: #333333;
                    }
                    .bslist {
                        color: #333333;
                        background-color: #ffffff;
                        &.entrust-sell-list {
                            border-bottom: 2px solid #f0f0f7;
                        }
                    }
                }
            }
        }
        .entrusts-record-wraper {
            .entrusts-record {
                background-color: #ffffff;
                .type-select {
                    border: none;
                    background-color: #f0f0f7;
                    .s-member {
                        color: #333333;
                        &.active {
                            background-color: #ffffff;
                            .line {
                                background-color: #ff8a00;
                                top: 0;
                            }
                        }
                    }
                }
                .con {
                    .list {
                        color: #333333;
                        .t-member {
                            div {
                                &:last-child {
                                    button {
                                        color: #ff8a00;
                                        background-color: #ffffff;
                                        border: 1px solid #ff8a00;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
 }
    
}
 .payPwdPopup {
    .popup-content {
        width: 100%;
        .enter-wraper {
            width: 100%;
            height: 46px;
            display: flex;
            justify-content: center;
            margin-top: 48px;
            .hiddeninput {
                opacity: 0;
                left: 50%;
                transform: translateX(-50%);
            }
            .showinput {
                width: 326px;
                height: 44px;
                border: 1px solid #e2e2e2;
                .val-list {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .val-member {
                        width: 54px;
                        height: 26px;
                        border-right: 1px solid #e2e2e2;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:last-child {
                            border: none;
                        }
                        .circle {
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            background-color: #000000;
                        }
                    }
                }
            }
        }
        .loading-wraper {
            width: 100%;
            height: 68px;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
                margin-top: 10px;
            }
        }
    }
}
</style>
 <style> 

.exbox .btn {
    width: 100%;
    height: 43px;
    color: #ffffff !important;
    font-size: 16px;
    border: none;
}
.exbox .ivu-btn {
    color: #ffffff !important;
    border-radius: 2px !important;
}
.exbox .ivu-btn:hover {
    color: #ffffff !important;
}
.deepDark .ivu-page .ivu-page-prev, .deepDark .ivu-page .ivu-page-next, .deepDark .ivu-page-item,.deepDark .ivu-page .ivu-page-options-elevator input{
    background-color: #1f232d !important;
    transition: background-color 0.5s;
}
.deepDark .ivu-page .ivu-page-options-elevator input {
    color: #ffffff !important;
}
.deepDark .ivu-spin {
    background-color: rgba(26, 30, 40, 0.9) !important;
}
.payPwdPopup .ivu-modal {
    padding: 4px !important;
    background-color: #3d3f43 !important;
}
.payPwdPopup .ivu-modal-content {
    border-radius: 0;
}
.payPwdPopup .ivu-modal-header{
    background-color: #f9f9f9 !important;
    padding: 10px 16px !important;
}
.payPwdPopup .ivu-modal-header p {
    color: #666666 !important;
}
.payPwdPopup .ivu-modal-close{
    top: 3px !important;
}
.payPwdPopup .ivu-modal-footer {
    display: none;
}
</style>
