import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/main'
import packing from '@/views/packing'
import login from '@/views/login'
import users from '@/views/users'
import permits from '@/views/permits' // permidos de los usuarios
import reception from '@/views/reception' // recepcion de producto
import clients from '@/views/clients'
import calibrated from '@/views/calibrated'
import setings from '@/views/setings'
import showers from '@/views/showers'
import supplies from '@/views/supplies'
import emptybins from '@/views/emptybins'
import emptybinsdispatch from '@/views/emptybinsdispatch'
import dispatchs from '@/views/dispatchs'
import suppliedispatchs from '@/views/suppliedispatchs'
import transfers from '@/views/transfers'
import reports from '@/views/reports'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/login', name: 'login', component: login},
    {path: '/', name: 'home', component: main, meta: { requiresAuth: true }},
    {path: '/main', name: 'main', component: main, meta: { requiresAuth: true }},
    {path: '/reception', name: 'reception', component: reception, meta: { requiresAuth: true }},
    {path: '/calibrated', name: 'calibrated', component: calibrated, meta: { requiresAuth: true }},
    {path: '/packing', name: 'packing', component: packing, meta: { requiresAuth: true }},
    {path: '/clients', name: 'clients', component: clients, meta: { requiresAuth: true }},
    {path: '/permits', name: 'permits', component: permits, meta: { requiresAuth: true }},
    {path: '/users', name: 'users', component: users, meta: { requiresAuth: true }},
    {path: '/setings', name: 'setings', component: setings, meta: { requiresAuth: true }},
    {path: '/showers', name: 'showers', component: showers, meta: { requiresAuth: true }},
    {path: '/supplies', name: 'supplies', component: supplies, meta: { requiresAuth: true }},
    {path: '/emptybins', name: 'emptybins', component: emptybins, meta: { requiresAuth: true }},
    {path: '/emptybinsdispatch', name: 'emptybinsdispatch', component: emptybinsdispatch, meta: { requiresAuth: true }},
    {path: '/dispatchs', name: 'dispatchs', component: dispatchs, meta: { requiresAuth: true }},
    {path: '/suppliedispatchs', name: 'suppliedispatchs', component: suppliedispatchs, meta: { requiresAuth: true }},
    {path: '/transfers', name: 'transfers', component: transfers, meta: { requiresAuth: true }},
    {path: '/reports', name: 'reports', component: reports, meta: { requiresAuth: true }}
  ]
})
