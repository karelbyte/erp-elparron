<template lang="html">
 <div class="" style="margin-bottom:10px">
   <p class="text-justify"><samp class="txtblack">AYUDA:</samp>Modulo de actualizar bins de la orden de lavado.<br>
   <p class="leyenda text-justify">BINS DE LA ORDEN:  <b style="color:black">{{order.folio}}</b></p>
   <hr>
   <!--Panel de usuarios y sus permisos -->
      <div v-if="newview" class="panel panel-default">
        <div class="panel-heading pnl-heading-fix-t">
           {{title}}
        </div>
        <div class="panel-body">
              <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                  <div class="form-group">
                    <label for=""> Fecha</label>
                      <datepicker v-model="item.datebins" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Productor</label>
                     <select class="form-control" name="" v-model="item.producer_id" @change="gettally()">
                         <option v-for="prod in producers" :key="prod.id" :value="prod.id"> {{prod.name}}</option>
                     </select>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Propietario</label>
                     <select class="form-control" name="" v-model="item.owner">
                         <option v-for="propi in owners" :key="propi.id" :value="propi.id"> {{propi.name}}</option>
                     </select>
                  </div>
                </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Tarja</label>
                     <input disabled type="text" class="form-control input-sm" v-model="item.tally" placeholder="">
                   </div>
                 </div>
                 <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group input-group-sm">
                     <label for="">Tipo</label>
                      <select class="form-control" name="" v-model="item.type_id">
                          <option v-for="ty in typebins" :key="ty.id" :value="ty.id"> {{ty.name}}</option>
                      </select>
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Kg Brutos</label>
                     <input type="text" class="form-control input-sm" v-model="kggross" placeholder="" @keydown="valnumber($event)">
                   </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                  <div class="form-group">
                    <label for="">Kg Netos</label>
                    <input disabled type="text" class="form-control input-sm" v-model="knet" placeholder="">
                  </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div class="form-group input-group-sm">
                  <label for="">Calibres</label>
                   <select class="form-control" v-model="item.caliber_id">
                       <option v-for="calib in listcalibers" :key="calib.id" :value="calib.id"> {{calib.name}}</option>
                   </select>
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">Calibre promedio</label>
                  <input class="form-control input-sm" v-model="item.caliberaverage" placeholder="" @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">% Daño</label>
                  <input class="form-control input-sm" v-model="item.averagedemage" placeholder="" @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div class="form-group input-group-sm">
                  <label for="">Tendencia</label>
                   <select class="form-control" v-model="item.demagetrend_id">
                       <option v-for="trend in trends" :key="trend.id" :value="trend.id"> {{trend.name}}</option>
                   </select>
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">Clasificación</label>
                  <label for="">{{item.classification}}</label>
                </div>
              </div>
            </div>
        </div>
        <div class="panel-footer">
             <button class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
             <button class="btn btn-default btn-sm" @click="closes()"> Cerrar</button>
        </div>
      </div>
  <div v-if="!newview">
   <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-3 col-xs-5">
       <!--  <button class="btn btn-success btn-fix btn-sm" @click="news()">Nuevo Bins</button> -->
         <div class="form-group">
           <label for="">{{descrip}}</label>
           <div class="input-group">
           <datepicker v-model="datebins" input-class="form-control input-sm" language="es" :format="format"></datepicker>
            <div class="input-group-btn">
              <button class="btn btn-danger btn-sm" @click="all()">Todos</button>
              <button class="btn btn-info btn-sm" @click="aplic()">Aplicar</button>
            </div>
          </div>
         </div>
           <button class="btn btn-success btn-sm" @click="getsave()">Guardar</button>
        </div>
        <div class="col-lg-5 col-md-4 col-sm-5 col-xs-1"></div>
        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-7">
          <div class="form-group">
            <label style="color: transparent " for=""> Fecha Calibrado</label>
              <find :filters="filters" fil="tally" v-on:getfilter="getlist" placehol="buscar bins"></find>
          </div>
        </div>
     </div>
     <div class="row">
        <div class="col-lg-12">
           <div class="panel panel-default pnl">
               <div class="panel-heading pnl-heading-fix-t">
                   <div class="row rowheader">
                     <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Fecha</div>
                     <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">Tarja </div>
                     <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">Neto</div>
                     <div class="col-lg-2 col-md-2  hidden-sm hidden-xs">Productor</div>
                     <div  class="col-lg-1 col-md-2 col-sm-3 col-xs-6">Acciones </div>
                  </div>
               </div>
             <div class="panel-body pnl-body-fix-t">
               <div class="row rowset" v-for="entity in list" :key="entity.id" v-bind:class="{'chek': !findcheck(entity)}">
                 <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.datefix}}</div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">{{entity.tally}} </div>
                 <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">{{entity.kgnet}} </div>
                 <div class="col-lg-2 col-md-2  hidden-sm hidden-xs">{{getdescrip(entity.producer_id, 'producers')}} </div>
                 <div class="col-lg-1 col-md-2 col-sm-3 col-xs-6">
                    <!--<button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button> -->
                    <button :disabled="!findcheck(entity)" class="btn btn-success btn-xs" @click="add(entity)"><i class="fa fa-plus"></i></button>
                    <button  :disabled="findcheck(entity)" class="btn btn-danger btn-xs" @click="deletes(entity)"><i class="fa fa-eraser"></i></button>
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
     </div>
   <spinner :show="showspinner" :styles="stylespiner"></spinner>
   <button type="button" class="btn btn-default btn-sm" @click="close()"><i class="fa fa-arrow-left"></i> Regresar</button>
 </div>
  <div class="modal fade " id="confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
     <div class="modal-dialog modal-md" role="document">
         <div class="modal-content">
             <div class="modal-header mdl_header_custom">
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                 <h5 class="modal-title" id="myModalLabel">Atención se esta modificando historico.</h5>
             </div>
             <div class="modal-body mdl_body_custom">
                 <p>Revisar que todo este correcto!</p>
                 <p>Cuidado! Esta acción es irreversible. Desea proceder?</p>
             </div>
             <div class="modal-footer mdl_footer_custom">
                 <button @click="save()" class="btn btn-danger btn-sm">SI</button>
                 <a href="#" data-dismiss="modal" class="btn btn-default  btn-sm">No</a>
             </div>
         </div>
    </div>
 </div>
 </div>
