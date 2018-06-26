<template lang="html">
  <div class="">
  <div v-if="!newview && !viewcaliber && !viewupdate">
    <p><samp class="txtblack">Frecuencia:</samp>Toda vez que se genere un orden de calibrado para el proceso.<br>
    <samp class="txtblack">Procedimiento:</samp>Se debe indicar la totalidad de la información, a fin de no realizar procedimientos erróneos.<br>
    <samp class="txtblack">Acciones Correctivas:</samp>Si se detecta un error en la orden, se debe avisar al Jefe de Planta.<br>
    <p class="text-justify"><samp class="txtblack">AYUDA:</samp>Modulo de envio de frutas para calibrar, utilize el boton "Nueva".<br>
    <p class="leyenda text-justify">HISTORICO DE ORDENES DE CALIBRADO</p>
    <hr>
  </div>
  <!--Panel de recepcion de lotes -->
  <caliber v-if="newview && !viewcaliber && !viewupdate" :itm="item" v-on:getclose="refres()"></caliber>
  <binscaliber v-if="viewcaliber" :order="item" v-on:getclosebins="refresbins()"></binscaliber>
  <binsupdate v-if="viewupdate" :order="item" v-on:getclosebins="refresupdate()"></binsupdate>
  <div v-if="!newview && !viewcaliber && !viewupdate"> <!-- Listado de ordenes de calibrado -->
    <div  class="row">
       <div class="col-lg-9 col-md-6 col-sm-6 col-xs-5">
         <button class="btn btn-success btn-fix btn-sm" @click="news()">Nueva</button>
       </div>
       <div class="col-lg-3 col-md-6 col-sm-6 col-xs-7">
         <find :filters="filters" fil="folio" v-on:getfilter="getlist" placehol="buscar por folio"></find>
       </div>
    </div>
    <div class="row">
       <div class="col-lg-12">
          <div class="panel panel-default pnl">
              <div class="panel-heading pnl-heading-fix-t">
                  <div class="row rowheader">
                    <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Fecha</div>
                    <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Folio</div>
                    <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Cliente </div>
                    <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">Madera </div>
                    <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">Plastico</div>
                    <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Cant. Bins</div>
                    <div class="col-lg-1 hidden-md hidden-sm hidden-xs">Kg Net</div>
                    <div class="col-lg-1 col-md-2 hidden-sm hidden-xs">Estado </div>
                    <div class="col-lg-1 col-md-2 col-sm-1 col-xs-6"> </div>
                 </div>
              </div>
            <div class="panel-body pnl-body-fix-t">
              <div class="row rowset" v-for="entity in list" :class="{closes: entity.status_id === 2}" :key="entity.id">
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.datefix}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{entity.folio}}</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">{{getdescrip(entity.client_id, 'clients')}} </div>
                <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">{{entity.cantwood}} </div>
                <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">{{entity.cantplastic}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.totalbins}}</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.totalkgnet}}</div>
                <div class="col-lg-1 col-md-2 hidden-sm hidden-xs">{{getdescrip(entity.status_id, 'statuscalibrated')}}</div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">
                  <div class="dropdown ">
                    <button  v-if="entity.status_id === 2"  @click="info(entity)" class="btn btn-success btn-xs">Informe</button>
                    <button v-if="entity.status_id !== 2" class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      Acciones
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-fix" aria-labelledby="dropdownMenu1">
                      <li v-if="entity.status_id === 1"><a @click="edit(entity)">Actualizar</a></li>
                      <li><a @click="operator(entity)">Operario</a></li>
                      <li v-if="entity.status_id === 1"><a @click="binsrecep(entity)">Baja Bins</a></li>
                      <li v-if="entity.status_id === 1"><a @click="bins(entity)">Calibrados</a></li>
                      <li><a @click="info(entity)">Informe</a></li>
                      <li v-if="entity.status_id === 1" role="separator" class="divider"></li>
                      <li v-if="entity.status_id === 1"><a style="color:rgb(129, 42, 50)" @click="kill(entity)">Eliminar</a></li>
                      <li v-if="entity.status_id === 1" role="separator" class="divider"></li>
                      <li v-if="entity.status_id === 1"><a  @click="closecalibrated(entity)">Cerrar</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel-footer pnl-footer-fix-t">
              <div class="row">
                 <div class="col-lg-9 col-md-6 col-sm-6 col-xs-12 ">
                 <paginator :tpage="totalpage" :pager="pager" v-on:getresult="getlist"></paginator>
                 </div>
                 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                 </div>
              </div>
            </div>
          </div>
     </div>
       <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.folio" :title="title"></deletes>
    </div>
  </div>
  <div class="modal fade " id="confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
              <div class="modal-header mdl_header_custom">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h5 class="modal-title" id="myModalLabel">Atención se dispone a cerrar la orden de calibrado</h5>
              </div>
              <div class="modal-body mdl_body_custom">
                  <p>Elemento: <samp class="txtblack">{{item.folio}}</samp> </p>
                  <p>Revisar que todos los bins esten actualizados!</p>
                  <p>Cuidado! Esta acción es irreversible. Desea proceder?</p>
              </div>
              <div class="modal-footer mdl_footer_custom">
                  <button @click="closeconfirm()" class="btn btn-danger btn-sm">SI</button>
                  <a href="#" data-dismiss="modal" class="btn btn-default  btn-sm">No</a>
              </div>
          </div>
     </div>
  </div>
  <!--MODAL DE VISUALIZCION DEL DOC -->
     <div class="modal fade"  id="view_doc" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
       <div class="modal-dialog modal-lg">
         <div class="modal-content">
           <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
             <h6 class="modal-title" id="">Visor información de ordenes {{item.folio}}</h6>
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
      <spinner :show="showspinner" :styles="stylespiner"></spinner>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import datepicker from 'vuejs-datepicker'
