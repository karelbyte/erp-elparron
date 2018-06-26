<template lang="html">
  <div class="">
    <div v-if="views.newview">
      <p><samp class="txtblack">Frecuencia:</samp> Toda vez que se genere una erden de trabajo para el proceso.<br>
      <samp class="txtblack">Procedimiento:</samp> Se debe indicar la totalidad de la información, a fin de no realizar procedimientos erróneos.<br>
      <samp class="txtblack">Acciones Correctivas:</samp> Si se detecta un error en la orden, se debe avisar al Jefe de Planta.<br>
      <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <span class="glyphicon glyphicon-cog"></span> para entrar en sus modulos.<br>
      </p>  <hr>
      <p class="leyenda"> HISTORICO DE ORDENES DE ENVASADO</p>
      <hr>
    </div>
    <!--Panel de creacion de ordenes -->
    <packingcom v-if="views.newpack" :pack="item" :acts="act" v-on:getclosepacking="closes()"> </packingcom>
    <packingbinsupdate v-if="views.binsupdate" :order="item" v-on:getclosepacking="closes()"> </packingbinsupdate>
    <packingtemp v-if="views.temp" :pack ="item"  v-on:getclosepacking="closes()"> </packingtemp>
    <packingquality v-if="views.quality" :pack ="item"  v-on:getclosepacking="closes()"> </packingquality>
    <packingsorbato v-if="views.sorbato" :pack ="item"  v-on:getclosepacking="closes()"> </packingsorbato>
    <packingdaily v-if="views.daily" :pack ="item"  v-on:getclosepacking="closes()"> </packingdaily>
    <packingsprocess v-if="views.process" :pack ="item"  v-on:getclosepacking="closes()"> </packingsprocess>
    <packingincident v-if="views.incident" :pack ="item"  v-on:getclosepacking="closes()"> </packingincident>
    <packingcosts v-if="views.cost" :pack ="item"  v-on:getclosepacking="closes()"> </packingcosts>
    <packingnotcompliants v-if="views.notcompliants" :pack ="item"  v-on:getclosepacking="closes()"> </packingnotcompliants>
    <!--Panel de visualizacion de ordenes -->
    <div v-if="views.newview">
      <div  class="row">
         <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 ">
           <button class="btn btn-success btn-fix btn-sm" @click="news()" > Nueva</button>
         </div>
         <div  class="col-lg-8 col-md-8 col-sm-8 col-xs-8"> </div>
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
                      <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">Folio</div>
                      <div class="col-lg-2 col-md-3 col-sm-4 hidden-xs">Proceso</div>
                      <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">Cantidad </div>
                      <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Cliente </div>
                      <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">Estado </div>
                      <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6"></div>
                   </div>
                </div>
              <div class="panel-body pnl-body-fix-t">
                 <div  class="row rowset" v-for="entity in list" :key="entity.id" @click="setorder(entity)">
                  <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.datefix}}</div>
                  <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">{{entity.folio}}</div>
                  <div class="col-lg-2 col-md-3 col-sm-4 hidden-xs">{{descrip(entity.typepacking, 'typepacking')}} </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">{{entity.cant}}</div>
                  <div class="col-lg-2 hidden-md hidden-sm hidden-xs">{{descrip(entity.client_id, 'clients')}}</div>
                  <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">{{descrip(entity.status_id, 'status')}} </div>
                  <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                    <button  v-if="entity.status_id === 2"  @click="info(entity)" class="btn btn-success btn-xs">Informe</button>
                    <div  v-if="entity.status_id !== 2" class="dropdown ">
                      <button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Acciones
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu dropdown-fix" aria-labelledby="dropdownMenu1">
                        <li v-if="entity.status_id === 1"><a  @click="edit(entity)">Actualizar</a></li>
                        <li><a @click="operator(entity)">Operario</a></li>
                        <li><a @click="updatebins(entity)">Baja Bins</a></li>
                        <li><a  @click="info(entity)">Informe</a></li>
                        <li v-if="entity.status_id === 1"><a style="color:rgb(129, 42, 50)" @click="kill(entity)">Eliminar</a></li>
                        <li v-if="entity.status_id === 1" role="separator" class="divider"></li>
                        <li v-if="entity.status_id === 1"><a  @click="closerecep(entity)">Cerrar</a></li>
                      </ul>
                    </div>
                  </div>
                  <popper trigger="click" :options="{placement: 'top'}">
                    <div class="popper">
                      <button class="btn btn-success btn-sm btn-color" @click="showproces('temp')" data-toggle="tooltip" data-placement="right" title="Temperatura"><i class="fa fa-thermometer-full fa-2x"></i></button> <!-- Temperatura -->
                      <button class="btn btn-success btn-sm" @click="showproces('quality')" data-toggle="tooltip" data-placement="right" title="Calidad"><i class="fa fa-check-circle fa-2x"></i></button> <!-- Calidad -->
                      <button class="btn btn-success btn-sm" @click="showproces('sorbato')" data-toggle="tooltip" data-placement="right" title="Sorbato"><i class="fa fa-flask fa-2x"></i></button> <!-- Sorbato-->
                      <button class="btn btn-success btn-sm" @click="showproces('daily')" data-toggle="tooltip" data-placement="right" title="Diario de envasado"><i class="fa fa-list-alt fa-2x"></i></button>  <!-- Diario de envasado-->
                      <button class="btn btn-success btn-sm" @click="showproces('process')" data-toggle="tooltip" data-placement="right" title="Diario de procesos" ><i class="fa fa-list-ul fa-2x"></i></button> <!-- Diario de procesos-->
                      <button class="btn btn-success btn-sm" @click="showproces('incident')" data-toggle="tooltip" data-placement="right" title="Incidentes" ><i class="fa fa-align-justify fa-2x"></i></button> <!-- Incidentes-->
                      <button class="btn btn-success btn-sm" @click="showproces('cost')" data-toggle="tooltip" data-placement="right" title="Costos"><i class="fa fa-credit-card fa-2x"></i></button> <!-- Costos-->
                      <button class="btn btn-success btn-sm" @click="showproces('notcompliants')" data-toggle="tooltip" data-placement="right" title="No conforme"><i class="fa fa-times-circle fa-2x"></i></button> <!-- No conforme-->
                    </div>
                     <button slot="reference" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-cog"></span></button>
                  </popper>
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
         <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.folio" :title="title"></deletes>
      </div>
    </div>
      <easpinner :show="showspinner" :styles="stylespiner"></easpinner>
      <div class="modal fade"  id="view_doc" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h6 class="modal-title" id="">Visor información de envasado {{item.folio}}</h6>
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
import popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'
import {spin, urlapi, getdescrip} from '../tools'
import paginator from '@/components/paginator'
import easpinner from '@/components/spinner'
import deletes from '@/components/deletes'
import packingcom from '@/components/packingcom'
import packingbinsupdate from '@/components/packingbinsupdate'
import packingtemp from '@/components/packingtemp'
import packingquality from '@/components/packingquality'
import packingsorbato from '@/components/packingsorbato'
import packingdaily from '@/components/packingdaily'
import find from '@/components/find'
import packingsprocess from '@/components/packingsprocess'
import packingincident from '@/components/packingincident'
import packingcosts from '@/components/packingcosts'
import packingnotcompliants from '@/components/packingnotcompliants'
export default {
  name: 'packing',
  data () {
    return {
      clientname: '',
      entity: '',
      title: '',
      itemkill: {},
      list: [],
      clients: [],
      typepacking: [],
      supplies: [],
      status: [],
      format: 'dd-MM-yyyy',
      act: 'post',
      stock: [],
      item: {
      },
      views: {
        newview: true,
        binsupdate: false,
        newpack: false,
        temp: false,
        quality: false,
        sorbato: false,
        daily: false,
        process: false,
        incident: false,
        cost: false,
        notcompliants: false
      },
      url: '/packings',
      philtres: {folio: ''},
      items: {
        field: 'datepaking',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 9
      },
      totalpage: 0,
      showspinner: false,
      stylespiner: spin,
      select: 0
    }
  },
  components: {
    popper,
    paginator,
    easpinner,
    deletes,
    find,
    packingcom,
    packingbinsupdate,
    packingtemp,
    packingquality,
    packingsorbato,
    packingdaily,
    packingsprocess,
    packingincident,
    packingcosts,
    packingnotcompliants
  },
  mounted () {
    this.getlist()
  },
  methods: {
    setorder (item) {
      this.item = JSON.parse(JSON.stringify(item))
      this.select = this.item.id
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
      let it = {
        folio: '',
        datepacking: new Date(),
        typepacking: 0,
        typefruit: 0,
        variety: 0,
        caliber: 0,
        cant: 0,
        process: '-',
        client_id: 0,
        containertype: '-',
        humidity: 0,
        preserver: '-',
        print: '-',
        surpervisor: '-',
        productionmanager: '-',
        realcant: 0,
        orders: [],
        orderslist: [],
        specialtreatments: '-',
        carozo: 0
      }
      this.item = it
      this.onview('newpack')
    },
    edit (enty) {
      this.item = JSON.parse(JSON.stringify(enty))
      this.act = 'put'
      this.item.datepacking = new Date(this.item.datepacking.replace(/-/g, '/'))
      this.onview('newpack')
    },
    closes () {
      /* this.views.newview = false
      this.views.binsupdate = false */
      this.onview('newview')
      this.getlist()
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Cancelar la orden'
      window.$('#delete').modal('show')
    },
    operator (item) {
      window.$('#printframe').html('<iframe src="' + urlapi + '/packing/operator/' + item.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    updatebins (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      this.onview('binsupdate')
    },
    onview (pro) {
      for (let property in this.views) {
        this.views[property] = property === pro
      }
    },
    info (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      window.$('#printframe').html('<iframe src="' + urlapi + '/packing/info/' + aitem.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    showproces (proc) {
      this.onview(proc)
    },
    descrip: getdescrip
  }
}
</script>

<style lang="css">

.select {
  background-color: rgba(16, 66, 13, 0.49);
  cursor:pointer;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:black;
}

</style>
