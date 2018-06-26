<template lang="html">
  <div class="">
    <div v-if="views.view">
      <p>
        <samp class="txtblack">Frecuencia:</samp>  Al inicio del turno cada 5 minutos (4 lecturas) y luego cada 10 minutos.<br>
        <samp class="txtblack">Procedimiento:</samp> Se debe registrar el promedio de fruta procesada en cada periodo y verificar la cantidad de sorbato necesario (ml/minuto de acuerdo a la concentración de la solución), para mantener los niveles  de acuerdo a la orden de producción.<br>
        <samp class="txtblack">Acciones Correctivas:</samp> Si se detecta insuficiencia o sobredosis, debe regularse  Inmediatamente, de acuerdo al flujo de fruta.<br>
      <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <strong >Nueva</strong> para generar datos.<br>
      </p><hr>
      <p class="leyenda"> HISTORICO DE APLICACION DE SORBATO DE POTASIO</p>
      <p class="leyenda"> CLIENTE: {{clientname}}</p>
      <p class="leyenda"> ORDEN: {{pack.folio}}</p>
      <p class="leyenda"> CALIBRE: {{caliber.name}}</p>
      <hr>
    </div>
    <packingsorbatodetails v-if="views.newdetails" :pack="item" v-on:getclosepacking="cls()"></packingsorbatodetails>
    <div v-if="views.newview">
    <div class="panel panel-default">
      <div class="panel-heading pnl-heading-fix-t">
         Generador de datos de aplicación de potasio
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
                  <label>Turno</label>
                  <select class="form-control input-sm" v-model="item.turn">
                    <option v-for="turn in turns" :key="turn.id" :value="turn.id"> {{turn.name}}</option>
                  </select>
                </div>
              </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label> % Concentración</label>
                   <input type="text" class="form-control input-sm" v-model="item.concentration" placeholder="">
                 </div>
               </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Monitor</label>
                  <select class="form-control input-sm" v-model="item.monitor_id">
                    <option v-for="us in users" :key="us.id" :value="us.id"> {{us.name}}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Verificador</label>
                  <select class="form-control input-sm" v-model="item.checker_id">
                    <option v-for="us in users" :key="us.id" :value="us.id"> {{us.name}}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Validador</label>
                  <select class="form-control input-sm" v-model="item.validator_id">
                    <option v-for="us in users" :key="us.id" :value="us.id"> {{us.name}}</option>
                  </select>
                </div>
              </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>Tabla</label>
                    <input type="text" class="form-control input-sm" v-model="item.ntable" @keydown="valnumber($event)">
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
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Turno</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">% Concentración</div>
                <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">Tabla</div>
                <div class="col-lg-2 col-md-2 col-md-2 hidden-xs">Monitor</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Verificador</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Validador</div>

                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6"></div>
              </div>
            </div>
            <div class="panel-body pnl-body-fix-t">
              <div  class="row rowset" v-for="entity in list" :key="entity.id" >
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.moment}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{desc(entity.turn,'turns')}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.concentration}} </div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.ntable}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{desc(entity.monitor_id, 'users')}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{desc(entity.checker_id, 'users')}}</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">{{desc(entity.validator_id,'users')}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                  <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                  <button class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button>
                  <button class="btn btn-warning btn-xs" @click="details(entity)"><i class="fa fa-flask"></i></button>
                </div>
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
import packingsorbatodetails from '@/components/packingsorbatodetails'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import timePicker from 'vue-bootstrap-datetimepicker'
import datepicker from 'vuejs-datepicker'
import {spin, urlapi, valid, getdescrip} from '@/tools'
export default {
  name: 'packingsorbato',
  props: ['pack'],
  data () {
    return {
      clientname: '',
      caliber: '',
      turns: [{id: 1, name: 'AM'}, {id: 2, name: 'PM'}],
      turn: '',
      entity: '',
      title: '',
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
        turn: 0,
        concentration: 0,
        monitor_id: 0,
        checker_id: 0,
        validator_id: 0,
        ntable: 0
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
      url: '/packingssorbato',
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
    datepicker, 'date-picker': timePicker, find, paginator, easpinner, deletes, packingsorbatodetails
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
      this.listcalibers = res.data
      this.caliber = res.data.find(it => { return it.id === parseInt(this.pack.caliber) })
    })
    this.axios.get(urlapi + '/clients/getclient/' + this.pack.client_id).then(res => {
      this.clientname = res.data.name
    })
  },
  methods: {
    close () {
      this.onview('view')
    },
    onview (pro) {
      for (let property in this.views) {
        this.views[property] = property === pro
      }
    },
    cls () {
      this.onview('view')
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
      this.item.turn = 0
      this.item.concentration = 0
      this.item.monitor_id = 0
      this.item.checker_id = 0
      this.item.validator_id = 0
      this.item.ntable = 0
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
      this.title = 'Eliminar datos de aplicacón de sorbato'
      window.$('#delete').modal('show')
    },
    details (it) {
      this.item = it
      this.item.packing_id = this.pack.id
      this.item.typepacking = this.pack.typepacking
      this.item.client_id = this.pack.client_id
      this.item.caliber = this.pack.caliber
      this.item.folio = this.pack.folio
      this.onview('newdetails')
    },
    valnumber: valid,
    desc: getdescrip
  }
}
</script>

<style lang="css">
</style>
