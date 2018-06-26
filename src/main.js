// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './stores'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'
import Highcharts from 'highcharts'
import VueHighcharts from 'vue-highcharts'
import {them} from './tools'

Highcharts.theme = them

Highcharts.setOptions(Highcharts.theme)

Vue.use(VueHighcharts, { Highcharts })

window.moment = require('moment')

window._ = require('lodash')

window.$ = window.jQuery = require('jquery')

require('bootstrap')

const OptionsToasted = {
  theme: 'bubble',
  position: 'bottom-center',
  duration: 4000
}

Vue.use(Toasted, OptionsToasted)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

function pass (expired) {
  return expired > Math.floor(Date.now() / 1000)
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const passport = JSON.parse(window.localStorage.getItem('passport'))
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (passport !== null && passport.token !== null && pass(passport.expired)) {
      if (user !== null) {
        next()
      } else {
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('passport')
        next({name: 'login'})
      }
    } else {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('passport')
      next({name: 'login'})
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
