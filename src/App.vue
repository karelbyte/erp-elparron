<template>
  <div id="app">
   <div v-if="passportStore.passport !== null && userStore.user !== null" class="container-fluid fix">
      <div class="panel panel-primary">
        <div class="panel-heading pnl-heading-fix navbar-fixed-top" style="border-top-right-radius: 0; border-top-left-radius: 0">
           <div class="row">
             <div class="col-lg-9 col-md-8 col-sm-7 col-xs-2">
               <!-- <a class="mousehand glyphicon glyphicon-minus" @click="reloads()"> </a> -->
               <img src="/static/elparron.jpg" height="30">
             </div>
             <div class="col-lg-2 col-md-2 col-sm-3 col-xs-7 text-right">
                <div class="user" style="padding: 5px">
                    <a href="#"> <i class="fa fa-user" aria-hidden="true"></i> {{userStore.user.fullname}}</a>
                </div>
             </div>
             <div class="col-lg-1 col-md-2 col-sm-2 col-xs-1 text-right">
                <div class="mousehand" style="margin-right:10px;padding: 5px">
                   <a @click="logoff()"> <i class="fa fa-power-off" aria-hidden="true"></i></a>
                  <a class="mousehand glyphicon " @click="launchFullScreen()" :class="{'glyphicon-fullscreen': !full, 'glyphicon-unchecked': full}" style="margin-left:10px" ></a>

                </div>
             </div>
           </div>
        </div>
        <div class="panel-body pnl-body-fix" id="pnl">
          <div class="row bhoechie-tab-container panel-he">
                    <div class="col-lg-1 col-md-1 col-sm-1 col-xs-2 bhoechie-tab-menu cl1">
                      <div class="list-group">
                        <a v-if="permits(1)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 1}" @click="set(1, 'home')" data-toggle="tooltip" data-placement="right" title="Inicio">
                          <i class="fa fa-dashboard fa-2x" aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(2)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 2}" @click="set(2, 'reception')" data-toggle="tooltip" data-placement="right" title="Recepción">
                          <i class="fa fa-truck fa-2x" aria-hidden="true"></i><br>
                        </a>
                        <a v-if="permits(4)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 3}" @click="set(3, 'calibrated')" data-toggle="tooltip" data-placement="right" title="Calibrar">
                          <i class="fa fa-superpowers fa-2x " aria-hidden="true"></i>
                        </a>

                        <a v-if="permits(5)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 4}" @click="set(4, 'showers')" data-toggle="tooltip" data-placement="right" title="Selecion de fruta">
                          <i class="fa fa-foursquare fa-2x " aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(6)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 5}" @click="set(5, 'packing')" data-toggle="tooltip" data-placement="right" title="Envasado">
                            <i class="fa fa-archive fa-2x " aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(7)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 6}" @click="set(6, 'dispatchs')" data-toggle="tooltip" data-placement="right" title="Despachar fruta">
                          <i class="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(8)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 7}" @click="set(7, 'transfers')" data-toggle="tooltip" data-placement="right" title="Traspasos fruta">
                          <i class="fa fa-cube fa-2x" aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(9)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 8}" @click="set(8, 'emptybinsdispatch')" data-toggle="tooltip" data-placement="right" title="Despacho Bins">
                          <i class="fa fa-th-large fa-2x" aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(9)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 9}" @click="set(9, 'emptybins')" data-toggle="tooltip" data-placement="right" title="Recepción Bins">
                          <i class="fa fa-dashcube fa-2x" aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(10)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 10}" @click="set(10, 'suppliedispatchs')" data-toggle="tooltip" data-placement="right" title="Despacho Insumos">
                            <i class="fa fa-tasks fa-2x" aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(10)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 11}" @click="set(11, 'supplies')" data-toggle="tooltip" data-placement="right" title="Recepción Insumos">
                            <i class="fa fa-th-list fa-2x" aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(11)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 12}" @click="set(12, 'reports')" data-toggle="tooltip" data-placement="right" title="Informes">
                          <i class="fa fa-info  fa-2x" aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(13)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 13}" @click="set(13, 'setings')" data-toggle="tooltip" data-placement="right" title="Ajustes">
                            <i class="fa fa-wrench fa-2x " aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(14)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 14}" @click="set(14, 'clients')" data-toggle="tooltip" data-placement="right" title="Clientes/Productores">
                            <i class="fa fa-users fa-2x " aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(15)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 15}" @click="set(15, 'permits')" data-toggle="tooltip" data-placement="right" title="Permisos">
                            <i class="fa fa-unlock fa-2x " aria-hidden="true"></i>
                        </a>
                        <a v-if="permits(16)" href="#" class="list-group-item text-center fix_list" :class="{active: isactive === 16}" @click="set(16, 'users')" data-toggle="tooltip" data-placement="right" title="Usuarios">
                            <i class="fa fa-user fa-2x " aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                    <div class="col-lg-11 col-md-11 col-sm-11 col-xs-10 bhoechie-tab cl2">

                        <div class="bhoechie-tab-content active">
                            <router-view/>
                        </div>
                    </div>

          </div>
        </div>
        <div class="panel-footer pnl-footer-fix">

        </div>
      </div>
    </div>

   <div v-if="passportStore.passport == null && userStore.user == null" class="container-fluid fix">
      <router-view/>
   </div>
 </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      isactive: 1,
      full: false
    }
  },
  computed: {
    ...mapState({
      passportStore: state => state.passportstore,
      userStore: state => state.userstore
    })
  },
  created () {
    this.full = false
    let vm = this
    let passport = JSON.parse(window.localStorage.getItem('passport'))
    let user = JSON.parse(window.localStorage.getItem('user'))
    if (user !== null) { this.$store.dispatch('setUserObject', user) }
    if (passport !== null) {
      this.$store.dispatch('setPassportObject', passport)
      this.axios.interceptors.request.use(function (config) {
        config.headers.Authorization = 'Bearer ' + passport.token
        return config
      }, function (error) {
        return Promise.reject(error)
      })
      this.axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        if (error.response.status === 401) {
          vm.$store.dispatch('clearUserObject')
          vm.$store.dispatch('clearPassportObject')
          window.localStorage.removeItem('user')
          window.localStorage.removeItem('passport')
          vm.isactive = 1
          vm.$toasted.info('La sesión actual ha expirado. refresque la app, vuelve a iniciar sesión.')
          vm.$router.push({name: 'login'})
        } else {
          return Promise.reject(error)
        }
      })
      this.isactive = 1
      this.$router.push({name: 'home'})
    }
  },
  methods: {
    launchFullScreen () {
      let element = window.document.documentElement
      if (!this.full) {
        if (element.requestFullScreen) {
          element.requestFullScreen()
          this.full = true
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
          this.full = true
        } else if (element.webkitRequestFullScreen) {
          this.full = true
          element.webkitRequestFullScreen()
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen()
          this.full = false
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
          this.full = false
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
          this.full = false
        }
      }
    },
    set (id, rut) {
      this.isactive = id
      this.$router.push({name: rut})
    },
    reloads () {
      location.reload()
    },
    logoff () {
      this.$store.dispatch('clearUserObject')
      this.$store.dispatch('clearPassportObject')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('passport')
      this.isactive = 1
      this.$router.push({name: 'login'})
    },
    permits (per) {
      return window._.indexOf(this.passportStore.passport.permits, per) > -1
    }
  }
}
</script>

<style lang="sass">
  @import "./assets/css/bs.css"
  @import "./assets/css/fontawesome.css"
  @import "./assets/css/main.css"
  .col-fix
   padding-left: 15px
   padding-right: 15px
</style>
