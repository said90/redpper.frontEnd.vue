import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue-apexcharts'
import VueTour from 'vue-tour'
import Vuelidate from 'vuelidate'
import KnobControl from 'vue-knob-control'
import VueDraggable from 'vue-draggable'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMask from 'v-mask'
import VueStringFilter from 'vue-string-filter'
import vco from "v-click-outside"

import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'



// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

Vue.use(vco)

Vue.use(VueStringFilter)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
Vue.use(Vuelidate)
Vue.use(VueTour)
Vue.use(KnobControl)
Vue.use(VueDraggable)
Vue.use(VueMask)
Vue.use(require('vue-chartist'))

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',
    libraries: 'places',
  },
  installComponents: true
})
Vue.component('apexchart', VueApexCharts)

// Uncomment this if you are having api served through other url
// Vue.prototype.$http = require('axios')
// Vue.prototype.$http.defaults.baseURL  = 'http://mock-api.coderthemes.com'

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
