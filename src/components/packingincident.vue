<template lang="html">
 <div class="">
   <div v-if="newview">
     <p>
       <samp class="txtblack">Frecuencia:</samp>Cada vez que se genere un incidente.<br>
       <samp class="txtblack">Procedimiento:</samp> Registrar el incidente, indicar hora, equipos y personas involucradas.<br>
      <samp class="txtblack">Acciones Correctivas:</samp>Verificar el incidente y registrar la información, establecer el plazo de corrección, depto. Involucrado.<br>
       <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <strong >Nueva</strong> para generar datos.<br>
     </p><hr>
     <p class="leyenda"> HISTORICO DE INCIDENTES DE ORDEN DE ENVASADO</p>
     <p class="leyenda"> CLIENTE: {{clientname}}</p>
     <p class="leyenda"> ORDEN: {{pack.folio}}</p>
     <p class="leyenda"> PROCESO: {{packing}}</p>
     <p class="leyenda"> CALIBRE: {{caliber.name}}</p>
     <hr>
   </div>
   <div v-if="!newview">
      <div class="panel panel-default">
        <div class="panel-heading pnl-heading-fix-t">
           Generador de datos de incidentes
        </div>
        <div class="panel-body">
              <div class="row">
                <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                  <div class="form-group">
                    <label>Fecha</label>
                    <datepicker v-model="item.moment" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                  </div>
                </div>
                 <div class="col-lg-1 col-md-2 col-sm-2 col-xs-12">
                   <div class="form-group">
                     <label>Hora Incio</label>
                     <date-picker v-model="item.timebegin" :config="configtime" class="input-sm"></date-picker>
                   </div>
                 </div>
                 <div class="col-lg-1 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label>Hora término</label>
                     <date-picker v-model="item.timeend" :config="configtime" class="input-sm"></date-picker>
                   </div>
                 </div>
                 <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                   <div class="form-group">
                     <label >Detalles </label>
                     <input type="text" class="form-control input-sm" v-model="item.note" placeholder="">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                   <div class="form-group">
                     <label >Detención (min): </label>
                     <label class="form-control input-sm">{{item.min}}</label>   <!--<input type="text" class="form-control input-sm" v-model="item.min" @keydown="valnumber($event)"> -->
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                   <div class="form-group">
                     <label>Limpieza y retiro</label> <br>
                     <label style="margin-right: 20px"><input type="radio" v-model="item.clear" value="1"> SI</label>
                     <input type="radio" v-model="item.clear" value="0"> NO
                   </div>
                 </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label> Supervisor de turno</label>
                    <select class="form-control input-sm" name="" v-model="item.supervisor_id">
                      <option v-for="sup in supers" :key="sup.id" :value="sup.id"> {{sup.name}}</option>
                    </select>
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
    <div v-if="newview">
     <div  class="row">
       <div class="col-lg-2 col-md-2 col-sm-2 col-xs-1">
         <button v-if="!passaprove" class="btn btn-success btn-fix btn-sm" @click="news()" > Nueva</button>
         <button v-if="list.length > 0" class="btn btn-info btn-sm" @click="info()">Informe</button>
       </div>
       <div class="col-lg-7 col-md-4 col-sm-4 col-xs-8"> </div>
       <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
         <find :filters="philtres" fil="folio" v-on:getfilter="getlist" placehol="buscar folio"></find>
       </div>
     </div>
     <div class="row">
       <div class="col-lg-12">
         <div class="panel panel-default pnl">
           <div class="panel-heading pnl-heading-fix-t">
             <div class="row rowheader">
               <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Fecha </div>
               <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Hora Inicio</div>
               <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Hora término</div>
               <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Total Minutos</div>
               <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Limpiesa y retiro</div>
               <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">Supervisor</div>
               <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6"></div>
             </div>
           </div>
           <div class="panel-body pnl-body-fix-t">
             <div  class="row rowset" v-for="entity in list" :key="entity.id" >
               <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.moment}}</div>
               <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{entity.timebegin}}</div>
               <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.timeend}} </div>
               <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.min}}</div>
               <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{desc(entity.clear, 'clears')}} </div>
               <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">{{desc(entity.supervisor_id, 'supers')}}</div>
               <div v-if="!passaprove" class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
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
             <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
               <button class="btn btn-default btn-sm" @click="closes()"> <i class="fa fa-arrow-left"></i> Regresar</button>
             </div>
             <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="margin-bottom: 15px">
               <div class="form-group txtblack">
                 Jefe de producción
                 <select :disabled="passaprove" class="form-control input-sm" name="" v-model="item.manager_id">
                   <option v-for="manager in managers" :key="manager.id" :value="manager.id"> {{manager.name}}</option>
                 </select>
               </div>
               <button :disabled="passaprove" class="btn btn-primary btn-fix btn-sm" @click="pass()"> Aprobar</button>
             </div>
         </div>
       </div>
       <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.folio" :title="title"></deletes>
     </div>
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
import {spin, urlapi, valid, getdescrip} from '../tools'
export default {
  name: 'packingincidents',
  props: ['pack'],
  data () {
    return {
      clears: [{id: 0, name: 'NO'}, {id: 1, name: 'SI'}],
      supers: [],
      sup: '',
      packing: '',
      clientname: '',
      passaprove: false,
      manager: '',
      managers: [],
      caliber: '',
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
        timebegin: new Date(),
        timeend: new Date(),
        note: '',
        min: 0,
        clear: 0,
        supervisor_id: 0
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
      url: '/packingsincidents',
      showspinner: false,
      stylespiner: spin
    }
  },
  components: {
    datepicker, 'date-picker': timePicker, find, paginator, easpinner, deletes
  },
  watch: {
    'item.timebegin': function () {
      this.item.min = ((this.gettimeStr(this.item.timeend) - this.gettimeStr(this.item.timebegin)) / 1000) / 60
    },
    'item.timeend': function () {
      this.item.min = ((this.gettimeStr(this.item.timeend) - this.gettimeStr(this.item.timebegin)) / 1000) / 60
    }
  },
  computed: {
    ...mapState({
      passportStore: state => state.passportstore,
      userStore: state => state.userstore
    })
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
    this.axios.get(urlapi + '/packings/getutils').then(res => {
      this.packing = res.data.typepacking.find(it => { return it.id === parseInt(this.pack.typepacking) }).name
    })
    this.axios.get(urlapi + '/users/xranks/' + '7').then(res => {
      this.supers = res.data
    })
    this.axios.get(urlapi + '/users/xranks/' + '3').then(res => {
      this.managers = res.data
    })
    this.getboss()
  },
  methods: {
    getboss () {
      this.axios.get(urlapi + '/packings/getboss/' + this.pack.id + '/6').then(res => {
        if (Object.keys(res.data).length !== 0) {
          this.item.manager_id = res.data.aprove2_id
          this.item.supervisor_id = res.data.aprove1_id
          this.passaprove = true
        }
      })
    },
    pass () {
      if (this.item.manager_id !== 0) {
        let data = {
          packing_id: this.pack.id,
          submodule: 6,
          aprove2_id: this.item.manager_id
        }
        this.axios.post(urlapi + '/packings/pass', data).then(res => {
          this.passaprove = true
        })
      }
    },
    info () {
      window.$('#printframe').html('<iframe src="' + urlapi + '/packing/incident/info/' + this.pack.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    gettimeStr (t) {
      if (typeof t === 'string') {
        let h = parseInt(t.split(':')[0])
        let m = (t.split(':')[1]).substr(0, 2)
        let a = (t.split(':')[1]).split(' ')[1]
        if (a === 'pm') { h += 12 }
        return window.moment({ hour: h, minute: m })
      } else return 0
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
    closes () {
      this.$emit('getclosepacking')
    },
    close () {
      this.newview = true
    },
    getdata () { // se cargan dato de utilidad
      this.axios.get(urlapi + this.url + '/gettemp/' + this.pack.id).then(res => {
        if (res.data.packing_id !== undefined) { this.item = res.data }
      })
    },
    edit (enty) {
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.item.moment = new Date(this.item.moment.replace(/-/g, '/'))
      this.newview = false
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar incidencia'
      window.$('#delete').modal('show')
    },
    news () {
      this.act = 'post'
      this.item.packing_id = this.pack.id
      this.item.moment = new Date()
      this.item.timebegin = new Date()
      this.item.timeend = new Date()
      this.item.note = ''
      this.item.min = 0
      this.item.clear = 0
      this.item.supervisor_id = 0
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
    valnumber: valid,
    desc: getdescrip
  }
}
</script>

<style lang="css" scoped>
  txt {
    color: white !important;
  }
</style>
