<template lang="html">
  <div class="">
    <div v-if="newview">
      <p>
        <samp class="txtblack">Procedimiento:</samp> Se debe indicar la totalidad de la información, a fin de no realizar procedimientos erróneos.<br>
        <samp class="txtblack">Acciones Correctivas:</samp> Si se detecta un error en la orden, se debe avisar al Jefe de Planta.<br>
      <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <strong >Nueva</strong> para generar datos.<br>
      </p><hr>
      <p class="leyenda"> HISTORICO DE TOMAS DE MUESTRAS - SORBATO DE POTASIO</p>
      <p class="leyenda"> CLIENTE: {{clientname}}</p>
      <p class="leyenda"> ORDEN: {{pack.folio}}</p>
      <p class="leyenda"> CALIBRE: {{caliber.name}}</p>
      <hr>
    </div>
    <div v-if="!newview">
    <div class="panel panel-default">
      <div class="panel-heading pnl-heading-fix-t">
         Generador de toma de muestras
      </div>
      <div class="panel-body">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Fecha</label>
                  <datepicker v-model="item.moment" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                </div>
              </div>
              <div class="col-lg-1 col-md-2 col-sm-2 col-xs-12">
                <div class="form-group">
                  <label>Hora</label>
                  <date-picker v-model="item.hours" :config="configtime" class="input-sm"></date-picker>
                </div>
              </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>Kg de Fruta / min</label>
                   <input type="text" class="form-control input-sm" v-model="item.kgfruit" placeholder="">
                 </div>
               </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Indicador de bomba ml/min</label>
                  <input type="text" class="form-control input-sm" v-model="item.indicatorbom" placeholder="">
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Nivel del Tanque de Sorbato</label>
                  <input type="text" class="form-control input-sm" v-model="item.tanklevel" placeholder="">
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label># de pallet</label>
                  <input type="text" class="form-control input-sm" v-model="item.npallet" placeholder="">
                </div>
              </div>
               <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                 <div class="form-group">
                   <label>Notas</label>
                    <input type="text" class="form-control input-sm" v-model="item.note">
                 </div>
               </div>
             </div>
      </div>
      <div class="panel-footer">
        <button class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
         <button class="btn btn-default btn-sm" @click="close()">Cerrar</button>
      </div>
    </div>
      <!--<button class="btn btn-default btn-sm" @click="close()"> <i class="fa fa-arrow-left"></i> Regresar</button> -->
    </div>
    <div v-if="newview">
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
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Kg de Fruta</div>
                <div class="col-lg-2 col-md-2 col-md-2 hidden-xs">I. bomba ml/min</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">N. del Tanque</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">N Pallet</div>

                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6"></div>
              </div>
            </div>
            <div class="panel-body pnl-body-fix-t">
              <div  class="row rowset" v-for="entity in list" :key="entity.id" >
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.moment}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{entity.hours}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.kgfruit}} </div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.indicatorbom}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.tanklevel}}</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">{{entity.npallet}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                  <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                  <button class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button>
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
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import timePicker from 'vue-bootstrap-datetimepicker'
import datepicker from 'vuejs-datepicker'
import {spin, urlapi, valid, getdescrip} from '@/tools'
export default {
  name: 'packingsorbatodetails',
  props: ['pack'],
  data () {
    return {
      clientname: '',
      caliber: '',
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
        sorbato_id: this.pack.id,
        moment: new Date(),
        hours: new Date(),
        kgfruit: 0,
        indicatorbom: 0,
        tanklevel: 0,
        note: ''
      },
      philtres: {sorbato_id: this.pack.id},
      items: {
        field: 'moment',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 9
      },
      totalpage: 0,
      url: '/packingssorbatodetails',
      showspinner: false,
      stylespiner: spin
    }
  },
  components: {
    datepicker, 'date-picker': timePicker, find, paginator, easpinner, deletes
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
      this.newview = true
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
      this.item.sorbato_id = this.pack.id
      this.item.moment = new Date()
      this.item.hours = new Date()
      this.item.kgfruit = 0
      this.item.indicatorbom = 0
      this.item.tanklevel = 0
      this.item.note = ''
      this.newview = false
    },
    save () {
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: this.item
      }).then(response => {
        this.$toasted.success(response.data)
        this.showspinner = false
        this.newview = true
        this.getlist()
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    edit (enty) {
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.newview = false
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar datos de aplicacón de sorbato'
      window.$('#delete').modal('show')
    },
    valnumber: valid,
    desc: getdescrip
  }
}
</script>

<style lang="css">
</style>
