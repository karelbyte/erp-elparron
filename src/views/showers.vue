<template lang="html">
  <div class="">
    <div v-if="!newview && !viewupdate">
      <p><samp class="txtblack">Frecuencia:</samp> Toda vez que se genere una orden de seleción para el proceso.<br>
      <samp class="txtblack">Procedimiento:</samp> Se debe indicar la totalidad de la información, a fin de no realizar procedimientos erróneos.<br>
      <samp class="txtblack">Acciones Correctivas:</samp> Si se detecta un error en la orden, se debe avisar al Jefe de Planta.<br>
      </p>  <hr>
      <p class="leyenda"> HISTORICO DE ORDENES DE SELECION DE FRUTA</p>
      <hr>
   </div>

    <updatebinsshower v-if="viewupdate" :order="item" v-on:getclosebins="refresupdate()"></updatebinsshower>
    <!--Panel de creacion de ordenes -->
    <showerbins v-if="newview" v-on:getcloseshower="closes()" :shower="item"></showerbins>

    <!--Panel de visualizacion de ordenes -->
    <div v-if="!newview && !viewupdate">
      <div  class="row">
         <div class="col-lg-9 col-md-6 col-sm-6 col-xs-6 ">
           <button class="btn btn-success btn-fix btn-sm" @click="news()" > Nueva</button>
         </div>
         <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">

             <div class="input-group">
              <input type="text" class="form-control input-sm" id="" placeholder="buscar una orden">
              <div class="input-group-btn">
                <button class="btn btn-default btn-sm"><i class="fa fa-search"></i></button>
              </div>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col-lg-12">
            <div class="panel panel-default pnl">
                <div class="panel-heading pnl-heading-fix-t">
                    <div class="row rowheader">
                      <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs" style="margin-right:10px">Fecha </div>
                      <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Folio </div>
                      <div class="col-lg-2 hidden-md  col-sm-2 hidden-xs">Cliente </div>
                      <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">Madera </div>
                      <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">Plastico</div>
                      <div class="col-lg-1 hidden-md hidden-sm hidden-xs">Kg </div>
                      <div class="col-lg-2 col-md-2 hidden-sm hidden-xs">Proceso </div>
                      <div class="col-lg-1 col-md-2 hidden-sm hidden-xs">Estado </div>
                      <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">Acciones </div>
                   </div>
                </div>
              <div class="panel-body pnl-body-fix-t">
                <div class="row rowset" v-for="entity in list" :key="entity.id" :class="{closes: entity.status_id === 2}">
                  <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs" style="margin-right:10px">{{entity.datefix}}</div>
                  <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.folio}} </div>
                  <div class="col-lg-2 hidden-md  col-sm-2 hidden-xs">{{getdescrip(entity.client_id, 'clients')}}</div>
                  <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">{{entity.cantwood}}</div>
                  <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">{{entity.cantplastic}}</div>
                  <div class="col-lg-1 hidden-md  hidden-sm hidden-xs">{{entity.totalkgnet}}</div>
                  <div class="col-lg-2 col-md-2  hidden-sm hidden-xs" >{{getdescrip(entity.sendto,'proces')}}</div>
                  <div class="col-lg-1 col-md-2  hidden-sm hidden-xs">{{getdescrip(entity.status_id, 'status')}}</div>
                  <div v-if="entity.status_id === 1" class="col-lg-1 col-md-1 col-sm-2 col-xs-6">
                    <div class="dropdown ">
                      <button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Acciones
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu dropdown-fix" aria-labelledby="dropdownMenu1">
                        <!--<li  v-if="entity.status_id === 1"><a @click="edit(entity)">Actualizar</a></li> -->
                        <li><a @click="operator(entity)">Operario</a></li>
                        <li v-if="entity.status_id === 1 && entity.sendto !== 10"><a @click="binsrecep(entity)">Baja Bins</a></li>
                        <!--<li v-if="entity.status_id === 1"><a @click="bins(entity)">Lavados</a></li> -->
                        <!--<li><a @click="info(entity)">Informe</a></li> -->
                        <li v-if="entity.status_id === 1" role="separator" class="divider"></li>
                        <li v-if="entity.status_id === 1"><a style="color:rgb(129, 42, 50)" @click="kill(entity)">Eliminar</a></li>
                        <li v-if="entity.status_id === 1" role="separator" class="divider"></li>
                        <li v-if="entity.status_id === 1"><a  @click="closeshower(entity)">Cerrar</a></li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="entity.status_id === 2" class="col-lg-1 col-md-1 col-sm-2 col-xs-6"><button class="btn btn-success btn-xs" @click="info(entity)">Informe</button></div>
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

      <div class="modal fade " id="confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-md" role="document">
              <div class="modal-content">
                  <div class="modal-header mdl_header_custom">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h5 class="modal-title" id="myModalLabel">Atención se dispone a cerrar la orden de lavado</h5>
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

      <div class="modal fade"  id="view_doc" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h6 class="modal-title" id="">Visor información de lotes {{item.batch}}</h6>
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
import {urlapi} from '../tools'
import datepicker from 'vuejs-datepicker'
import paginator from '@/components/paginator'
import easpinner from '@/components/spinner'
import showerbins from '@/components/showerbins'
import deletes from '@/components/deletes'
import updatebinsshower from '@/components/updatebinsshower'
import {spin} from '@/tools'
export default {
  name: 'showers',
  data () {
    return {
      entity: '',
      status: [{id: 1, name: 'Procesando'}, {id: 2, name: 'Cerrado'}],
      proces: [{id: 5, name: 'Lavado'}, {id: 2, name: 'Condición Natural'}],
      title: '',
      itemkill: {},
      list: [],
      listcalibers: [],
      clients: [],
      clasifications: [],
      act: 'post',
      format: 'dd-MM-yyyy',
      item: {},
      newview: false,
      viewupdate: false,
      url: '/showers',
      philtres: {folio: ''},
      items: {
        field: 'dateshower',
        type: 'asc'
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
    datepicker, paginator, easpinner, deletes, showerbins, updatebinsshower
  },
  mounted () {
    this.getlist()
  },
  methods: {
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
        this.listcalibers = response.data.listcalibers
        this.clasifications = response.data.clasifications
        this.proces = response.data.status
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    news () {
      this.newview = true
    },
    edit (enty) {
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.newview = true
    },
    closes () {
      this.newview = false
      this.getlist()
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
    operator (item) {
      window.$('#printframe').html('<iframe src="' + urlapi + '/showers/operator/' + item.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    refresupdate () {
      this.viewupdate = false
      this.getlist()
    },
    binsrecep (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      this.viewupdate = true
    },
    info (aitem) {
      this.item = JSON.parse(JSON.stringify(aitem))
      window.$('#printframe').html('<iframe src="' + urlapi + '/showers/info/' + aitem.id + '"height="100%" width="100%" frameborder="0"></iframe>')
      window.$('#view_doc .modal-body').height(450)
      window.$('#view_doc .modal-dialog').width(620)
      window.$('#view_doc').modal('show')
    },
    closeshower (entity) {
      this.item = entity
      /* this.axios.get(urlapi + this.url + '/trueclose/' + this.item.id).then(res => {
        if (res.data[0].cant > 0) {
          this.$toasted.info('Existen bins sin dar de baja!')
        } else {

        }
      }) */
      window.$('#confirm').modal('show')
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
