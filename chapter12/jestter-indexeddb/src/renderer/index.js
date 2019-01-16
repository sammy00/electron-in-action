import Vue from 'vue'
import Meta from 'vue-meta'

import App from './App'

import 'materialize-css/dist/css/materialize.min.css'

Vue.config.productionTip = false

Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
}).$mount('#app')
