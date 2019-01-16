import Vue from 'vue'
import Meta from 'vue-meta'

import App from './App'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
}).$mount('#app')
