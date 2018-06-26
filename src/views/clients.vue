<template lang="html">
  <div class="">
  <clientproducer v-if="showproducer" :client="item" v-on:getclose="refres()"></clientproducer>
  <div v-if="!showproducer">
    <p class="text-justify"><samp class="txtblack">AYUDA:</samp> Modulo para crear clientes y productores de la empresa, utilize el boton "Nuevo".<br>
    <hr>
    <p class="leyenda text-justify"> REGISTRO DE CLIENTES Y PRODUCTORES</p>
    <hr>
    <!--Panel de usuarios y sus permisos -->
       <div v-if="newview" class="panel panel-default">
         <div class="panel-heading pnl-heading-fix-t">
            {{title}}
         </div>
         <div class="panel-body">
               <div class="row">
                 <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label>Tipo</label>
                      <select class="form-control" name="" v-model="item.type_id" @change="getcode()">
                          <option v-for="it in types" :key="it.id" :value="it.id"> {{it.type}}</option>
                      </select>
                   </div>
                 </div>
                 <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Código</label> <br>
                     <label for="">{{item.code}}</label>
                    <!--<input type="text" class="form-control input-sm" v-model="item.code" placeholder="" @keydown="valnumber($event)"> -->
                   </div>
                 </div>
                 <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Planta</label> <br>
                    <input type="checkbox" name="" v-model="item.home">
                    <!--<input type="text" class="form-control input-sm" v-model="item.code" placeholder="" @keydown="valnumber($event)"> -->
                   </div>
                 </div>
               </div>
               <div class="row">
                  <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                    <div class="form-group">
                      <label for="">Nombres</label>
                      <input type="text" class="form-control input-sm" v-model="item.name" placeholder="" id="name">
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                      <label for="">Dirección</label>
                      <input type="text" class="form-control input-sm" v-model="item.address" placeholder="">
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <div class="form-group">
                      <label for="">Telefono</label>
                      <input type="text" class="form-control input-sm" v-model="item.phone" placeholder="">
                    </div>
                  </div>

               </div>
               <div class="row">
                 <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                   <div class="form-group">
                     <label for="">email</label>
                     <input type="text" class="form-control input-sm" v-model="item.email" placeholder="">
                   </div>
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
           <find :filters="filters" fil="name" v-on:getfilter="getlist" placehol="buscar clientes o proveedores"></find>
         </div>
      </div>
      <div class="row">
         <div class="col-lg-12">
            <div class="panel panel-default pnl">
                <div class="panel-heading pnl-heading-fix-t">
                    <div class="row rowheader">
                      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">Nombres</div>
                      <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Dirección</div>
                      <div class="col-lg-2 col-md-2 hidden-sm  hidden-xs">email</div>
                      <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Telefono </div>
                      <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">Tipo </div>
                      <div class="col-lg-1 col-md-2 col-sm-3 col-xs-6">Acciones </div>
                   </div>
                </div>
              <div class="panel-body pnl-body-fix-t">
                <div class="row rowset" v-for="entity in list" :key="entity.id" :class="{home: entity.home > 0}">
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">{{entity.name}}</div>
                  <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.address}} </div>
                  <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">{{entity.email}}</div>
                  <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.phone}}</div>
                  <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">{{type(entity.type_id)}} </div>
                  <div class="col-lg-1 col-md-2 col-sm-3 col-xs-6">
                    <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                    <button v-if="entity.type_id===1" class="btn btn-success btn-xs" @click="link(entity)"><i class="fa fa-user-circle"></i></button>
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
         <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.name" :title="title"></deletes>
      </div>
    </div>
    <spinner :show="showspinner" :styles="stylespiner"></spinner>
  </div>  </div>
</template>

<script>
import find from '@/components/find'
import clientproducer from '@/components/clientproducer'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import deletes from '@/components/deletes'
import {spin, urlapi, valid} from '@/tools'
export default {
  name: 'users',
  data () {
    return {
      it: '',
      entity: '',
      title: '',
      itemkill: {},
      list: [],
      producers: [],
      act: 'post',
      types: [
        {id: 1, type: 'Cliente'}, {id: 2, type: 'Productor'}
      ],
      item: {
        code: 0,
        name: '',
        email: '',
        address: '',
        phone: '',
        home: false,
        type_id: 1
      },
      newview: false,
      showproducer: false,
      url: '/clients',
      filters: {
        name: ''
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
    paginator, spinner, deletes, find, clientproducer
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getcode () {
      this.axios.get(urlapi + this.url + '/surrogate/' + this.item.type_id).then(response => {
        this.item.code = response.data
      })
    },
    valnumber: valid,
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
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    news () {
      for (var property in this.item) {
        this.item[property] = '-'
        if (property === 'code') { this.item[property] = '' }
      }
      this.item.home = false
      this.title = 'Nuevo cliente / proveedor'
      this.act = 'post'
      this.newview = true
      window.$('#name').focus()
    },
    save () {
      if (this.item.type_id !== 0 && this.item.name !== '' && this.item.code !== '') {
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
        this.$toasted.error('Las existen datos erroneos o incompletos!')
      }
    },
    edit (enty) {
      this.title = enty.type_id === 1 ? 'Actualizando cliente.' : 'Actualizando proveedor.'
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.newview = true
      window.$('#name').focus()
    },
    closes () {
      this.newview = false
      for (var property in this.item) {
        this.item[property] = ''
        if (property === 'type_id') { this.item[property] = 1 }
      }
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = aitem.type_id === 1 ? 'Eliminar cliente.' : 'Eliminar proveedor.'
      window.$('#delete').modal('show')
    },
    type (rl) {
      let aux = ''
      for (let it of this.types) {
        if (it.id === rl) {
          aux = it.type
          break
        }
      }
      return aux
    },
    chekmail () {
      if (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(this.item.email)) {
        return true
      } else {
        return false
      }
    },
    refres () {
      this.showproducer = false
      this.getlist()
    },
    link (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      this.showproducer = true
    }
  }
}
</script>

<style lang="css">

.home {
  background-color: rgba(44, 60, 208, 0.2);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:black;
}
</style>
