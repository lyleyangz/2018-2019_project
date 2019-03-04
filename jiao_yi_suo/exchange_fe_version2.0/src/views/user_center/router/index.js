import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//安全中心
const safe = (resolve) => {
  import('./../components/safe.vue').then((module) => {
    resolve(module)
  })
}
//身份认证
const identity = (resolve) => {
  import('./../components/identity.vue').then((module) => {
    resolve(module)
  })
}
//身份认证
const rebate = (resolve) => {
	import('./../components/rebate.vue').then((module) => {
		resolve(module)
	})
}

//设置支付密码
const setPayPassword = (resolve) => {
  import('./../safe/set_pay_password.vue').then((module) => {
    resolve(module)
  })
}
//修改登录密码
const updateLoginPassword = (resolve) => {
  import('./../safe/update_login_password.vue').then((module) => {
    resolve(module)
  })
}
//修改支付密码
const updatePayPassword = (resolve) => {
  import('./../safe/update_pay_password.vue').then((module) => {
    resolve(module)
  })
}
//忘记支付密码
const forgetPayPassword = (resolve) => {
  import('./../safe/forget_pay_password.vue').then((module) => {
    resolve(module)
  })
}
//设置电子邮箱
const setEmail = (resolve) => {
  import('./../safe/set_email.vue').then((module) => {
    resolve(module)
  })
}
//修改电子邮箱
const updateEmail = (resolve) => {
  import('./../safe/update_email.vue').then((module) => {
    resolve(module)
  })
}

//引导
const guide = (resolve) => {
  import('./../components/guide.vue').then((module) => {
    resolve(module)
  })
}


const rountList = new VueRouter({
	//linkActiveClass: "active",
	mode: "hash",
	routes:[
		// {
		//   path:"/",
		//   component:userCenter
		//  },
		{
			path: "/safe",
			component: safe,
		},
		{
			path:"/identity",
			component:identity
		},
		{
			path:"/rebate",
			component:rebate
		},
		{
			path:"/setPayPassword",
			component:setPayPassword
		},
		{
			path:"/updatePayPassword",
			component:updatePayPassword
		},
		{
			path:"/updateLoginPassword",
			component:updateLoginPassword
		},
		{
			path:"/forgetPayPassword",
			component:forgetPayPassword
		},
		{
			path:"/setEmail",
			component:setEmail
		},
		{
			path:"/updateEmail",
			component:updateEmail
		},
		{
			path:"/guide",
			component:guide
		},
		
	]
})
export default {
  	rountList
}