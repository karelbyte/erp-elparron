<template lang="html">
 <div class="" style="margin-bottom:10px">
   <p v-if="!order.caliberexter" class="leyenda text-justify"> BINS DE LA ORDEN:  <b style="color:black">{{order.folio}}</b></p>
   <p v-else class="leyenda text-justify"> BINS DEL LOTE:  <b style="color:black">{{order.batch}}</b></p>
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
                    <label for=""> Fecha Calibrado</label>
                      <datepicker v-model="item.datebins" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-5 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Productor</label>
                     <select class="form-control" name="" v-model="item.producer_id" @change="gettally()">
                         <option v-for="prod in producers" :key="prod.id" :value="prod.id"> {{prod.name}}</option>
                     </select>
                  </div>
                </div>
                <div class="col-lg-4 col-md-5 col-sm-7 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Propietario</label>
                    <vselect label="name" :options="owners" v-model="owner_select"></vselect>
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
                     <div v-if="!this.filters.caliberexter" class="form-group form-inline" style="margin-bottom:0">
                        <label style="margin: 0 15% 0 0">Tipo</label>
                        <label  :class="{'danger': stock <= 0 }">Existencias:{{stock}}</label>
                     </div>
                     <label v-if="this.filters.caliberexter">Tipo</label>
                      <select class="form-control" name="" v-model="item.type_id" @change="findcant()">
                          <option v-for="ty in typebins" :key="ty.id" :value="ty.id"> {{ty.name}}</option>
                      </select>
                   </div>
                 </div>
                 <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Marca</label>
                     <input type="text" class="form-control input-sm" v-model="item.binsmark" placeholder="">
                   </div>
               </div>
               <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                 <div class="form-group input-group-sm">
                   <label for="">Estado</label>
                    <select class="form-control" name="" v-model="item.status">
                        <option v-for="st in status" :value="st.id" :key="st.id"> {{st.name}}</option>
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

                <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                  <div class="form-group">
                    <label for="">N de Caída</label>
                    <input  type="text" class="form-control input-sm" v-model="item.nfall" >
                  </div>
                </div>

              <div class="col-lg-4 col-md-4 col-sm-7 col-xs-12">
                <div class="form-group input-group-sm">
                  <label for="">Calibres</label>
                    <vselect label="name" :options="listcalibers" v-model="caliber_select"></vselect>
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">Calibre promedio</label>
                  <input class="form-control input-sm" v-model="item.caliberaverage" placeholder="">
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">% Daño</label>
                  <input class="form-control input-sm" v-model="item.averagedemage" placeholder="" @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group input-group-sm">
                  <label for="">Tendencia</label>
                   <select class="form-control" v-model="item.demagetrend">
                       <option v-for="trend in trends" :key="trend.id" :value="trend"> {{trend.name}}</option>
                   </select>
                </div>
              </div>

              <div class="col-lg-1 col-md-2 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label for="">Clasificación</label>
                  <label class="form-control input-sm">{{item.classification}}</label>
                </div>
              </div>
              <div v-if="this.filters.caliberexter" class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div style="padding-top:20px">
                  <div class="mousehand" @click="setautoriz()"><i class="fa" :class="{'fa-check-square-o': item.outcast, ' fa-square-o': !item.outcast }"></i> Fuera de especición</div>
                </div>
              </div>
            </div>
            <hr v-if="item.outcast">
            <div v-if="item.outcast" class="row">
              <div class="col-lg-2 col-md2 col-sm-2 col-xs-12">
                <div class="form-group">
                  <label for="">Calibre</label>
                  <input type="text" class="form-control input-sm" v-model="det.caliber" placeholder="" >
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">Humedad %</label>
                  <input type="text" class="form-control input-sm" v-model.number="det.humidity" placeholder="%"  @keydown="valnumber($event)" >
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                <div class="form-group">
                  <label for="">Hongos %</label>
                  <input type="text" class="form-control input-sm" v-model.number="det.fungus" placeholder=" %"  @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">Borracha %</label>
                  <input type="text" class="form-control input-sm" v-model.number="det.drunken" placeholder="%" @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">P. Fisiolog. %</label>
                  <input type="text" class="form-control input-sm" v-model.number="det.physiological" placeholder="%" @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">P. Textura %</label>
                  <input type="text" class="form-control input-sm" v-model.number="det.texture" placeholder="%" @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label for="">Otros %</label>
                  <input type="text" class="form-control input-sm" v-model.number="det.others" placeholder="%" @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12" style="padding-top:20px">
                  <label for="">Daño total: {{tdemage}} % </label>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label for="">Notas</label>
                  <input type="text" class="form-control input-sm" v-model="det.note" placeholder="">
                </div>
              </div>
            </div>
        </div>

        <div class="panel-footer">
             <button v-if="stock > 0" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
             <button v-if="order.caliberexter"  class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
             <button class="btn btn-default btn-sm" @click="closes()"> Cerrar</button>
        </div>
      </div>

  <div v-if="!newview">
   <div class="row">
        <div class="col-lg-9 col-md-6 col-sm-6 col-xs-5">
        <button v-if="!order.caliberexter" class="btn btn-success btn-fix btn-sm" @click="news()">Nuevo Bins</button>
        <div v-if="order.caliberexter" class="form-group form-inline">
          <label for="">KG NETOS </label>
          <input class="form-control input-sm" placeholder="se aplica a todos" v-model="kggrossset">
          <button class="btn btn-warning btn-sm" @click="kggrossaplic()">Aplicar</button>
        </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-7">
          <find :filters="filters" fil="tally" v-on:getfilter="getlist" placehol="buscar bins"></find>
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
                     <div class="col-lg-1 col-md-1  hidden-sm hidden-xs">Tipo</div>
                     <div class="col-lg-1 col-md-1  hidden-sm hidden-xs">Calibre</div>
                     <div class="col-lg-2 col-md-1  hidden-sm hidden-xs">Tendencia</div>
                      <div class="col-lg-2 col-md-1  hidden-sm hidden-xs">Productor</div>
                     <div  class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Acciones </div>
                  </div>
               </div>
             <div class="panel-body pnl-body-fix-t">
               <div class="row rowset" v-for="entity in list" :key="entity.id">
                 <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.datefix}}</div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">{{entity.tally}} </div>
                 <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">{{entity.kgnet}} </div>
                 <div class="col-lg-1 col-md-1  hidden-sm hidden-xs">{{getdescrip(entity.type_id, 'typebins')}} </div>
                 <div class="col-lg-1 col-md-1  hidden-sm hidden-xs">{{entity.caliberaverage}}</div>
                 <div class="col-lg-2 col-md-1  hidden-sm hidden-xs">{{getdescrip(entity.demagetrend_id, 'trends')}} </div>
                 <div class="col-lg-2 col-md-1  hidden-sm hidden-xs">{{getdescrip(entity.producer_id, 'producers')}} </div>
                 <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                   <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                   <button v-if="filters.caliberexter === false" class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button>
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
         <deletes :urlkill="urlkill" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.tally" :title="title"></deletes>
     </div>
   <spinner :show="showspinner" :styles="stylespiner"></spinner>
   <button type="button" class="btn btn-default btn-sm" @click="close()"><i class="fa fa-arrow-left"></i> Regresar</button>
 </div>
 </div>
