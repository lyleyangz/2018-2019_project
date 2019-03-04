import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const buy = (resolve) => {
	import('./../components/buy.vue').then((module) => {
		resolve(module)
	})
}
const pay = (resolve) => {
	import('./../components/pay.vue').then((module) => {
		resolve(module)
	})
}
const result = (resolve) => {
	import('./../components/result.vue').then((module) => {
		resolve(module)
	})
}
const rountList = new VueRouter({
	mode: "hash",
	routes:[{
		path:"/	",
		component:buy
	},{
		name:"buy",
		path:"/buy",
		component:buy
	},{
		name:"pay",
		path:"/pay/:orderId",
		component:pay
	},{
		name:"result",
		path:"/result",
		component:result
	}]
})
export default {
	rountList
}
