import Vue from 'vue'
import scientificToNumber from '../../common/utils/scientificToNumber'
Vue.filter('formatFloat', function (value = 0, n = 2, type = 'cut') { // cut直接截取， ceil向上取整， floor向下取整， round四舍五入
      // var f = Math.floor(value*Math.pow(10,n))/Math.pow(10,n);
			// var s = f.toString();
			// var s = value.toString();
			// var rs = s.indexOf('.');  
			// if (rs >= 0) {
			// 	if (n === 0) {
			// 		s = s.split('.')[0];
			// 	} else {
			// 		s = s.substr(0, rs + n + 1);
			// 	}
			// }
			 
			// if (rs < 0 && n > 0) {     
			// 	s += '.';   
			// } 
			// for(var i = s.length - s.indexOf('.'); i <= n; i++){
			// 	s += "0";
			// }
						
			let result = Number(value.toString().match(eval("/^\\d+(?:\\.\\d{0,"+ n + 1 +"})?/")))

			switch(type) {
				case 'cut':
					var s = value; 
					if (s === Infinity || s === -Infinity) {
						s = 0;
					}
					s = scientificToNumber(value).toString();
					var rs = s.indexOf('.');  
					if (rs >= 0) {
						if (n === 0) {
							s = s.split('.')[0];
						} else {
							s = s.substr(0, rs + n + 1);
						}
					}
					
					if (rs < 0 && n > 0) {     
						s += '.';   
					} 
					for(var i = s.length - s.indexOf('.'); i <= n; i++){
						s += "0";
					}
					return Number(s).toFixed(n);
				case 'ceil':
					return Number(Math.ceil(result*Math.pow(10,n))/Math.pow(10,n)).toFixed(n);
				case 'floor':
					return Number(Math.floor(result*Math.pow(10,n))/Math.pow(10,n)).toFixed(n);
				case 'round':
					return Number(Math.round(result*Math.pow(10,n))/Math.pow(10,n)).toFixed(n);
				default:
					break;
			}
})