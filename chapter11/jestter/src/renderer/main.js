import Vue from 'vue'
import Meta from 'vue-meta'

import App from './App'
import router from './router'
import store from './store'

// import './style/style.stylus'
import 'materialize-css/dist/css/materialize.min.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
