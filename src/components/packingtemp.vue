<template lang="html">
 <div class="">
   <div v-if="newview">
     <p>
       <samp class="txtblack">Frecuencia:</samp>Diariamente y cada 1 Hora.<br>
      <samp class="txtblack">Procedimiento:</samp>Registrar la T° del visor, la cual debe estar entre 90-100ºC.<br>
      <samp class="txtblack">Acciones Correctivas:</samp> Si la T° no corresponde al rango establecido, la T° debe ajustarse oportunamente.<br>
       <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <strong >Nueva</strong> para generar datos.<br>
     </p><hr>
     <p class="leyenda"> HISTORICO DE TEMPERATURA DE ORDEN DE ENVASADO</p>
     <p class="leyenda"> CLIENTE: {{clientname}}</p>
     <p class="leyenda"> ORDEN: {{pack.folio}}</p>
     <hr>
   </div>
   <div v-if="!newview">
      <div class="panel panel-default">
        <div class="panel-heading pnl-heading-fix-t">
           Generador de datos de temperatura
        </div>
        <div class="panel-body">
              <div class="row">
                <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
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
                 <div class="col-lg-1 col-md-2 col-sm-2 col-xs-12">
                   <div class="form-group">
                     <label>Hora</label>
                     <date-picker v-model="item.mtime" :config="configtime" class="input-sm"></date-picker>
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label>Temperatura C°</label>
                      <input type="text" class="form-control input-sm" v-model="item.temp" @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label >Ajuste C°</label>
                     <input type="text" class="form-control input-sm" v-model="item.t" placeholder="">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                   <div class="form-group">
                     <label >Temperatura C° Verificación</label>
                      <input type="text" class="form-control input-sm" v-model="item.tc" @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                   <div class="form-group">
                     <label>Hora Verificación</label>
                     <date-picker v-model="item.ttime" :config="configtime" class="input-sm"></date-picker>
                   </div>
                 </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label> Supervisor de turno</label>
                    <select :disabled="passaprove" class="form-control input-sm" name="" v-model="item.supervisor_id">
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

   </div>
    <div v-if="newview">
     <div  class="row">
       <div class="col-lg-5 col-md-3 col-sm-2 col-xs-2">
         <form :action="api + '/packing/temp/xls'" method="post">
           <a v-if="!passaprove" class="btn btn-success btn-fix btn-sm" @click="news()" > Nueva</a>
           <a v-if="list.length > 0" class="btn btn-info btn-sm" @click="info()">Informe</a>
           <input hidden type="text" name="id" v-model="pack.id">
           <!--<button type="submit" class="btn btn-info btn-sm">Excel</button> -->
         </form>
       </div>
       <div  class="col-lg-4 col-md-7 col-sm-7 col-xs-7"> </div>
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
               <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">Turno</div>
               <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">Hora</div>
               <div class="col-lg-1 col-md-3 col-sm-4 hidden-xs">Temperatura C°</div>
               <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">Ajust. Temp C°</div>
               <div class="col-lg-2 hidden-md hidden-sm hidden-xs">T. C° Verificación</div>
               <div class="col-lg-1 col-md-2 hidden-sm hidden-xs">H. Verificación</div>
               <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">Supervisor</div>
               <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6"></div>
             </div>
           </div>
           <div class="panel-body pnl-body-fix-t">
             <div  class="row rowset" v-for="entity in list" :key="entity.id" :class="{'bk': entity.aprove === 1}">
               <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.moment}}</div>
               <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">{{desc(entity.turn, 'turns')}}</div>
               <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">{{entity.mtime}}</div>
               <div class="col-lg-1 col-md-3 col-sm-4 hidden-xs">{{entity.temp}} </div>
               <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">{{entity.t}}</div>
               <div class="col-lg-2 hidden-md hidden-sm hidden-xs">{{entity.tc}}</div>
               <div class="col-lg-1 col-md-2 hidden-sm hidden-xs">{{entity.ttime}}</div>
               <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">{{desc(entity.supervisor_id, 'supers')}}</div>
               <div v-if="!passaprove" class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
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
                 Jefe de producción
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
import {spin, urlapi, valid, getdescrip} from '../tools'
export default {
  name: 'packingtemp',
  props: ['pack'],
  data () {
    return {
      api: urlapi,
      turns: [{id: 0, name: 'AM'}, {id: 1, name: 'PM'}],
      passaprove: false,
      clientname: '',
      manager: '',
      managers: [],
      supers: [],
      sup: '',
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
        turn: 0,
        moment: new Date(),
        mtime: new Date(),
        temp: 0,
        t: 0,
        tc: 0,
        ttime: new Date(),
        supervisor_id: '',
        aprove: 0,
        manager_id: ''
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
      url: '/packingstemp',
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
    this.axios.get(urlapi + '/clients/getclient/' + this.pack.client_id).then(res => {
      this.clientname = res.data.name
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
    info () {
      window.$('#printframe').html('<iframe src="' + urlapi + '/packing/temp/info/' + this.pack.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
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
    getboss () {
      this.axios.get(urlapi + '/packings/getboss/' + this.pack.id + '/1').then(res => {
        if (Object.keys(res.data).length !== 0) {
          this.item.manager_id = res.data.aprove2_id
          this.item.supervisor_id = res.data.aprove1_id
          this.passaprove = true
        }
      })
    },
    getdata () { // se cargan dato de utilidad
      this.axios.get(urlapi + this.url + '/gettemp/' + this.pack.id).then(res => {
        if (res.data.packing_id !== undefined) { this.item = res.data }
      })
    },
    edit (enty) {
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      // this.item.moment = new Date(this.item.moment.replace(/-/g, '/'))
      this.newview = false
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar toma de temperatura'
      window.$('#delete').modal('show')
    },
    news () {
      this.act = 'post'
      this.item.moment = new Date()
      this.item.packing_id = this.pack.id
      this.item.turn = 0
      this.item.mtime = new Date()
      this.item.temp = 0
      this.item.t = 0
      this.item.tc = 0
      this.item.ttime = new Date()
      this.item.supervisor_id = 0
      this.item.aprove = 0
      this.item.manager_id = 0
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
    passline (item) {
      if (this.item.manager_id !== 0) {
        this.axios.post(urlapi + this.url + '/passline/' + item.id).then(res => {
          item.aprove = 1
        })
      }
    },
    pass () {
      if (this.item.manager_id !== 0) {
        let data = {
          packing_id: this.pack.id,
          submodule: 1,
          aprove2_id: this.item.manager_id
        }
        this.axios.post(urlapi + '/packings/pass', data).then(res => {
          this.passaprove = true
        })
      }
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
  .bk {
    background-color: rgba(103, 58, 11, 0.29) !important;
  }
</style>
