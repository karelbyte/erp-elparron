<template lang="html">
  <div class="">
    <p class="text-justify"><samp class="txtblack">AYUDA:</samp>Modulo para crear usuarios del sistema y darle permisos, utilize el boton "Nuevo".<br>
    <hr>
    <p class="leyenda text-justify">REGISTRO DE USUARIOS DEL SISTEMA</p>
    <hr>
    <!--Panel de usuarios y sus permisos -->
       <div v-if="newview" class="panel panel-default">
         <div class="panel-heading pnl-heading-fix-t">
            {{title}}
         </div>
         <div class="panel-body">
               <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                      <label >Nombres</label>
                      <input type="text" class="form-control input-sm" v-model="item.fullname" placeholder="" id="fullname">
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                      <label >e-mail</label>
                      <input type="text" class="form-control input-sm" v-model="item.email" placeholder="">
                    </div>
                  </div>
               </div>
               <div class="row">
                 <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                   <div class="form-group">
                     <label >Usuario</label>
                     <input type="text" class="form-control input-sm" v-model="item.nick" placeholder="">
                   </div>
                 </div>
                 <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label >Cargo</label>
                     <select class="form-control" name="" v-model="item.rank_id">
                       <option v-for="rank in ranks" :key="rank.id" :value="rank.id"> {{rank.name}}</option>
                     </select>
                   </div>
                 </div>
                 <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label >Permisos</label>
                      <select class="form-control" name="" v-model="item.rol_id">
                          <option v-for="it in permits" :key="it.id" :value="it.id"> {{it.permit}}</option>
                      </select>
                   </div>
                 </div>
               </div>
               <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <div class="form-group">
                      <label >Clave</label>
                      <input type="text" class="form-control input-sm" v-model="item.password" placeholder="">
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <div class="form-group">
                      <label >Confirmar clave</label>
                      <input type="text" class="form-control input-sm" v-model="item.repassword" placeholder="">
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 mousehand"  @click="item.active = !item.active" style="padding-top:25px">
                      <div><i class="fa" :class="{'fa-check-square-o': item.active, ' fa-square-o': !item.active }"></i> <label >Activo</label></div>
                  </div>
               </div>
         </div>
         <div class="panel-footer">
              <button class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
              <button class="btn btn-default btn-sm" @click="closes()"> Cerrar</button>
         </div>
       </div>
    <!--Panel de visualizacion de ordenes -->
    <div v-if="!newview">
      <div  class="row">
         <div class="col-lg-9 col-md-6 col-sm-6 col-xs-3">
           <button class="btn btn-success btn-fix btn-sm" @click="news()">Nuevo</button>
         </div>
         <div class="col-lg-3 col-md-6 col-sm-6 col-xs-9">
           <find :filters="filters" fil="fullname" v-on:getfilter="getlist" placehol="buscar usuario"></find>
         </div>
      </div>
      <div class="row">
         <div class="col-lg-12">
            <div class="panel panel-default pnl">
                <div class="panel-heading pnl-heading-fix-t">
                    <div class="row rowheader">
                      <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">Nombres</div>
                      <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">email</div>
                      <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Nick </div>
                      <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Cargo </div>
                      <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Perfil </div>
                      <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">Estado </div>
                      <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Acciones </div>
                   </div>
                </div>
              <div class="panel-body pnl-body-fix-t">
                <div class="row rowset" v-for="entity in list" :key="entity.id">
                  <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">{{entity.fullname}}</div>
                  <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.email}} </div>
                  <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.nick}}</div>
                  <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{descr(entity.rank_id, 'ranks')}} </div>
                  <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{rol(entity.rol_id)}} </div>
                  <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">{{status(entity.active)}}</div>
                  <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                    <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button>
                  </div>
                </div>
              </div>
              <div class="panel-footer pnl-footer-fix-t">
                <div class="row">
                   <div class="col-lg-9 col-md-6 col-sm-6 col-xs-6 ">
                   <paginator :tpage="totalpage" :pager="pager" v-on:getresult="getlist"></paginator>
                   </div>
                   <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                   </div>
                </div>
              </div>
            </div>
       </div>
         <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.fullname" :title="title"></deletes>
      </div>
    </div>
    <spinner :show="showspinner" :styles="stylespiner"></spinner>
  </div>
</template>

<script>
import find from '@/components/find'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import deletes from '@/components/deletes'
import {spin, urlapi, getdescrip} from '../tools'
export default {
  name: 'users',
  data () {
    return {
      entity: '',
      ranks: [],
      ranl: '',
      it: '',
      title: '',
      itemkill: {},
      list: [],
      act: 'post',
      item: {
        fullname: '',
        email: '',
        nick: '',
        password: '',
        repassword: '',
        rol_id: 1,
        rank_id: 9,
        active: false
      },
      newview: false,
      url: '/users',
      filters: {
        fullname: ''
      },
      orders: {
        field: 'date',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 9
      },
      permits: [],
      totalpage: 0,
      showspinner: false,
      stylespiner: spin
    }
  },
  components: {
    paginator, spinner, deletes, find
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist (pFil, pOrder, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.filters = pFil }
      if (pOrder !== undefined) { this.orders = pOrder }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener ordenes
        method: 'get',
        url: urlapi + this.url,
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.filters, orders: this.orders}
      }).then(response => {
        this.list = response.data.list
        this.permits = response.data.permits
        this.ranks = response.data.ranks
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    news () {
      for (var property in this.item) {
        this.item[property] = ''
        if (property === 'rol_id') { this.item[property] = 1 }
      }
      this.title = 'Nuevo usuario'
      this.act = 'post'
      this.newview = true
      window.$('#fullname').focus()
    },
    save () {
      if ((this.item.password === this.item.repassword) && (this.chekmail()) && this.item.email !== '' && this.item.fullname !== '' && this.item.nick !== '') {
        this.axios({ // guardar orden
          method: this.act,
          url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
          data: this.item
        }).then(response => {
          this.$toasted.success(response.data)
          this.getlist()
          this.newview = false
        }).catch(e => {
          this.$toasted.error(e.response.data)
        })
      } else {
        this.$toasted.error('Las existen datos errones o incompletos!')
      }
    },
    edit (enty) {
      this.title = 'Actualizando usuario.'
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.newview = true
      window.$('#fullname').focus()
    },
    closes () {
      this.newview = false
      for (var property in this.item) {
        this.item[property] = ''
        if (property === 'rol_id') { this.item[property] = 1 }
      }
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar el usuario.'
      window.$('#delete').modal('show')
    },
    rol (rl) {
      let aux = ''
      for (let it of this.permits) {
        if (it.id === rl) {
          aux = it.permit
          break
        }
      }
      return aux
    },
    status (st) {
      return (st === 1) ? 'Activo' : 'Inactivo'
    },
    chekmail () {
      if (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(this.item.email)) {
        return true
      } else {
        return false
      }
    },
    descr: getdescrip
  }
}
</script>

<style lang="css">
</style>
