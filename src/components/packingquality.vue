<template lang="html">
  <div class="">
    <div v-if="newview">
      <p>
        <samp class="txtblack">Procedimiento:</samp> Se debe indicar la totalidad de la información, a fin de no realizar procedimientos erróneos.<br>
        <samp class="txtblack">Acciones Correctivas:</samp> Si se detecta un error en la orden, se debe avisar al Jefe de Planta.<br>
      <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <strong >Nueva</strong> para generar datos.<br>
      </p><hr>
      <p class="leyenda"> HISTORICO DE CALIDAD DE ORDEN DE ENVASADO</p>
      <p class="leyenda"> CLIENTE: {{clientname}}</p>
      <p class="leyenda"> ORDEN: {{pack.folio}}</p>
      <p class="leyenda"> CALIBRE: {{caliber.name}} / CALIBRE MAX: {{caliber.ends + 15}} </p>
      <p class="leyenda"> HUMEDAD MAX: {{pack.humidity}} %</p>
      <hr>
    </div>
    <div v-if="!newview">
    <div class="panel panel-default">
      <div class="panel-heading pnl-heading-fix-t">
         Generador de datos de calidad
      </div>
      <div class="panel-body">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Fecha</label>
                  <datepicker v-model="item.moment" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                <div class="form-group">
                  <label>Turno</label>
                  <select class="form-control input-sm" v-model="item.turn">
                    <option value="0">AM</option>
                    <option value="1">PM</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>No Pallet</label>
                  <input type="text" class="form-control input-sm" v-model="item.npallet" placeholder="">
                </div>
              </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>Hora</label>
                   <date-picker v-model="item.hours" :config="configtime" class="input-sm"></date-picker>
                 </div>
               </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>Peso bruto (kg)</label>
                    <input type="text" class="form-control input-sm" v-model.number="item.grossweight" @keydown="valnumber($event)">
                 </div>
               </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>Humedad (%)</label>
                   <input class="form-control input-sm" v-model.number="item.humidity" :class="{'bknot': parseInt(item.humidity) > parseInt(pack.humidity)}">
                 </div>
               </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>Calibre </label>
                    <input type="text" class="form-control input-sm" v-model="item.caliber" @keydown="valnumber($event)" :class="{'bknot': (parseInt(item.caliber) - 15) > parseInt(caliber.ends)}">
                 </div>
               </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>T. muestra (kg)</label>
                     <input type="text" class="form-control input-sm" v-model="item.sizekg" @keydown="valnumber($event)">
                 </div>
               </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label >Unidad Carozo</label>
                   <input type="text" class="form-control input-sm" v-model="item.unitcaroso" placeholder="">
                 </div>
               </div>
               <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label >Peso de Carozo</label>
                    <input type="text" class="form-control input-sm" v-model="item.weightcaroso" placeholder="">
                 </div>
               </div>
               <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>% de Carozo</label>
                   <label class="form-control input-sm" :class="{'bk': parseFloat(percaroso) > pack.carozo}">{{percaroso}}</label>
                 </div>
               </div>
               <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label >Peso de Daño (g)</label>
                   <input type="text" class="form-control input-sm" v-model="item.damegeweight" placeholder="">
                 </div>
               </div>
               <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label >% Daño</label>
                   <label class="form-control input-sm" :class="{'bknot': perdamage > 4}">{{perdamage}}</label>
                 </div>
               </div>
               <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>% Total de Daño</label>
                   <label class="form-control input-sm">{{(parseFloat(perdamage) + parseFloat(percaroso)).toFixed(2)}}</label>
                 </div>
               </div>
               <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>Velocidad Dosificador</label>
                   <input type="text" class="form-control input-sm" v-model="item.dosingspeed" placeholder="">
                 </div>
               </div>
               <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>Velocidad Tiernizador</label>
                    <input type="text" class="form-control input-sm" v-model="item.tenderspeed" placeholder="">
                 </div>
               </div>
               <div class="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                 <div class="form-group">
                   <label >Observaciones</label>
                    <input type="text" class="form-control input-sm" v-model="item.note" placeholder="">
                 </div>
               </div>
              <div v-if="trueparams" class="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                <div class="form-group">
                  <label style="color:blue" >Acción correctiva</label>
                  <input type="text" class="form-control input-sm" v-model="item.notefix" placeholder="">
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>Control de Calidad</label>
                  <select :disabled="passaprove" class="form-control input-sm" name="" v-model="item.supervisor_id">
                    <option v-for="sup in supers" :key="sup.id" :value="sup.id"> {{sup.name}}</option>
                  </select>
                </div>
              </div>
             </div>
      </div>
      <div class="panel-footer">
        <button v-if="passfix" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
        <button class="btn btn-default btn-sm" @click="close()"> Cerrar</button>
      </div>
    </div>

    </div>
    <div v-if="newview">
      <div  class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
          <button v-if="!passaprove"  class="btn btn-success btn-fix btn-sm" @click="news()" > Nueva</button>
          <button v-if="list.length > 0" class="btn btn-info btn-sm" @click="info()" >Informe</button>
        </div>
        <div  class="col-lg-7 col-md-7 col-sm-7 hidden-xs"> </div>
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
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Hora</div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">No Pallet</div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Peso bruto (kg)</div>
                <div class="col-lg-1 col-md-2 col-md-2 hidden-xs">Humedad (%)</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">Calibre</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">T. Muestra kg</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">Unidad Carozo</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">% de Carozo</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">% de daño</div>
                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6"></div>
              </div>
            </div>
            <div class="panel-body pnl-body-fix-t">
              <div  class="row rowset" v-for="entity in list" :key="entity.id" :class="{'bknot': !getaprove(entity).valid}">
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.moment}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{entity.hours}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.npallet}} </div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.grossweight}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.humidity}}</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.caliber}}</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.sizekg}}</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.unitcaroso}}</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.weightcaroso}}</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.damegeweight}}</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{getaprove(entity).label}}</div>
                <div v-if="!passaprove"  class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                  <div v-if="entity.aprove === 0">
                    <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button>
                    <button class="btn btn-success btn-xs" @click="passline(entity)"><i class="fa fa-thumbs-up"></i></button>
                  </div>
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
              <div class="col-lg-9 col-md-9 col-sm-6 col-xs-12">
                <button class="btn btn-default btn-sm" @click="closes()"> <i class="fa fa-arrow-left"></i> Regresar</button>
              </div>

              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="margin-bottom: 15px">
                <div class="form-group txtblack">
                  Aseguramiento de Calidad
                  <select :disabled="passaprove" class="form-control input-sm" name="" v-model="item.manager_id">
                    <option v-for="manager in managers" :key="manager.id" :value="manager.id"> {{manager.name}}</option>
                  </select>
                </div>
                <button :disabled="passaprove" class="btn btn-primary btn-fix btn-sm" @click="pass()"> Aprobar</button>
              </div>
            </div>
          </div>
        </div>
        <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.folio" :title="title"></deletes>
      </div>
    </div>

    <div class="modal fade"  id="view_doc" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h6 class="modal-title" id="">Visor información de envasado {{pack.folio}}</h6>
          </div>
          <div class="modal-body" >
            <div id="printframe" style="height:450px">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-default btn-sm" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
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
import {spin, urlapi, valid} from '@/tools'
export default {
  name: 'packingquality',
  props: ['pack'],
  data () {
    return {
      turns: [{id: 0, name: 'AM'}, {id: 1, name: 'PM'}],
      listcalibers: [],
      caliber: '',
      passaprove: false,
      manager: '',
      managers: [],
      supers: [],
      sup: '',
      clientname: '',
      entity: '',
      title: '',
      itemkill: {},
      list: [],
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
        npallet: 0,
        hours: new Date(),
        grossweight: 0,
        humidity: 0,
        caliber: 0,
        sizekg: 0,
        unitcaroso: 0,
        weightcaroso: 0,
        percetcaroso: 0,
        damegeweight: 0,
        percentweight: 0,
        totaldamageweight: 0,
        dosingspeed: 0,
        tenderspeed: 0,
        note: '',
        notefix: '',
        fix: 0,
        supervisor_id: 0,
        aprove: 0,
        turn: 0
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
      url: '/packingsquality',
      showspinner: false,
      stylespiner: spin,
      fix: false
    }
  },
  components: {
    datepicker, 'date-picker': timePicker, find, paginator, easpinner, deletes
  },
  computed: {
    ...mapState({
      passportStore: state => state.passportstore,
      userStore: state => state.userstore
    }),
    percaroso: function () {
      let result = (parseFloat(this.item.weightcaroso) / (parseFloat(this.item.sizekg) * 1000) * 100).toFixed(1)
      // eslint-disable-next-line
      this.item.percetcaroso = isNaN(result) ? 0 : result
      return this.item.percetcaroso
    },
    perdamage: function () {
      let result = (parseFloat(this.item.damegeweight) / (parseFloat(this.item.sizekg) * 1000) * 100).toFixed(1)
      // eslint-disable-next-line
      this.item.percentweight =  isNaN(result) ? 0 : result
      return this.item.percentweight
    },
    passfix: function () {
      let pas = false
      if (this.fix) {
        pas = this.item.notefix !== null && this.item.notefix !== ''
      } else { pas = true }
      return pas
    },
    trueparams: function () {
      // eslint-disable-next-line
      this.fix = (parseInt(this.item.caliber) - 15) > parseFloat(this.caliber.ends) ||
       (parseInt(this.item.humidity) > parseFloat(this.pack.humidity)) ||
       ((parseFloat(this.item.damegeweight) / (this.item.sizekg * 1000) * 100) > 4)
      return this.fix
    }
  },
  mounted () {
    this.axios.get(urlapi + '/packings/calibers/' + this.pack.typepacking).then(res => {
      this.listcalibers = res.data
      this.caliber = res.data.find(it => { return it.id === parseInt(this.pack.caliber) })
    })
    this.getlist()
    this.axios.get(urlapi + '/clients/getclient/' + this.pack.client_id).then(res => {
      this.clientname = res.data.name
    })
    this.axios.get(urlapi + '/users/xranks/' + '5').then(res => {
      this.supers = res.data
    })
    this.axios.get(urlapi + '/users/xranks/' + '6').then(res => {
      this.managers = res.data
    })
    this.getboss()
  },
  methods: {
    info () {
      window.$('#printframe').html('<iframe src="' + urlapi + '/packing/quality/info/' + this.pack.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    getaprove (it) {
      let h = parseInt(it.humidity) > parseInt(this.pack.humidity)
      let c = (parseInt(it.caliber) - 15) > parseInt(this.caliber.ends)
      let p = parseFloat(it.percetcaroso) > this.pack.carozo
      return (h || c || p) ? {valid: false, label: 'NO CONFORME'} : {valid: true, label: 'ACEPTADO'}
    },
    pass () {
      if (this.item.manager_id !== 0) {
        let data = {
          packing_id: this.pack.id,
          submodule: 2,
          aprove2_id: this.item.manager_id
        }
        this.axios.post(urlapi + '/packings/pass', data).then(res => {
          this.passaprove = true
        })
      }
    },
    passline (item) {
      if (this.item.manager_id !== 0) {
        this.axios.post(urlapi + this.url + '/passline/' + item.id).then(res => {
          item.aprove = 1
        })
      }
    },
    getboss () {
      this.axios.get(urlapi + '/packings/getboss/' + this.pack.id + '/2').then(res => {
        if (Object.keys(res.data).length !== 0) {
          this.item.manager_id = res.data.aprove2_id
          this.item.supervisor_id = res.data.aprove1_id
          this.passaprove = true
        }
      })
    },
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
        this.clients = response.data.clients
        this.status = response.data.status
        this.typepacking = response.data.typepacking
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    news () {
      this.act = 'post'
      let it = this.item
      for (let property in it) {
        if (typeof it[property] === 'number') { it[property] = 0 }
        if (typeof it[property] === 'string') { it[property] = '-' }
        if (typeof it[property] === 'object') { it[property] = {} }
      }
      this.item.moment = new Date()
      this.item.hours = new Date()
      this.item.packing_id = this.pack.id
      this.item.notefix = ''
      this.newview = false
    },
    save () {
      this.item.fix = this.fix
      if (this.item.npallet !== '' && this.item.npallet !== '-') {
        this.item.totaldamageweight = parseFloat(this.item.percentweight) + parseFloat(this.item.percetcaroso)
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
      } else {
        this.$toasted.error('Existen datos erroneos o incompletos!')
      }
    },
    edit (enty) {
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.item.moment = new Date(this.item.moment.replace(/-/g, '/'))
      this.newview = false
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar toma de temperatura'
      window.$('#delete').modal('show')
    },
    valnumber: valid
  }
}
</script>

<style lang="css" scoped>
  .bknot {
    background-color: rgba(207, 13, 11, 0.35);
    text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
    color:black;
  }
</style>
