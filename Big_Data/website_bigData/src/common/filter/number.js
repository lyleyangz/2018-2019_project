import Vue from 'vue'
Vue.filter('number', function (value, digit) {
  if (isNaN(parseFloat(value))) {
    return 0
  }
  return parseFloat(value).toFixed(digit || 2)
})

