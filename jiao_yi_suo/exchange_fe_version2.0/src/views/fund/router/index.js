import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//账户余额
const balance = (resolve) => {
	import('./../components/balance.vue').then((module) => {
		resolve(module)
	})
}

//账单明细
const bill = (resolve) => {
	import('./../components/bill.vue').then((module) => {
		resolve(module)
	})
}
// 账单明细 - 法币交易
const OTCBill = (resolve) => {
	import('./../components/OTC_bill.vue').then((module) => {
		resolve(module)
	})
}
// 账单明细 - 法币交易
const EXCBill = (resolve) => {
	import('./../components/EXC_bill.vue').then((module) => {
		resolve(module)
	})
}

// 提现地址管理
const address = (resolve) => {
	import('./../components/address.vue').then((module) => {
		resolve(module)
	})
}
const rountList = new VueRouter({
	mode: "hash",
	routes:[{
		path:"/balance",
		component:balance
	},{
		path:"/bill",
		component:bill,
		children: [{
			path: '/OTCBill',
			component: OTCBill
		},{
			path: '/EXCBill',
			component: EXCBill
		}]
	},{
		path:"/address",
		component:address
	}]
})
export default {
  	rountList
}