</template>

<script>
import datepicker from 'vuejs-datepicker'
import find from '@/components/find'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import {spin, urlapi, valid} from '@/tools'
export default {
  name: 'updatebinsshower',
  props: ['order'],
  data () {
    return {
      entity: '',
      trend: '',
      prod: '',
      propi: '',
      ty: '',
      calib: '',
      list: [],
      selected: [],
      owners: [],
      producers: [],
      typebins: [{id: 1, name: 'Madera'}, {id: 2, name: 'Plastico'}],
      url: '/showers',
      title: '',
      act: 'post',
      datebins: new Date(),
      item: this.order,
      format: 'dd/MM/yyyy',
      newview: false,
      filters: {
        order: this.order.id,
        tally: ''
      },
      orders: {
        field: 'tally',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 8
      },
      totalpage: 0,
      showspinner: false,
      stylespiner: spin,
      descrip: this.order.sendto === 2 ? 'Fecha Condición Natural' : 'Fecha Lavado'
    }
  },
  components: {
    paginator, spinner, find, datepicker
  },
  mounted () {
    this.getproducers()
    this.getlist()
  },
  methods: {
    getsave () {
      if (this.selected.length > 0) {
        window.$('#confirm').modal('show')
      } else {
        this.$toasted.error('No existen bins selecionados!')
      }
    },
    aplic () {
      this.selected.forEach(itm => {
        let aux = new Date(this.datebins)
        let midate = aux.getDate() + '/' + (aux.getMonth() + 1) + '/' + aux.getFullYear()
        itm.daterecep = new Date(this.datebins)
        itm.datefix = midate
      })
    },
    all () {
      this.selected = this.selected.concat(this.list)
    },
    deletes (itm) {
      this.selected = window._.remove(this.selected, function (n) {
        return n.id !== itm.id
      })
    },
    add (itm) {
      if (window._.indexOf(this.selected, itm) === -1 && !this.pass(itm)) {
        this.selected.push(itm)
      } else {
        this.$toasted.info('Ya esta añadido')
      }
    },
    findcheck (itm) {
      return window._.indexOf(this.selected, itm) === -1 && !this.pass(itm)
    },
    pass (it) {
      let exis = false
      this.selected.forEach(itm => {
        if (itm.id === it.id) {
          it.daterecep = itm.daterecep
          it.datefix = itm.datefix
          exis = true
        }
      })
      return exis
    },
    getproducers () {
      this.axios.get(urlapi + '/showers/producers/' + this.order.id).then(response => {
        this.producers = response.data.producers
      })
    },
    valnumber: valid,
    save () {
      if (this.selected.length > 0) {
        this.showspinner = true
        this.axios({ // guardar orden
          method: this.act,
          url: urlapi + '/showers/dropbins',
          data: { data: this.selected, order: {id: this.order.id, folio: this.order.folio, sendto: this.order.sendto} }
        }).then(response => {
          this.$toasted.success(response.data)
          this.getlist()
          window.$('#confirm').modal('hide')
          this.newview = false
          this.showspinner = false
        }).catch(e => {
          this.$toasted.error(e.response.data)
          this.showspinner = false
        })
      } else {
        this.$toasted.info('No existen bins selecionados!')
      }
    },
    getlist (pFil, pOrder, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.filters = pFil }
      if (pOrder !== undefined) { this.orders = pOrder }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener bins
        method: 'get',
        url: urlapi + this.url + '/indexbinsorden',
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.filters, orders: this.orders}
      }).then(response => {
        this.list = response.data.list
        this.clients = response.data.clients
        this.owners = response.data.owner
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    edit (enty) {
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.item.datebins = new Date(this.item.datebins.replace(/-/g, '/'))
      this.title = 'Actualizando bins calibrado'
      let dis = (this.item.type_id === 1) ? 60 : 45
      if (this.item.kgnet > 0) this.kggross = this.item.kgnet + dis
      this.newview = true
    },
    close () {
      this.$emit('getclosebins')
    },
    closes () {
      this.newview = false
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
    }
  }
}
</script>

<style lang="css" scoped>

.chek {
 background-color: rgba(103, 58, 11, 0.29) !important;
}
</style>
