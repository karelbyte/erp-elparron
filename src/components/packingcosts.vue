<template lang="html">
  <div class="">
    <div v-if="views.view">
      <p>
        <samp class="txtblack">Procedimiento:</samp> Se debe indicar la totalidad de la información, a fin de no realizar procedimientos erróneos.<br>
        <samp class="txtblack">Acciones Correctivas:</samp> Si se detecta un error en la orden, se debe avisar al Jefe de Planta.<br>
      <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <strong >Nueva</strong> para generar datos.<br>
      </p><hr>
      <p class="leyenda"> HISTORICO DE COSTO DE LA PRODUCCION</p>
      <p class="leyenda"> ORDEN: {{pack.folio}}</p>
      <hr>
    </div>
    <div v-if="views.newview">
    <div class="panel panel-default">
      <div class="panel-heading pnl-heading-fix-t">
         Generador de datos de costos
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
                  <label>Responsable</label>
                  <select class="form-control input-sm" v-model="item.responsable_id">
                    <option v-for="us in users" :key="us.id" :value="us.id"> {{us.name}}</option>
                  </select>
                </div>
              </div>
           </div>
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="panel panel-success">
              <div class="panel-heading pnl-heading-fix-t">REGISTRO DE PERSONAL</div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                    Listado de trabajadores
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    Registrar Horas extras
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                    <select class="form-control input-sm" v-model="worker.id">
                      <option v-for="us in users" :key="us.id" :value="us.id"> {{us.name}}</option>
                    </select>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" v-model="worker.bono" @keydown="valnumber($event)">
                      <span class="input-group-btn">
                       <button class="btn btn-default" @click="setworker()" type="button"><i class="fa fa-plus"></i></button>
                      </span>
                    </div>
                  </div>
                </div>
                <hr style="margin: 15px 0 15px 0">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    TRABAJADOR
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    HORAS EXTRAS
                  </div>
                </div>
                <div class="row rowset" v-for="worker in workers" :key="worker.id">
                     <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                       {{desc(worker.id, 'users')}}
                     </div>
                     <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                       {{worker.bono}}
                      </div>
                     <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                       <button class="btn btn-danger btn-xs" @click="delworker(worker.id)"><i class="fa fa-eraser"></i></button>
                     </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="panel panel-success">
              <div class="panel-heading pnl-heading-fix-t">REGISTRO DE INSUMOS</div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                    Listado de insumos
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    Registrar consumo
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                    <select class="form-control input-sm" v-model="supplie.id">
                      <option v-for="sup in supplies" :key="sup.id" :value="sup.id"> {{sup.name}}</option>
                    </select>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" v-model="supplie.cant" @keydown="valnumber($event)">
                      <span class="input-group-btn">
                       <button class="btn btn-default" @click="setsupplie()" type="button"><i class="fa fa-plus"></i></button>
                      </span>
                    </div>
                  </div>
                </div>
                <hr  style="margin: 15px 0 15px 0">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    INSUMO
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    CONSUMO
                  </div>
                </div>
                <div class="row rowset" v-for="supplie in suppliesch" :key="supplie.id">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    {{desc(supplie.id, 'supplies')}}
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    {{supplie.cant}}
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <button class="btn btn-danger btn-xs" @click="delsupplie(supplie.id)"><i class="fa fa-eraser"></i></button>
                  </div>
                </div>
              </div>
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
      <div class="row">
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">
          <button v-if="!list.length > 0" class="btn btn-success btn-fix btn-sm" @click="news()" > Nueva</button>
           <a v-if="list.length > 0" class="btn btn-info btn-sm" @click="info()">Informe</a>
        </div>
        <div  class="col-lg-8 col-md-7 col-sm-7 hidden-xs"> </div>
        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">
          <find :filters="philtres" fil="folio" v-on:getfilter="getlist" placehol="..."></find>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default pnl">
            <div class="panel-heading pnl-heading-fix-t">
              <div class="row rowheader">
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Fecha </div>
                <!--   <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Hora</div> -->
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Responsable</div>
                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6"></div>
              </div>
            </div>
            <div class="panel-body pnl-body-fix-t">
              <div  class="row rowset" v-for="entity in list" :key="entity.id" >
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs" >{{entity.moment}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">{{desc(entity.responsable_id,'users')}}</div>
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
import packingsorbatodetails from '@/components/packingsorbatodetails'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import timePicker from 'vue-bootstrap-datetimepicker'
import datepicker from 'vuejs-datepicker'
import {spin, urlapi, valid, getdescrip} from '@/tools'
export default {
  name: 'packingcosts',
  props: ['pack'],
  data () {
    return {
      workers: [],
      worker: {
        id: 0,
        bono: 0
      },
      sup: '',
      supplie: {
        id: 0,
        cant: 0
      },
      supplies: [],
      suppliesch: [],
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
        responsable_id: 0
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
      url: '/packingcost',
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
  },
  methods: {
    info () {
      window.$('#printframe').html('<iframe src="' + urlapi + '/packing/cost/info/' + this.pack.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    setworker () {
      let w = JSON.parse(JSON.stringify(this.worker))
      if (this.workers.find(it => it.id === w.id) === undefined) {
        this.workers.push(w)
        this.worker.id = 0
        this.worker.bono = 0
      }
    },
    setsupplie () {
      let w = JSON.parse(JSON.stringify(this.supplie))
      if (this.suppliesch.find(it => it.id === w.id) === undefined) {
        this.suppliesch.push(w)
        this.supplie.id = 0
        this.supplie.cant = 0
      }
    },
    delworker (i) {
      this.workers = this.workers.filter(it => { return it.id !== i })
    },
    delsupplie (i) {
      this.suppliesch = this.suppliesch.filter(it => { return it.id !== i })
    },
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
        this.supplies = response.data.supplies
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
      this.item.responsable_id = 0
      this.workers = []
      this.suppliesch = []
      this.onview('newview')
    },
    save () {
      let data = {
        item: this.item,
        workers: this.workers,
        supplies: this.suppliesch
      }
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: data
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
      this.axios.get(urlapi + this.url + '/details/' + enty.id).then(res => {
        this.act = 'put'
        this.item = JSON.parse(JSON.stringify(enty))
        this.workers = res.data.workers
        this.suppliesch = res.data.supplies
        this.onview('newview')
      })
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar datos de constos'
      window.$('#delete').modal('show')
    },
    valnumber: valid,
    desc: getdescrip
  }
}
</script>

<style lang="css">
</style>
