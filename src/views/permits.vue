<template lang="html">
  <div class="">
    <p class="text-justify"><samp class="txtblack">AYUDA:</samp>Modulo para crear perfiles de usuario del sistema, utilice el botón "Nuevo" para crear y la columna acciones para actualizar o eliminar.</p><hr>
    <p class="leyenda">REGISTRO DE PERFILES DEL SISTEMA</p>
    <hr>
    <!--Panel de usuarios y sus permisos -->
       <div v-if="newview" class="panel panel-default">
         <div class="panel-heading pnl-heading-fix-t">
            {{title}}
         </div>
         <div class="panel-body">

               <div class="row">
                  <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                    <div class="form-group">
                      <label for="">Descripción</label>
                      <input type="text" class="form-control input-sm" v-model="item.permit" placeholder="" id="permit">
                    </div>
                  </div>
               </div>
               <div class="row">
                 <div v-for="mod in modules" :key="mod.id" class="mousehand module col-lg-3 col-md-3 col-sm-4 col-xs-12" @click="chek(mod.id)">
                    <div><i class="fa" :class="{'fa-check-square-o': !ischeck(mod.id), ' fa-square-o': ischeck(mod.id) }"></i>{{ ' ' + mod.module}}</div>
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
           <find :filters="filters" fil="permit" v-on:getfilter="getlist" placehol="buscar perfil"></find>
         </div>
      </div>
      <div class="row">
         <div class="col-lg-12">
            <div class="panel panel-default pnl">
                <div class="panel-heading pnl-heading-fix-t">
                    <div class="row rowheader">
                      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">Descripción</div>
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">Acciones </div>
                   </div>
                </div>
              <div class="panel-body pnl-body-fix-t">
                <div class="row rowset" v-for="entity in list" :key="entity.id">
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">{{entity.permit}}</div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
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
         <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.permit" :title="title"></deletes>
      </div>
    </div>
    <spinner :show="showspinner" :styles="stylespiner"></spinner>
  </div>
</template>

<script>
import {urlapi, spin} from '../tools'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import deletes from '@/components/deletes'
import find from '@/components/find'
export default {
  name: 'permits',
  data () {
    return {
      entity: '',
      mod: '',
      title: '',
      itemkill: {},
      list: [],
      modules: [],
      checks: [],
      act: 'post',
      item: {
        id: '',
        permit: ''
      },
      newview: false,
      url: '/permits',
      filters: {
        permit: ''
      },
      orders: {
        field: 'date',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 9
      },
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
      this.axios({ // obtener perfiles
        method: 'get',
        url: urlapi + this.url,
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.filters, orders: this.orders}
      }).then(response => {
        this.list = response.data.list
        this.modules = response.data.modules
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
      }
      this.checks = []
      this.title = 'Nuevo perfil del sistema.'
      this.act = 'post'
      this.newview = true
      window.$('#permit').focus()
    },
    save () {
      let dat = {
        'item': this.item,
        'data': this.checks
      }
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: dat
      }).then(response => {
        this.$toasted.success(response.data)
        this.getlist()
        this.newview = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    edit (enty) {
      this.title = 'Actualizando perfil'
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.axios.get(urlapi + '/permits/getdetails/' + enty.id).then(res => {
        this.checks = res.data
        this.newview = true
        window.$('#permit').focus()
      })
    },
    closes () {
      this.newview = false
      for (var property in this.item) {
        this.item[property] = ''
      }
      this.checks = []
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar el perfil'
      window.$('#delete').modal('show')
    },
    chek (pid) {
      if (this.checks.indexOf(pid) === -1) {
        this.checks.push(pid)
      } else {
        this.checks = window._.without(this.checks, pid)
      }
    },
    ischeck (pid) {
      return this.checks.indexOf(pid) === -1
    }
  }
}
</script>

<style lang="css">
 .module {
   padding-bottom: 5px;
 }
</style>