</template>

<script>
import datepicker from 'vuejs-datepicker'
import find from '@/components/find'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import deletes from '@/components/deletes'
import vselect from 'vue-select'
import {spin, urlapi, valid, dateconvert, itemclear} from '@/tools'
export default {
  name: 'binscaliber',
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
      listcalibers: [],
      trends: [],
      owners: [],
      producers: [],
      typebins: [{id: 1, name: 'Madera'}, {id: 2, name: 'Plastico'}],
      status: [{id: 1, name: 'Bueno'}, {id: 2, name: 'Regular'}, {id: 3, name: 'Malo'}],
      url: '/calibrated',
      urlkill: '/calibrated/delete/bins',
      itemkill: {},
      title: '',
      act: 'post',
      owner_select: null,
      caliber_select: null,
      clasifications: [],
      item: {
        datebins: (new Date()).toISOString(),
        order_calibrated_id: this.order.id,
        client_id: this.order.client_id,
        producer_id: 0,
        owner: 0,
        tally: 0,
        caliber_id: 0,
        binsmark: '-',
        caliberaverage: 0,
        type_id: 0,
        status: 0,
        kgnet: 0,
        averagedemage: 0,
        demagetrend: 0,
        classification: '',
        nfall: 0,
        outcast: false
      },
      det: {
        caliber: 0,
        humidity: 0,
        fungus: 0,
        drunken: 0,
        physiological: 0,
        texture: 0,
        others: 0,
        totaldamages: 0,
        note: '-'
      },
      format: 'dd-MM-yyyy',
      kggross: 0,
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
        recordpage: 10
      },
      totalpage: 0,
      showspinner: false,
      stylespiner: spin,
      taras: [],
      emptys: [],
      stock: 0,
      kggrossset: 0
    }
  },
  components: {
    paginator, spinner, deletes, find, datepicker, vselect
  },
  computed: {
    knet: function () {
      let dis = (this.item.type_id === 1) ? this.taras[0].weight : this.taras[1].weight
      // eslint-disable-next-line
      this.item.kgnet = this.kggross - dis
      let i = isNaN(this.item.kgnet) ? 0 : this.item.kgnet
      return i < 0 ? '' : this.item.kgnet
    },
    tdemage: function () {
      let res = parseFloat(this.det.fungus) + parseFloat(this.det.drunken) + parseFloat(this.det.physiological) + parseFloat(this.det.texture) + parseFloat(this.det.others)
      // eslint-disable-next-line
      this.det.totaldamages = res
      return isNaN(res) ? '' : res
    }
  },
  created () {
    if (this.order.caliberexter !== undefined) { this.filters.caliberexter = true } else { this.filters.caliberexter = false }
  },
  mounted () {
    this.getproducers()
    this.getutils()
    this.getlist()
    this.gettaras()
  },
  watch: {
    'item.averagedemage': function () {
      this.clasifications.forEach(it => {
        if (it.match === this.item.demagetrend.match && (this.item.averagedemage >= it.begins && this.item.averagedemage <= it.ends)) {
          this.item.classification = it.clasification
        }
      })
    },
    'item.demagetrend': function () {
      this.clasifications.forEach(it => {
        if (it.match === this.item.demagetrend.match && (this.item.averagedemage >= it.begins && this.item.averagedemage <= it.ends)) {
          this.item.classification = it.clasification
        }
      })
    },
    'owner_select': function () {
      if (this.owner_select != null) {
        this.item.owner = this.owner_select.id
        this.stock = 0
        if (this.act === 'post') { this.item.type_id = 0 }
        this.getbins()
      } else this.item.owner = 0
    },
    'caliber_select': function () {
      if (this.caliber_select != null) {
        this.item.caliber_id = this.caliber_select.id
      } else this.item.caliber_id = 0
    }
  },
  methods: {
    kggrossaplic () {
      this.axios.get(urlapi + '/calibrated/setkg/' + this.order.id + '/' + this.kggrossset).then(res => {
        this.$toasted.success(res.data)
        this.getlist()
      })
    },
    setautoriz () {
      this.item.outcast = !this.item.outcast
      if (this.item.outcast) {
        this.axios.get(urlapi + '/bins/details/' + this.item.id).then(response => {
          if (response.data === 0) {
            this.det.caliber = this.order.caliber
            this.det.humidity = this.order.humidity
            this.det.fungus = this.order.fungus
            this.det.drunken = this.order.drunken
            this.det.physiological = this.order.physiological
            this.det.texture = this.order.texture
            this.det.others = this.order.others
            this.det.totaldamages = this.order.totaldamages
            this.det.note = '-'
          } else this.det = response.data
        })
      }
    },
    findcant () {
      if (this.emptys.length > 0) {
        let found = this.emptys.find(it => { return it.type_id === this.item.type_id })
        this.stock = (found === undefined) ? 0 : found.cant
      } else { this.stock = 0 }
    },
    getbins () {
      if (!this.filters.caliberexter) {
        this.axios.get(urlapi + '/calibrated/getbinsemptys/' + this.item.owner).then(response => {
          this.emptys = response.data
          if (this.act === 'put') { this.findcant() }
        })
      }
    },
    gettaras () {
      this.axios.get(urlapi + '/setings/gettaras').then(response => {
        this.taras = response.data.taras
      })
    },
    testcaliber () {
      if (this.item.caliber_id > 17) {
        return true
      } else {
        if (this.item.caliber_id !== 0) {
          let it
          let id = this.item.caliber_id
          this.listcalibers.forEach(cl => {
            if (cl.id === id) it = cl
          })
          return parseInt(this.item.caliberaverage) >= it.begin && parseInt(this.item.caliberaverage) <= it.ends
        } else return false
      }
    },
    gettally () {
      this.axios.get(urlapi + '/calibrated/tally/' + this.order.client_id + '/' + this.item.producer_id).then(response => {
        this.item.tally = response.data + dateconvert(this.item.datebins, 'y')
      })
    },
    getproducers () {
      this.axios.get(urlapi + '/calibrated/producers/' + this.order.id + '/' + this.filters.caliberexter).then(response => {
        this.producers = response.data
      })
    },
    getutils () {
      this.axios.get(urlapi + '/calibrated/utils').then(response => {
        this.listcalibers = response.data.listcalibers
        this.trends = response.data.trends
        this.clasifications = response.data.clasifications
      })
    },
    valnumber: valid,
    save () {
      let dat = {}
      if (this.item.outcast) {
        dat = {
          item: this.item,
          det: this.det
        }
      } else {
        dat = this.item
      }
      this.item.ex = this.filters.caliberexter
      if (!this.testcaliber()) { this.$toasted.info('Los calibres no coinciden!') } else {
        if ((this.item.datebins !== '') && (this.item.kgnet !== 0) && (this.item.tally !== 0) && this.item.demagetrend !== {} && this.item.averagedemage !== '-' && this.item.demagetrend !== '') {
          this.showspinner = true
          this.axios({ // guardar orden
            method: this.act,
            url: urlapi + '/calibrated/store/bins' + (this.act === 'post' ? '' : '/' + this.item.id),
            data: dat
          }).then(response => {
            this.$toasted.success(response.data)
            this.getlist()
            this.newview = false
            this.showspinner = false
          }).catch(e => {
            this.$toasted.error(e.response.data)
            this.showspinner = false
          })
        } else {
          this.$toasted.error('Existen datos erroneos o incompletos!')
        }
      }
    },
    getlist (pFil, pOrder, pPager) {
      if (pFil !== undefined) { this.filters = pFil }
      if (pOrder !== undefined) { this.orders = pOrder }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener bins
        method: 'get',
        url: urlapi + this.url + '/listbinscalibrated',
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
      this.item.kgnet = enty.kgnet
      this.item.type_id = enty.type_id
      if (this.item.kgnet === 0) { this.kggross = 0 }
      this.title = 'Actualizando bins calibrado'
      let dis = (this.item.type_id === 1) ? this.taras[0].weight : this.taras[1].weight
      if (this.item.kgnet > 0) this.kggross = this.item.kgnet + dis
      // get client -------
      this.owners.forEach(it => {
        if (it.id === this.item.owner) { this.owner_select = it }
      })
      // ------
      // get client -------
      this.listcalibers.forEach(it => {
        if (it.id === this.item.caliber_id) { this.caliber_select = it }
      })
      // get tendencia
      this.trends.forEach(it => {
        if (it.id === this.item.demagetrend_id) { this.item.demagetrend = it }
      })
      // ------
      if (enty.outcast === 1) {
        this.axios.get(urlapi + '/bins/details/' + enty.id).then(response => {
          if (response.data === 0) {
            this.det.caliber = this.batch.caliber
            this.det.humidity = this.batch.humidity
            this.det.fungus = this.batch.fungus
            this.det.drunken = this.batch.drunken
            this.det.physiological = this.batch.physiological
            this.det.texture = this.batch.texture
            this.det.others = this.batch.others
            this.det.totaldamages = this.batch.totaldamages
            this.det.note = '-'
          } else this.det = response.data
        })
      }
      this.newview = true
    },
    clear: itemclear,
    news () {
      this.title = 'Nuevo bins calibrado'
      this.act = 'post'
      this.kggross = 0
      this.clear(this.item)
      this.stock = 0
      this.owner_select = null
      this.caliber_select = null
      this.item.datebins = new Date()
      this.item.client_id = this.order.client_id
      this.item.order_calibrated_id = this.order.id
      this.newview = true
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar el Bins.'
      window.$('#delete').modal('show')
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

<style lang="css">
.danger {
  color: red;
}
</style>
