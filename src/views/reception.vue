<template lang="html">
  <div class="">
    <bins v-if="showbins" :batch="item" v-on:getclose="refres()"></bins>
    <binscaliber v-if="showbinscaliber" :order="item" v-on:getclosebins="refres()"></binscaliber>
    <div v-if="!newview && !showbins && !showbinscaliber">
      <p><samp class="txtblack">Frecuencia:</samp> Toda vez que se genere un orden de recepción para el proceso.<br>
      <samp class="txtblack">Procedimiento:</samp> Se debe indicar la totalidad de la información, a fin de no realizar procedimientos erróneos.<br>
      <samp class="txtblack">Acciones Correctivas:</samp> Si se detecta un error en la orden, se debe avisar al Jefe de Planta para conversar con el cliente y/o productor.<br>
      <p class="text-justify"><samp class="txtblack">AYUDA:</samp> Modulo recepcionador de frutas para posteriores procesos, utilize el boton "Nuevo lote".<br>
      <p class="leyenda text-justify"> HISTORICO DE RECEPCION DE FRUTA</p>
      <hr>
    </div>
    <!--Panel de recepcion de lotes -->
    <spinner :show="showspinner" :styles="stylespiner"></spinner>
    <div v-if="newview" class="panel panel-default">
         <div class="panel-heading pnl-heading-fix-t">
            {{title}}
         </div>
         <div class="panel-body" style="padding: 2px 10px 2px 10px">
              <div class="row">
                 <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label for="">Mat. prima</label>
                      <select :disabled="act === 'put'"  class="form-control" name="" v-model="item.rawmaterial" @change="setgross()">
                          <option v-for="mp in materiaprima" :value="mp.id" :key="mp.id"> {{mp.name}}</option>
                      </select>
                   </div>
                </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Fecha</label>
                       <datepicker  v-model="item.datebatch" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                   </div>
                 </div>
                  <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                    <div class="form-group">
                      <label for="">Lote</label>
                      <input disabled type="text" class="form-control input-sm" v-model="item.batch" placeholder="">
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-2 col-sm-3 col-xs-12">
                    <div class="form-group">
                      <label for="">Patente</label>
                      <input  type="text" class="form-control input-sm" v-model="item.patent" placeholder="">
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <div class="form-group">
                      <label for="">Chofer</label>
                      <input  type="text" class="form-control input-sm" v-model="item.driver" placeholder="">
                    </div>
                  </div>
              </div>
              <div class="row" >
                  <div class="col-lg-4 col-md-5 col-sm-7 col-xs-12">
                    <div class="form-group input-group-sm">
                      <label for="">Cliente</label>
                        <vselect label="name" :options="clients" v-model="client_select"></vselect>
                    </div>
                 </div>
                 <div class="col-lg-4 col-md-5 col-sm-7 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label for="">Productor</label>
                     <vselect label="name" :options="produc" v-model="producer_select"></vselect>
                   </div>
                 </div>
                 <div class="col-lg-4 col-md-5 col-sm-7 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label for="">Dueño</label>
                     <vselect label="name" :options="owners" v-model="owner_select"></vselect>
                   </div>
                 </div>
              </div>
              <div class="row" >
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label for="">Producto.</label>
                      <select class="form-control"  v-model="item.product_id">
                          <option v-for="ct in ciruela" :value="ct.id" :key="ct.id"> {{ct.name}}</option>
                      </select>
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Guia</label>
                     <input type="text" class="form-control input-sm" v-model="item.guide" placeholder="">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                   <div class="form-group">
                     <label for="">Cant. Bins Madera</label>
                     <input :disabled="act === 'put'" class="form-control input-sm" v-model.number="item.cantwood" placeholder="" @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label  for="">Cant. Bins Plástico</label>
                     <input :disabled="act === 'put'" type="text" class="form-control input-sm" v-model.number="item.cantplastic" placeholder=""  @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Kg Brutos</label>
                     <input :disabled="item.rawmaterial === 1 || act === 'put'" class="form-control input-sm" v-model="item.kggross" placeholder=""  @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Kg Netos</label>
                     <input disabled type="text" class="form-control input-sm" v-model="knet" placeholder="" >
                   </div>
                 </div>
               </div>
                <hr class="hrfix">
               <div class="row">
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Humedad %</label>
                     <input type="text" class="form-control input-sm" v-model.number="item.humidity" placeholder="%"  @keydown="valnumber($event)" >
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                   <div class="form-group">
                     <label for="">Hongos %</label>
                     <input type="text" class="form-control input-sm" v-model.number="item.fungus" placeholder=" %"  @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Borracha %</label>
                     <input type="text" class="form-control input-sm" v-model.number="item.drunken" placeholder="%" @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">P. Fisiolog. %</label>
                     <input type="text" class="form-control input-sm" v-model.number="item.physiological" placeholder="%" @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">P. Textura %</label>
                     <input type="text" class="form-control input-sm" v-model.number="item.texture" placeholder="%" @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Otros %</label>
                     <input type="text" class="form-control input-sm" v-model.number="item.others" placeholder="%" @keydown="valnumber($event)">
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Daño total %</label> <br>
                     <input disabled class="form-control input-sm" v-model="tdemage" placeholder="%">
                   </div>
                 </div>
                 <!-- ARREGLOS -->
                 <div class="col-lg-2 col-md2 col-sm-2 col-xs-12">
                   <div class="form-group">
                     <label for="">Calibre</label>
                     <input type="text" class="form-control input-sm" v-model.number="item.caliber"  @keydown="valnumber($event)" >
                   </div>
                 </div>
                 <div v-if="item.rawmaterial === 1">
                   <div class="col-lg-3 col-md-4 col-sm-7 col-xs-12">
                     <div class="form-group input-group-sm">
                       <label for="">Calibres</label>
                         <vselect label="name" :options="listcalibers" v-model="caliber_select"></vselect>
                     </div>
                   </div>
                   <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                     <div class="form-group input-group-sm">
                       <label for="">Tendencia</label>
                        <select class="form-control" v-model="item.demagetrend">
                            <option v-for="trend in trends" :value="trend" :key="trend.id"> {{trend.name}}</option>
                        </select>
                     </div>
                   </div>
                   <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"  style="padding:30px 0 20px 15px">
                     <div class="form-group" >
                       <label for="">Clasificación: </label>
                       <label for="">{{item.classification}}</label>
                     </div>
                   </div>
                 </div>
                 <!-- FIN DE LOS ARREGLOS -->
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label for="">Observaciones.</label>
                      <select :disabled="item.remark > 1 || (item.approved != 0)" class="form-control" name="" v-model="item.remark">
                          <option v-for="rm in remarks" :value="rm.id" :key="rm.id">{{rm.name}}</option>
                      </select>
                   </div>
                 </div>
                 <div v-if="permits(3)" class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                   <div style="padding:20px 0 20px 0">
                     <div class="mousehand" @click="setautoriz()"><i class="fa" :class="{'fa-check-square-o': item.approved, ' fa-square-o': !item.approved }"></i> Autorizo de Rechazada</div>
                   </div>
                 </div>
                 <div v-if="!permits(3) && item.approved != 0" class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                   <div style="padding-top:30px">
                       <label style="color:green">Lote Autorizado!! </label>
                     </div>
                 </div>
                 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                   <div class="form-group">
                     <label for="">Notas</label>
                     <input type="text" class="form-control input-sm" v-model="item.note" placeholder="">
                   </div>
                 </div>
                 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                   <div class="form-group">
                     <label >Buscar doc guía</label>
                     <input type="file" class="btn btn-default btn-sm" @change="getfile($event)" accept="image/*" name="file" id="file">
                   </div>
                   <div v-if="item.scan !== null" class="form-group">
                     <label >Guia: {{item.scan}}</label>
                   </div>
                 </div>
               </div>
         </div>
         <div class="panel-footer">
              <button v-if="item.rawmaterial !== 0" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
              <button class="btn btn-default btn-sm" @click="closes()"> Cerrar</button>
         </div>
       </div>
    <!--Panel de visualizacion de ordenes -->
    <div v-if="!newview && !showbins && !showbinscaliber">
      <div  class="row">
         <div class="col-lg-9 col-md-6 col-sm-6 col-xs-5">
           <button class="btn btn-success btn-fix btn-sm" @click="news()">Nuevo lote</button>
         </div>
         <div class="col-lg-3 col-md-6 col-sm-6 col-xs-7">
           <find :filters="filters" fil="batch" v-on:getfilter="getlist" placehol="buscar lote"></find>
         </div>
      </div>
      <div class="row">
         <div class="col-lg-12">
            <div class="panel panel-default pnl">
                <div class="panel-heading pnl-heading-fix-t">
                    <div class="row rowheader">
                      <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Fecha</div>
                      <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Lote</div>
                      <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">Guia </div>
                      <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">Bins </div>
                      <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">Fruta</div>
                      <div class="col-lg-1 hidden-md hidden-sm hidden-xs">Kg Net</div>
                      <div class="col-lg-1 hidden-md hidden-sm hidden-xs">Kg Bruto</div>
                      <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">Obser.</div>
                      <div class="col-lg-2 col-md-1 hidden-sm hidden-xs">Estado </div>
                      <div class="col-lg-1 col-md-2 col-sm-1 col-xs-6"> </div>
                   </div>
                </div>
              <div class="panel-body pnl-body-fix-t">
                <div class="row rowset" v-for="entity in list" :class="{recep: entity.status_batch === 2, recep1: entity.remark === 2, caliber: entity.status_batch === 6, fin: entity.status_batch === 7}" :key="entity.id">
                  <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.datefix}}</div>
                  <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{entity.batch}}</div>
                  <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">{{entity.guide}} </div>
                  <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">{{parseInt(entity.cantwood) + parseInt(entity.cantplastic)}} </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">{{getdescrip(entity.rawmaterial, 'materiaprima')}}</div>
                  <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.kgnet}}</div>
                  <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.kggross}}</div>
                  <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs">{{getdescrip(entity.remark, 'remarks')}}</div>
                  <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">{{getdescrip(entity.status_batch, 'status_batch')}} </div>
                  <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">
                    <button  v-if="entity.status_batch > 1"  @click="info(entity)" class="btn btn-success btn-xs">Informe</button>
                    <button  v-if="entity.status_batch > 1 && entity.scan !== null"  @click="showimg(entity.scan)" class="btn btn-primary btn-xs"><i :class="getclass(entity.scan)"></i></button>
                    <div  v-if="entity.status_batch === 1" class="dropdown ">
                      <button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Acciones
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu dropdown-fix" aria-labelledby="dropdownMenu1">
                        <li v-if="entity.status_batch === 1"><a  @click="edit(entity)">Actualizar</a></li>
                        <li><a  @click="bins(entity)">Bins</a></li>
                        <li><a  @click="info(entity)">Informe</a></li>
                        <li v-if="entity.status_batch === 1"><a style="color:rgb(129, 42, 50)" @click="kill(entity)">Eliminar</a></li>
                        <li v-if="entity.status_batch === 1" role="separator" class="divider"></li>
                        <li v-if="entity.status_batch === 1"><a  @click="closerecep(entity)">Cerrar</a></li>
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
         <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.batch" :title="title"></deletes>
      </div>
    </div>
    <!--MODAL DE VISUALIZCION DEL DOC -->
       <div class="modal fade"  id="view_doc" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
         <div class="modal-dialog modal-lg">
           <div class="modal-content">
             <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
               <h6 class="modal-title">Visor información de lotes {{item.batch}}</h6>
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
         <div class="modal fade " id="confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
             <div class="modal-dialog modal-md" role="document">
                 <div class="modal-content">
                     <div class="modal-header mdl_header_custom">
                         <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                         <h5 class="modal-title" id="myModalLabel">Atención se dispone a cerrar el lote</h5>
                     </div>
                     <div class="modal-body mdl_body_custom">
                         <p>Elemento: <samp class="txtblack">{{item.batch}}</samp> </p>
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
    <div class="modal fade"  id="view_img" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h6 class="modal-title" id="">Visor información</h6>
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
import { mapState } from 'vuex'
import datepicker from 'vuejs-datepicker'
import find from '@/components/find'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import deletes from '@/components/deletes'
import vselect from 'vue-select'
import bins from '@/components/bins'
import binscaliber from '@/components/binscaliber'
import {spin, urlapi, valid, itemclear} from '@/tools'
export default {
  name: 'reception',
  data () {
    return {
      file: null,
      formData: 0,
      entity: '',
      scan: null,
      trend: '',
      mp: '',
      rm: '',
      title: '',
      listcalibers: [],
      trends: [],
      caliber_select: null,
      clasifications: [],
      materiaprima: [{id: 1, name: 'Calibrada'}, {id: 2, name: 'No calibrada'}],
      itemkill: {},
      remarks: [{id: 1, name: 'Aceptada'}, {id: 2, name: 'Rechazada'}],
      list: [],
      clients: [],
      producers: [],
      ciruela: [],
      produc: [],
      owners: [],
      client_select: 0,
      producer_select: 0,
      owner_select: 0,
      status_batch: [],
      act: 'post',
      showbins: false,
      format: 'dd-MM-yyyy',
      item: {
        datebatch: new Date(),
        rawmaterial: 0,
        batch: '',
        client_id: 0,
        producer_id: 0,
        guide: '',
        product_id: 0,
        cantwood: 0,
        cantplastic: 0,
        kggross: 0,
        kgnet: 0,
        caliber: 0,
        humidity: 0,
        fungus: 0,
        drunken: 0,
        patent: '',
        driver: '',
        physiological: 0,
        texture: 0,
        others: 0,
        totaldamages: 0,
        remark: 0,
        authorization_id: 0,
        recep_id: 0,
        approved: 0,
        owner: 0,
        note: '',
        demagetrend: 0,
        classification: 0,
        caliber_id: 0,
        scan: ''
      },
      taras: [],
      newview: false,
      url: '/batchs',
      filters: {
        batch: ''
      },
      orders: {
        field: 'datebatch',
        type: 'desc'
      },
      pager: {
        page: 1,
        recordpage: 9
      },
      totalpage: 0,
      showspinner: false,
      showbinscaliber: false,
      stylespiner: spin
    }
  },
  components: {
    paginator, spinner, deletes, find, datepicker, bins, vselect, binscaliber
  },
  watch: {
    'item.totaldamages': function () {
      if (this.item.demagetrend !== undefined) {
        this.clasifications.forEach(it => {
          if (it.match === this.item.demagetrend.match && (this.item.totaldamages >= it.begins && this.item.totaldamages <= it.ends)) {
            this.item.classification = it.clasification
          }
        })
      }
    },
    'item.demagetrend': function () {
      if (this.item.demagetrend !== undefined) {
        this.clasifications.forEach(it => {
          if (it.match === this.item.demagetrend.match && (this.item.totaldamages >= it.begins && this.item.totaldamages <= it.ends)) {
            this.item.classification = it.clasification
          }
        })
      }
    },
    'caliber_select': function () {
      if (this.caliber_select != null) {
        this.item.caliber_id = this.caliber_select.id
      } else this.item.caliber_id = 0
    },
    'client_select': 'getproducer',
    'producer_select': function () {
      if (this.producer_select != null) {
        this.item.producer_id = this.producer_select.id
      } else this.item.producer_id = 0
    },
    'owner_select': function () {
      if (this.owner_select != null) {
        this.item.owner = this.owner_select.id
      } else this.item.owner = 0
    },
    'item.humidity': function () {
      this.setremark()
    },
    'item.drunken': function () {
      this.setremark()
    },
    'item.fungus': function () {
      this.setremark()
    },
    'item.texture': function () {
      this.setremark()
    },
    'item.physiological': function () {
      this.setremark()
    },
    'item.others': function () {
      this.setremark()
    },
    'item.datebatch': function () {
      if (this.showbins === false) {
        let dateb = new Date(this.item.datebatch)
        let y = String(dateb.getFullYear())
        let m = String(dateb.getMonth() + 1).length > 1 ? String(dateb.getMonth() + 1) : '0' + String(dateb.getMonth() + 1)
        let d = String(dateb.getDate()).length > 1 ? String(dateb.getDate()) : '0' + String(dateb.getDate())
        this.item.batch = this.item.batch.substring(0, this.item.batch.indexOf('-')) + '-' + y + m + d
      }
    }
  },
  mounted () {
    this.formData = new FormData()
    this.getlist()
    this.gettaras()
    this.axios.get(urlapi + '/calibrated/utils').then(response => {
      this.listcalibers = response.data.listcalibers
      this.trends = response.data.trends
      this.clasifications = response.data.clasifications
    })
  },
  computed: {
    tdemage: function () {
      let res = parseFloat(this.item.fungus) + parseFloat(this.item.drunken) + parseFloat(this.item.physiological) + parseFloat(this.item.texture) + parseFloat(this.item.others)
      // eslint-disable-next-line
      this.item.totaldamages = res
      return isNaN(res) ? '' : res
    },
    knet: function () {
      /* let dis = (this.item.typebins === 1) ? 60 : 45
      this.item.kgnet = this.item.kggross - (this.item.binscant * dis)
      let i = isNaN(this.item.kgnet) ? 0 : this.item.kgnet
      return i < 0 ? '' : this.item.kgnet */
      let grosswithoutplastic = this.item.kggross - (this.item.cantplastic * this.taras[1].weight)

      let grosswithoutwood = grosswithoutplastic - (this.item.cantwood * this.taras[0].weight)
      // eslint-disable-next-line
      this.item.kgnet = isNaN(grosswithoutwood) || grosswithoutwood < 0 ? 0 : grosswithoutwood

      return this.item.kgnet
    },
    ...mapState({
      passportStore: state => state.passportstore,
      userStore: state => state.userstore
    })
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
    getfile (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        this.file = null
      } else {
        this.file = files[0]
        let extension = (this.file.name.substring(this.file.name.lastIndexOf('.'))).toLowerCase()
        let permitidas = ['.jpg', '.pdf']
        let permit = permitidas.find(per => { return per === extension })
        if (permit === undefined) {
          this.file = null
          this.$toasted.info('No es un archivo permitido!')
        } else { this.formData.append('imgscan', this.file) }
      }
    },
    testcaliber () {
      if (this.item.caliber_id > 17) {
        return true
      } else {
        let it
        let id = this.item.caliber_id
        this.listcalibers.forEach(cl => {
          if (cl.id === id) it = cl
        })
        return parseInt(this.item.caliber) >= it.begin && parseInt(this.item.caliber) <= it.ends
      }
    },
    gettaras () {
      this.axios.get(urlapi + '/setings/gettaras').then(response => {
        this.taras = response.data.taras
      })
    },
    getproducer () {
      if (this.client_select != null) {
        this.item.client_id = this.client_select.id
        this.axios.get(urlapi + this.url + '/producers/get/' + this.item.client_id).then(response => {
          this.produc = response.data
          this.producer_select = null
          // -- get producer
          if (this.act === 'put') {
            this.produc.forEach(it => {
              if (it.id === this.item.producer_id) { this.producer_select = it }
            })
          } else {
            this.item.producer_id = 0
          }
        })
      } else {
        this.produc = []
        this.producer_select = null
        this.item.producer_id = 0
      }
    },
    setremark () {
      if (this.item.approved === 1 || this.item.approved === true) {
        this.item.remark = 1
      } else {
        this.item.remark = (this.item.humidity <= 20) && (this.item.fungus + this.item.drunken <= 3) &&
         (this.item.texture + this.item.physiological <= 8) && (this.item.others <= 15) ? 1 : 2
      }
    },
    pass () {
      if (this.item.rawmaterial === 0) {
        return true
      } else {
        if (this.item.rawmaterial === 1) {
          return true
        } else {
          if (this.item.typebins === 0) {
            return true
          } else return false
        }
      }
    },
    getlist (pFil, pOrder, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.filters = pFil }
      if (pOrder !== undefined) { this.orders = pOrder }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener ordenes
        method: 'get',
        url: urlapi + this.url,
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.filters, orders: this.orders}
      }).then(response => {
        this.list = response.data.list
        this.clients = response.data.clients
        this.producers = response.data.producers
        this.ciruela = response.data.products
        this.status_batch = response.data.status_batch
        this.owners = this.clients.concat(this.producers)
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        if (e.response !== undefined) {
          this.$toasted.error(e.response.data)
        }
        this.showspinner = false
      })
    },
    news () {
      this.clear(this.item)
      this.title = 'Nuevo lote'
      this.act = 'post'
      this.client_select = null
      this.producer_select = null
      this.owner_select = null
      this.caliber_select = null
      this.newview = true
      this.axios.get(urlapi + this.url + '/surrogates').then(res => {
        this.item.batch = res.data
      })
      this.item.datebatch = new Date()
      this.item.recep_id = this.userStore.user.id
      window.$('#batch').focus()
    },
    exec () { // guardar la recpcion
      this.showspinner = true
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: this.item
      }).then(response => {
        this.$toasted.success(response.data.msj)
        this.getlist()
        this.formData.append('folio', this.item.batch)
        this.formData.append('act', this.act)
        if (this.act === 'post') {
          this.formData.append('id', response.data.id)
        } else {
          this.formData.append('id', this.item.id)
        }
        if (this.file !== null) {
          this.axios.post(urlapi + this.url + '/savefile', this.formData).catch(err => {
            this.$toasted.info(err.response.data)
          })
        }
        this.newview = false
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    save () {
      if (this.item.rawmaterial === 2 && this.item.kggross === 0) {
        this.$toasted.error('Faltan cantidad de kilogramos brutos!')
      } else {
        if ((this.item.client_id !== null) && (this.item.producer_id !== 0) && this.item.bach !== '' &&
         this.item.guide !== '' && this.item.remark !== 0 && this.item.rawmaterial !== 0 && this.item.cantwood !== '-' && this.item.cantwood !== '' &&
         this.item.cantplastic !== '-' && this.item.cantplastic !== '' && this.item.product_id !== 0) {
          if (parseInt(this.item.cantwood) === 0 && parseInt(this.item.cantplastic) === 0) {
            this.$toasted.error('Faltan cantidad de bins!')
          } else {
            if (this.item.approved === '-') { this.item.approved = 0 }
            if (this.item.authorization_id === '-') { this.item.authorization_id = 0 }
            if (this.item.authorization_id === 0) {
              if (this.item.rawmaterial === 1 && !this.testcaliber()) { this.$toasted.info('Los calibres no coinciden!') } else { this.exec() }
            } else {
              if (this.item.note !== '-' && this.item.note !== '') {
                if (this.item.rawmaterial === 1 && !this.testcaliber()) { this.$toasted.info('Los calibres no coinciden!') } else { this.exec() }
              } else {
                this.$toasted.error('Los comentarios en la nota son obligatorios!')
              }
            }
          }
        } else {
          this.$toasted.error('Existen datos erroneos o incompletos!')
        }
      }
    },
    edit (enty) {
      this.title = 'Actualizando lote.'
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      // get client -------
      this.clients.forEach(it => {
        if (it.id === this.item.client_id) { this.client_select = it }
      })
      this.owners.forEach(it => {
        if (it.id === this.item.owner) { this.owner_select = it }
      })
      this.listcalibers.forEach(it => {
        if (it.id === this.item.caliber_id) { this.caliber_select = it }
      })
      // get tendencia
      this.trends.forEach(it => {
        if (it.id === this.item.demagetrend_id) { this.item.demagetrend = it }
      })
      // ------
      this.item.datebatch = new Date(this.item.datebatch.replace(/-/g, '/'))
      this.axios.get(urlapi + this.url + '/producers/get/' + this.item.client_id).then(response => {
        this.produc = response.data
        this.newview = true
        window.$('#batch').focus()
      })
    },
    closes () {
      this.newview = false
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar el lote.'
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
    info (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      window.$('#printframe').html('<iframe src="' + urlapi + '/batchs/info/' + aitem.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    bins (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      if (this.item.rawmaterial === 2) { this.showbins = true } else {
        this.item.caliberexter = true
        this.showbinscaliber = true
      }
    },
    refres () {
      this.showbins = false
      this.showbinscaliber = false
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
      })
    },
    setgross () {
      if (this.item.rawmaterial === 1) {
        this.item.kggross = 0
      }
    },
    setautoriz () {
      this.item.approved = !this.item.approved
      if (this.item.approved) {
        this.item.remark = 1
        this.item.authorization_id = this.userStore.user.id
      } else {
        this.item.authorization_id = 0
        this.setremark()
      }
    },
    permits (per) {
      return window._.indexOf(this.passportStore.passport.permits, per) > -1
    },
    valnumber: valid,
    clear: itemclear
  }
}
</script>

<style lang="css">

.recep {
  background-color: rgba(120, 207, 118, 0.35);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:rgb(16, 34, 21);
}

.recep1 {
  background-color: rgba(207, 192, 118, 0.35);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:black;
}

.caliber {
  background-color: rgba(118, 207, 201, 0.35);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:black;
}

.fin {
  background-color: rgba(44, 60, 208, 0.2);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:black;
}

.hrfix {
  margin: 2px 0 5px 0
}

</style>
