<template lang="html">
  <div class="">
    <div v-if="views.view">
      <p>
        <samp class="txtblack">Frecuencia:</samp> Toda vez que se detecte un producto No Conforme del proceso diario y cada vez que exista una devolución por parte del cliente.<br>
        <samp class="txtblack">Procedimiento:</samp> Debe sacarse el producto a reprocesar y consignar todos los datos originales, para posteriormente registrar los nuevos datos del reproceso.<br>
        <samp class="txtblack">Acciones Correctivas:</samp> Ante cualquier duda o problema del producto una vez reprocesado, avisar al jefe de Planta<br>
      <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <strong >Nueva</strong> para generar datos.<br>
      </p><hr>
      <p class="leyenda"> INFORME DIARIO DE REPROCESO</p>
      <p class="leyenda"> ORDEN: {{pack.folio}}</p>
      <p class="leyenda"> PROCESO: {{packing}}</p>
      <p class="leyenda"> CALIBRE: {{caliber.name}} </p>
      <hr>
    </div>
    <packingprocessdetails v-if="views.newdetails" :pack="item" v-on:getclosepacking="cls()"></packingprocessdetails>
    <div v-if="views.newview">
    <div class="panel panel-default">
      <div class="panel-heading pnl-heading-fix-t">
         Generador de datos de procesos
      </div>
      <div class="panel-body">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Fecha</label>
                  <datepicker v-model="item.moment" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Hora</label>
                  <date-picker v-model="item.hours" :config="configtime" class="input-sm"></date-picker>
                </div>
              </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>N° Tarja original</label>
                   <input type="text" class="form-control input-sm" v-model="item.ntally" placeholder="">
                 </div>
               </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Cantidad de cajas</label>
                  <input type="text" class="form-control input-sm" v-model="item.cantbox" placeholder="">
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Causa carozo (%)</label>
                  <input type="text" class="form-control input-sm" v-model="item.cause_carozo" placeholder="">
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Causa daño (%)</label>
                  <input type="text" class="form-control input-sm" v-model="item.cause_demage" placeholder="">
                </div>
              </div>
            </div>
      </div>
      <div class="panel-footer">
        <button class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
        <button class="btn btn-default btn-sm" @click="close()">Cerrar</button>
      </div>
    </div>
     <!-- <button class="btn btn-default btn-sm" @click="close()"> <i class="fa fa-arrow-left"></i> Regresar</button> -->
    </div>
    <div v-if="views.view">
      <div  class="row">
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">
          <button class="btn btn-success btn-fix btn-sm" @click="news()" > Nueva</button>
        </div>
        <div  class="col-lg-8 col-md-7 col-sm-7 hidden-xs"> </div>
        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">
          <find :filters="philtres" fil="folio" v-on:getfilter="getlist" placehol="buscar folio"></find>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default pnl">
            <div class="panel-heading pnl-heading-fix-t">
              <div class="row rowheader">
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Fecha </div>
                <!--   <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Hora</div> -->
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Hora</div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">N Tarja</div>
                <div class="col-lg-1 col-md-2 col-md-2 hidden-xs">Cant. cajas</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Causa. % Carozo</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Causa. % Daño</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Pendientes</div>
                <div class="col-lg-1 col-md-1 col-sm-3 col-xs-6"></div>
              </div>
            </div>
            <div class="panel-body pnl-body-fix-t">
              <div  class="row rowset" v-for="entity in list" :key="entity.id" >
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.moment}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.hours}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{entity.ntally}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.cantbox}} </div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">{{entity.cause_carozo}} </div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">{{entity.cause_demage}} </div>
                <div class="col-lg-2 col-md-1 col-sm-1 hidden-xs txtblack">{{fixpending(entity)}} </div>
                <div class="col-lg-1 col-md-2 col-sm-3 col-xs-6">
                  <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                  <button class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button>
                  <button :class="gethand(entity).btn" @click="details(entity)"><i :class="gethand(entity).fa"></i></button>
                </div>
              </div>
              <div class="row rowset">
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs"></div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs"></div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6"></div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs"></div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs"></div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs text-right">Total pendientes</div>
                <div class="col-lg-2 col-md-1 col-sm-1 hidden-xs txtblack">{{pendings()}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6"></div>
              </div>
            </div>
            <div class="panel-footer pnl-footer-fix-t">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                  <paginator :tpage="totalpage" :pager="pager" v-on:getresult="getlist"></paginator>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <button class="btn btn-default btn-sm" @click="closes()"> <i class="fa fa-arrow-left"></i> Regresar</button>
              </div>
            </div>
          </div>
        </div>
        <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.folio" :title="title"></deletes>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import paginator from '@/components/paginator'
import easpinner from '@/components/spinner'
import deletes from '@/components/deletes'
import find from '@/components/find'
import packingprocessdetails from '@/components/packingprocessdetails'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import timePicker from 'vue-bootstrap-datetimepicker'
import datepicker from 'vuejs-datepicker'
import {spin, urlapi, valid, getdescrip} from '@/tools'
export default {
  name: 'packingsprocess',
  props: ['pack'],
  data () {
    return {
      packing: '',
      turns: [{id: 1, name: 'AM'}, {id: 2, name: 'PM'}],
      turn: '',
      entity: '',
      title: '',
      caliber: '',
      itemkill: {},
      list: [],
      us: '',
      users: [],
      newview: true,
      act: this.pack.act,
      format: 'dd-MM-yyyy',
      configtime: {
        format: 'h:mm a',
        useCurrent: true
      },
      item: {
        packing_id: this.pack.id,
        moment: new Date(),
        hours: new Date(),
        ntally: 0,
        cantbox: 0,
        cause_carozo: 0,
        cause_demage: 0,
        pendientes: 0
      },
      philtres: {packing_id: this.pack.id},
      items: {
        field: 'moment',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 9
      },
      totalpage: 0,
      url: '/packingsprocess',
      showspinner: false,
      stylespiner: spin,
      views: {
        newview: false,
        newdetails: false,
        view: true
      }
    }
  },
  components: {
    datepicker, 'date-picker': timePicker, find, paginator, easpinner, deletes, packingprocessdetails
  },
  computed: {
    ...mapState({
      passportStore: state => state.passportstore,
      userStore: state => state.userstore
    })
  },
  mounted () {
    this.getlist()
    this.axios.get(urlapi + '/packings/calibers/' + this.pack.typepacking).then(res => {
      this.caliber = res.data.find(it => { return it.id === parseInt(this.pack.caliber) })
    })
    this.axios.get(urlapi + '/packings/getutils').then(res => {
      this.packing = res.data.typepacking.find(it => { return it.id === parseInt(this.pack.typepacking) }).name
    })
  },
  methods: {
    pendings () {
      const reductor = (accumulado, obj) => accumulado + parseInt(obj.pendientes)
      return this.list.reduce(reductor, 0)
    },
    gethand (it) {
      return (it.pendientes !== null || it.pendientes > 0) ? {good: true, btn: 'btn btn-success btn-xs', fa: 'fa fa-thumbs-up'} : {good: false, btn: 'btn btn-warning btn-xs', fa: 'fa fa-random'}
    },
    fixpending (it) {
      return it.pendientes !== null ? it.pendientes : it.cantbox
    },
    close () {
      this.onview('view')
      this.getlist()
    },
    onview (pro) {
      for (let property in this.views) {
        this.views[property] = property === pro
      }
    },
    cls () {
      this.onview('view')
      this.getlist()
    },
    closes () {
      this.$emit('getclosepacking')
    },
    getlist (pFil, pitem, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.philtres = pFil }
      if (pitem !== undefined) { this.items = pitem }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener ordenes
        method: 'get',
        url: urlapi + this.url,
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.philtres, items: this.items}
      }).then(response => {
        this.list = response.data.list
        this.users = response.data.users
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    news () {
      this.act = 'post'
      this.item.packing_id = this.pack.id
      this.item.moment = new Date()
      this.item.hours = new Date()
      this.item.cantbox = 0
      this.item.ntally = 0
      this.item.cause_demage = 0
      this.item.cause_carozo = 0
      this.onview('newview')
    },
    save () {
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: this.item
      }).then(response => {
        this.$toasted.success(response.data)
        this.showspinner = false
        this.onview('view')
        this.getlist()
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    edit (enty) {
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.onview('newview')
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar datos de proceso'
      window.$('#delete').modal('show')
    },
    details (it) {
      this.item = it
      this.item.folio = this.pack.folio
      this.item.kgbox = this.pack.kgbox
      this.onview('newdetails')
    },
    valnumber: valid,
    desc: getdescrip
  }
}
</script>

<style lang="css">
</style>
