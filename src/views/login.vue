<template lang="html">
  <div class="">
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header mdl-header">
              <h5 class="modal-title mdl-title">elparron credenciales</h5>
            </div>
            <div class="modal-body mdl-body">
                 <div class="form-group">
                   <label for="">Usuario</label>
                   <input type="text" class="form-control input-sm" id="nick" placeholder="" v-model="credentials.nick">
                 </div>
                 <div class="form-group">
                   <label for="">Contraseña</label>
                   <input type="password" class="form-control input-sm" id="password" placeholder="" v-model="credentials.password">
                 </div>
            </div>
             <div class="modal-footer mdl-footer">
                <button @click="login()" class="btn btn-default btn-sm">Iniciar sesión</button>
             </div>
          </div>
      </div>
    </div>
    <spinner :show="spin"></spinner>
  </div>
</template>

<script>
import spinner from '@/components/spinner'
import {urlapi} from '../tools'
export default {
  name: 'login',
  data () {
    return {
      credentials: {
        nick: 'admin',
        password: '1234'
      },
      spin: false
    }
  },
  components: {
    spinner
  },
  mounted () {
    window.$('#login').on('shown.bs.modal', function () {
      window.$('#nick').focus()
    })
    window.$('#login').modal('show')
  },
  methods: {
    login () {
      let vm = this
      if (this.credentials.nick !== '' && this.credentials.password !== '') {
        this.spin = true
        this.axios.post(urlapi + '/login', this.credentials).then(response => {
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
              vm.$toasted.info('La sesión actual ha expirado. para continuar, vuelve a iniciar sesión.')
              vm.$router.push({name: 'login'})
            } else {
              return Promise.reject(error)
            }
          })
          // Se configuran el usuario en la sesion y se dispersan los datos por la app a traves de vuex
          let passport = {
            token: response.data.token,
            expired: response.data.expired,
            permits: response.data.permits
          }
          let user = response.data.user
          window.localStorage.setItem('user', JSON.stringify(user))
          window.localStorage.setItem('passport', JSON.stringify(passport))
          this.$store.dispatch('setUserObject', user)
          this.$store.dispatch('setPassportObject', passport)
          this.spi = false
          window.$('#login').modal('hide')
          this.$router.push({name: 'home'})
        }).catch(error => {
          this.$toasted.error(error.response.data)
          this.spin = false
        })
      } else {
        this.$toasted.error('Faltan datos para iniciar sesión!')
      }
    }
  }
}
</script>

<style lang="css" scoped>

.modal-content {
   width: 300px;
 }
.modal {
 background-color:rgba(91, 55, 7, 0.14);
  background: url(/static/fondoparron.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