import find from '@/components/find'
import caliber from '@/components/caliber'
import binscaliber from '@/components/binscaliber'
import binsupdate from '@/components/binsupdate'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import deletes from '@/components/deletes'
import {spin, urlapi, valid} from '@/tools'
export default {
  name: 'calibrated',
  data: function () {
    return {
      entity: '',
      title: '',
      itemkill: {},
      list: [],
      clients: [],
      statuscalibrated: [],
      act: 'post',
      item: {
        id: 0,
        datecalibrated: (new Date()).toISOString(),
        user_id: 0,
        folio: 0,
        client_id: 0,
        cantwood: 0,
        cantplastic: 0,
        totalbins: 0,
        totalkgnet: 0,
        status: ''
      },
      newview: false,
      viewcaliber: false,
      viewupdate: false,
      url: '/calibrated',
      filters: {
        folio: ''
      },
      orders: {
        field: 'datecalibrated',
        type: 'desc'
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
    paginator, spinner, deletes, find, datepicker, caliber, binscaliber, binsupdate
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
    valnumber: valid,
    getlist (pFil, pOrder, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.filters = pFil }
      if (pOrder !== undefined) { this.orders = pOrder }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener ordenes de calibrado
        method: 'get',
        url: urlapi + this.url,
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.filters, orders: this.orders}
      }).then(response => {
        this.list = response.data.list
        this.clients = response.data.clients
        this.statuscalibrated = response.data.statuscalibrated
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    getdescrip (rl, descrip) {
      let aux = ''
      for (let it of this[descrip]) {
        if (it.id === rl) {
          aux = it.name
          break
        }
      }
      return aux
    },
    news () {
      this.item.id = 0
      this.item.client_id = 0
      this.item.cantwood = 0
      this.item.cantplastic = 0
      this.item.totalbins = 0
      this.item.totalkgnet = 0
      this.newview = true
    },
    edit (enty) {
      this.item = JSON.parse(JSON.stringify(enty))
      this.item.datecalibrated = new Date(this.item.datecalibrated.replace(/-/g, '/'))
      this.newview = true
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar la orden.'
      window.$('#delete').modal('show')
    },
    refres () {
      this.item.id = 0
      this.item.client_id = 0
      this.item.cantwood = 0
      this.item.cantplastic = 0
      this.item.totalbins = 0
      this.item.totalkgnet = 0
      this.newview = false
      this.getlist()
    },
    refresbins () {
      this.viewcaliber = false
      this.getlist()
    },
    refresupdate () {
      this.viewupdate = false
      this.getlist()
    },
    operator (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      window.$('#printframe').html('<iframe src="' + urlapi + '/calibrated/operator/' + aitem.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    info (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      window.$('#printframe').html('<iframe src="' + urlapi + '/calibrated/info/' + aitem.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    bins (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      this.viewcaliber = true
    },
    binsrecep (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      this.viewupdate = true
    },
    closecalibrated (entity) {
      this.item = entity
      this.axios.get(urlapi + this.url + '/trueclose/' + this.item.id).then(res => {
        if (res.data[0].cant > 0) {
          this.$toasted.info('Existen bins sin dar de baja!')
        } else {
          window.$('#confirm').modal('show')
        }
      })
    },
    closeconfirm () {
      this.axios.post(urlapi + this.url + '/close/' + this.item.id, {}).then(res => {
        this.$toasted.success(res.data)
        window.$('#confirm').modal('hide')
        this.getlist()
      })
    }
  }
}
</script>

<style lang="css">
.closes {
  background-color: rgba(120, 207, 118, 0.35);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:rgb(16, 34, 21);
}
</style>
