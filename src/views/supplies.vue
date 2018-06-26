<template lang="html">
   <div class="">
     <div v-if="!newview">
       <p class="text-justify"><samp class="txtblack">AYUDA:</samp> Modulo recepcionador de insumos para uso en planta, utilize el boton "Nuevo".<br>
       <p class="leyenda"> HISTORICO RECEPCION DE INSUMOS</p>
        <hr>
     </div>
    <!--Panel de creacion de ordenes -->
    <supplie v-if="newview" :order="item" v-on:getclose="closecreatesupplie()"> </supplie>
    <!--Panel de visualizacion de ordenes -->
    <div v-if="!newview">
      <div  class="row">
         <div class="col-lg-9 col-md-6 col-sm-6 col-xs-6 ">
           <button class="btn btn-success btn-fix btn-sm" @click="news()" > Nuevo</button>
          <!-- <button class="btn btn-warning btn-fix btn-sm" @click="details()" > Detallado</button> -->
         </div>
         <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
            <find :filters="philtres" fil="batch" v-on:getfilter="getlist" placehol="buscar folio"></find>
         </div>
      </div>
      <div class="row">
         <div class="col-lg-12">
            <div class="panel panel-default pnl">
                <div class="panel-heading pnl-heading-fix-t">
                    <div class="row rowheader">
                      <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Fecha </div>
                      <div class="col-lg-1 col-md-2 col-sm-2  col-xs-6">Lot. producto</div>
                      <div class="col-lg-2 hidden-md hidden-sm col-xs-6">Lot. Planta</div>
                      <div class="col-lg-2 hidden-md hidden-sm   col-xs-6">Cliente</div>
                      <div class="col-lg-2 col-md-2 col-sm-2  col-xs-6">Producto</div>
                      <div class="col-lg-1 col-md-2 col-sm-2  col-xs-6">Cantidad</div>
                      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">Estado </div>
                      <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6"></div>
                   </div>
                </div>
              <div class="panel-body pnl-body-fix-t">
                <div class="row rowset" v-for="entity in list" :key="entity.id" :class="{recep: entity.status === 2, recep2: entity.status === 1, recep1: entity.status === 3 }">
                  <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.datefix}}</div>
                                  <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{entity.batch}}</div>
                  <div class="col-lg-2 hidden-md hidden-sm  col-xs-6">{{entity.batchcode}}</div>
                  <div class="col-lg-2 hidden-md hidden-sm  col-xs-6">{{getdescrip(entity.client_id, 'clients')}}</div>
                  <div class="col-lg-2 col-md-2 col-sm-2  col-xs-6">{{getdescrip(entity.typesupplie_id, 'typesupplies')}}</div>
                  <div class="col-lg-1 col-md-2 col-sm-2  col-xs-6">{{entity.cant}}</div>
                  <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">{{getdescrip(entity.status, 'status')}}</div>
                  <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">
                    <button  v-if="entity.status !== 5"  @click="info(entity)" class="btn btn-success btn-xs">Informe</button>
                    <button  v-if="entity.status !== 5 && entity.scan !== null"  @click="showimg(entity.scan)" class="btn btn-primary btn-xs"><i :class="getclass(entity.scan)"></i></button>
                    <div  v-if="entity.status == 5" class="dropdown ">
                      <button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Acciones
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu dropdown-fix" aria-labelledby="dropdownMenu1">
                        <li><a  @click="edit(entity)">Actualizar</a></li>
                        <li><a @click="info(entity)">Informe</a></li>
                        <li><a style="color:rgb(129, 42, 50)" @click="kill(entity)">Eliminar</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a  @click="closerecep(entity)">Cerrar</a></li>
                      </ul>
                    </div>
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
          <spinner :show="showspinner" :styles="stylespiner"></spinner>
         <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.codebatch" :title="title"></deletes>
      </div>
    </div>
      <div class="modal fade " id="confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-md" role="document">
              <div class="modal-content">
                  <div class="modal-header mdl_header_custom">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h5 class="modal-title" id="myModalLabel">Atención se dispone a modoficar inventario</h5>
                  </div>
                  <div class="modal-body mdl_body_custom">
                      <p>Elemento: <samp class="txtblack">{{item.batchcode}}</samp> </p>
                      <p>Revisar que todos los datos esten correctos!</p>
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
                 <h6 class="modal-title" id="">Visor información de orden: {{item.batch}}</h6>
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
           <!--MODAL DE VISUALIZCION DEL DOC -->
              <div class="modal fade"  id="view_docd" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h6 class="modal-title" >Visor información</h6>
                    </div>
                    <div class="modal-body" >
                     <div id="printframed" style="height:450px">

                     </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default btn-sm" data-dismiss="modal">Cerrar</button>
                     </div>
                    </div>
                  </div>
                </div>

     <div class="modal fade"  id="view_img" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
       <div class="modal-dialog modal-lg">
         <div class="modal-content">
           <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
             <h6 class="modal-title" >Visor información</h6>
           </div>
           <div class="modal-body" >
             <div class="row">
               <div class="col-lg-12">
                 <img :src="scan" alt="" class="img-responsive">
               </div>
             </div>
           </div>
           <div class="modal-footer">
             <button class="btn btn-default btn-sm" data-dismiss="modal">Cerrar</button>
           </div>
         </div>
       </div>
     </div>
     <div class="modal fade"  id="view_pdf" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
       <div class="modal-dialog modal-lg">
         <div class="modal-content">
           <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
             <h6 class="modal-title">Visor información</h6>
           </div>
           <div class="modal-body" >
             <div id="print" style="height:450px">
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
import {spin, urlapi, itemclear} from '../tools'
import datepicker from 'vuejs-datepicker'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import find from '@/components/find'
import deletes from '@/components/deletes'
import vselect from 'vue-select'
import supplie from '@/components/supplie'
export default {
  name: 'supplies',
  data () {
    return {
      entity: '',
      title: '',
      scan: '',
      itemkill: {},
      list: [],
      clients: [],
      typesupplies: [],
      status: [],
      stocks: [],
      format: 'dd-MM-yyyy',
      act: 'post',
      item: {},
      newview: false,
      url: '/supplies',
      philtres: {batch: ''},
      items: {
        field: 'datesupplie',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 11
      },
      totalpage: 0,
      showspinner: false,
      stylespiner: spin
    }
  },
  components: {
    datepicker, paginator, spinner, deletes, vselect, find, supplie
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getclass (it) {
      let extension = (it.substring(it.lastIndexOf('.'))).toLowerCase()
      return (extension === '.jpg' || extension === '.jpeg') ? 'fa fa-picture-o' : 'fa fa-file-pdf-o'
    },
    showimg (it) {
      if (it !== null) {
        let extension = (it.substring(it.lastIndexOf('.'))).toLowerCase()
        if (extension === '.jpg' || extension === '.jpeg') {
          this.scan = urlapi.replace('/api', '') + it
          window.$('#view_img .modal-body').height(450)
          window.$('#view_img .modal-dialog').width(450)
          window.$('#view_img').modal('show')
        }
        if (extension === '.pdf') {
          let url = urlapi.replace('/api', '') + it
          window.$('#view_pdf .modal-body').height(450)
          window.$('#view_pdf .modal-dialog').width(620)
          window.$('#print').html('<iframe src="' + url + '" height="100%" width="100%" frameborder="0"></iframe>')
          window.$('#view_pdf').modal('show')
        }
      }
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
        this.typesupplies = response.data.typesupplies
        this.stocks = response.data.stocks
        this.status = response.data.status
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    edit (enty) {
      this.item = JSON.parse(JSON.stringify(enty))
      this.item.act = 'put'
      this.newview = true
    },
    news () {
      this.clear(this.item)
      this.item.datesupplie = new Date()
      this.item.act = 'post'
      this.item.note = '-'
      this.newview = true
    },
    closes () {
      this.newview = false
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Cancelar la orden'
      window.$('#delete').modal('show')
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
    closecreatesupplie () {
      this.newview = false
      this.getlist()
    },
    closerecep (entity) {
      this.item = entity
      window.$('#confirm').modal('show')
    },
    closeconfirm () {
      this.axios.post(urlapi + this.url + '/close/' + this.item.id, {}).then(res => {
        window.$('#confirm').modal('hide')
        this.getlist()
        this.$toasted.success(res.data)
      }).catch(e => {
        this.$toasted.info(e.response.data)
      })
    },
    info (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      window.$('#printframe').html('<iframe src="' + urlapi + '/supplies/info/' + aitem.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    details () {
      window.$('#printframed').html('<iframe src="' + urlapi + '/supplies/details " height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_docd .modal-body').height(450)
      window.$('#view_docd .modal-dialog').width(620)
      window.$('#view_docd').modal('show')
    },
    clear: itemclear
  }
}
</script>

<style lang="css" scoped="">

.recep {
  background-color: rgba(120, 207, 118, 0.35);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:rgb(16, 34, 21);
}

.recep1 {
  background-color: rgba(217, 30, 81, 0.64);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:rgb(16, 34, 21);
}

.recep2 {
  background-color: rgba(100, 127, 18, 0.25);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:rgb(16, 34, 21);
}
</style>
