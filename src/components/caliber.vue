<template lang="html">
  <div class="">
    <p class="text-justify"><samp class="txtblack">AYUDA:</samp> Escoja el cliente y señale los lotes a calibrar.<br>
    <hr>
    <p class="leyenda text-justify"> ORDENES DE CALIBRADO</p>
    <hr>
    <div class="panel panel-default">
    <div class="panel-heading pnl-heading-fix-t">
       {{title}}
    </div>
    <div class="panel-body">
      <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
              <div class="form-group">
                <label for="">Fecha</label>
                  <datepicker v-model="item.datecalibrated" input-class="form-control input-sm" language="es" :format="format"></datepicker>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
              <div class="form-group">
                <label for="">Folio</label>
                <input disabled type="text" class="form-control input-sm" v-model="item.folio" placeholder="">
              </div>
            </div>
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group input-group-sm">
                 <label for="">Cliente</label>
                  <select class="form-control" name="" v-model="item.client_id" @change="getbatchs()">
                      <option v-for="cli in clients" :key="cli.id" :value="cli.id"> {{cli.name}}</option>
                  </select>
               </div>
          </div>
          <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
            <div class="form-group input-group-sm">
              <label for="">Productor</label>
               <!--<select class="form-control" name="" v-model="filters.producer_id" @change="getlist()">
                   <option :value="0"></option>
                   <option v-bind:v-for="pro in producers" :value="pro.id"> {{pro.name}}</option>
               </select> -->
              <vselect multiple label="name" :options="producers" v-model="producer_select"></vselect>
            </div>
       </div>
    </div>
    <div class="row">
       <div class="col-lg-9">
          <div class="panel panel-default pnla">
              <div class="panel-heading  pnl-heading-fix-ta">
                  <div class="row rowheader" style="color:black">
                    <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Fecha</div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">Lote</div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">Productor</div>
                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">Madera</div>
                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">Plastico</div>
                    <div class="col-lg-1 col-md-1 hidden-sm col-xs-6">Total</div>
                    <div class="col-lg-1 hidden-md hidden-sm hidden-xs">Kg Net</div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">  </div>
                 </div>
              </div>
            <div class="panel-body pnl-body-fix-ta">
              <div class="row rowset" v-for="entity in list" :key="entity.id" v-bind:class="{'chek': !findcheck(entity), 'calibrada': entity.rawmaterial === 1}">
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.datebatch}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">{{entity.batch}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">{{getdescrip(entity.producer_id, 'producers')}}</div>
                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">{{entity.cantwood}}</div>
                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">{{entity.cantplastic}}</div>
                <div class="col-lg-1 col-md-1 hidden-sm col-xs-6">{{entity.cantplastic + entity.cantwood}}</div>
                <div class="col-lg-1 hidden-md hidden-sm hidden-xs">{{entity.kgnet}}</div>

                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
                  <button :disabled="!findcheck(entity)" class="btn btn-primary btn-xs" @click="add(entity)"><i class="fa fa-plus"></i></button>
                  <button :disabled="findcheck(entity)" class="btn btn-danger btn-xs" @click="deletes(entity)"><i class="fa fa-eraser"></i></button>
                </div>
              </div>
            </div>
            <div class="panel-footer pnl-footer-fix-ta">
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
      <div class="col-lg-3">
          <label for=""> Total Madera:  {{item.cantwood}}</label> <br>
          <label for=""> Total Plastico:  {{item.cantplastic}}</label> <br>
          <label for=""> Total Bins:  {{item.totalbins}}</label><br>
          <label for=""> Total KgNet:  {{item.totalkgnet}}</label><br>
          <label>Calibrada</label>&nbsp;<label class="leyen">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      </div>
       <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.batch" :title="title"></deletes>
    </div>
    </div>
    <div class="panel-footer">
       <button v-if="item.totalbins !== 0" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
       <button class="btn btn-default btn-sm" @click="close()"> Cerrar</button>
    </div>
        </div>
            <spinner :show="showspinner" :styles="stylespiner"></spinner>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import datepicker from 'vuejs-datepicker'
import find from '@/components/find'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import deletes from '@/components/deletes'
import {spin, urlapi} from '@/tools'
import vselect from 'vue-select'
export default {
  name: 'caliber',
  props: ['itm'],
  data () {
    return {
      entity: '',
      cli: '',
      title: '',
      itemkill: {},
      selectes: [],
      list: [],
      clients: [],
      producers: [],
      producer_select: null,
      act: 'post',
      item: {
        id: 0,
        datecalibrated: (new Date()).toISOString(),
        user_id: 0,
        folio: 0,
        client_id: 0,
        producer_id: 0,
        cantwood: 0,
        cantplastic: 0,
        totalbins: 0,
        totalkgnet: 0,
        recalibrate: 0,
        status: ''
      },
      format: 'yyyy-MM-dd',
      newview: false,
      url: '/calibrated',
      filters: {
        client_id: 0,
        put: false,
        producer_id: [],
        calibrated_id: 0
      },
      orders: {
        field: 'datecalibrated',
        type: 'desc'
      },
      pager: {
        page: 1,
        recordpage: 6
      },
      totalpage: 0,
      showspinner: false,
      stylespiner: spin
    }
  },
  components: {
    paginator, spinner, deletes, find, datepicker, vselect
  },

  computed: {
    ...mapState({
      passportStore: state => state.passportstore,
      userStore: state => state.userstore
    })
  },
  watch: {
    'selectes': function () {
      this.item.cantwood = 0
      this.item.cantplastic = 0
      this.item.totalbins = 0
      this.item.totalkgnet = 0
      this.selectes.forEach(itm => {
        this.item.cantwood += itm.cantwood
        this.item.cantplastic += itm.cantplastic
        this.item.totalbins += (itm.cantwood + itm.cantplastic)
        this.item.totalkgnet += itm.kgnet
      })
    },
    'item.id': function () {
      if (this.item.id !== 0) {
        this.act = 'put'
        this.filters.put = true
        this.filters.calibrated_id = this.item.id
        this.getbatchs()
      }
    },
    'producer_select': function () {
      this.filters.producer_id = this.producer_select.map(it => { return it.id })
      this.getlist()
    }
  },
  mounted () {
    this.item = this.itm
    if (this.itm.id === 0) this.getfolio()
    this.getclients()
  },
  methods: {
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
    findcheck (itm) {
      return window._.indexOf(this.selectes, itm) === -1 && !this.pass(itm)
    },
    getlist (pFil, pOrder, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.filters = pFil }
      if (pOrder !== undefined) { this.orders = pOrder }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener ordenes de calibrado
        method: 'get',
        url: urlapi + '/calibrated/batchlist',
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.filters, orders: this.orders}
      }).then(response => {
        this.list = response.data.list
        this.selectes = response.data.calibrateds
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    close () {
      this.$emit('getclose')
    },
    save () {
      this.showspinner = true
      this.item.user_id = this.userStore.user.id
      this.item.recalibrate = this.selectes.find(it => { return it.rawmaterial === 1 }) === undefined ? 0 : 1
      let dat = {
        batchs: this.selectes.map(it => {
          return it.id
        }),
        order: this.item
      }
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: dat
      }).then(response => {
        this.$toasted.success(response.data)
        this.showspinner = false
        this.$emit('getclose')
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    getfolio () {
      this.axios.get(urlapi + this.url + '/surrogates').then(res => {
        this.item.folio = res.data
      })
    },
    getclients () {
      if (this.itm.id === 0) {
        this.item.cantwood = 0
        this.item.cantplastic = 0
        this.item.totalbins = 0
        this.item.totalkgnet = 0
      }
      this.axios.get(urlapi + this.url + '/clients').then(res => {
        this.clients = res.data
      })
    },
    getproducers () {
      if (this.itm.id === 0) {
        this.item.cantwood = 0
        this.item.cantplastic = 0
        this.item.totalbins = 0
        this.item.totalkgnet = 0
      }
      this.axios.get(urlapi + this.url + '/getproducers/' + this.item.client_id).then(res => {
        this.producers = res.data
      })
    },
    getbatchs () {
      this.filters.client_id = this.item.client_id
      this.getproducers()
      this.getlist()
    },
    pass (it) {
      let exis = false
      this.selectes.forEach(itm => {
        if (itm.id === it.id) { exis = true }
      })
      return exis
    },
    add (itm) {
      if (window._.indexOf(this.selectes, itm) === -1 && !this.pass(itm)) {
        if (itm.rawmaterial === 1) {
          let istrue = this.selectes.find(it => { return it.rawmaterial === 2 })
          if (istrue === undefined) {
            this.selectes.push(itm)
            this.$toasted.info('Este lote es de fruta calibrada externa!')
          } else {
            this.$toasted.info('No se permite calibrar y recalibrar al mismo tiempo')
          }
          // this.$toasted.info('Este lote es de fruta calibrada externa!')
        } else {
          let istrue = this.selectes.find(it => { return it.rawmaterial === 1 })
          if (istrue === undefined) {
            this.selectes.push(itm)
          } else {
            this.$toasted.info('No se permite calibrar y recalibrar al mismo tiempo')
          }
        }
      } else {
        this.$toasted.info('Ya esta añadido a la orden')
      }
    },
    deletes (itm) {
      this.selectes = window._.remove(this.selectes, function (n) {
        return n.id !== itm.id
      })
    }
  }
}
</script>

<style lang="css">

.pnla {
  margin-top: 5px;
  margin-bottom: 5px;
}

.pnl-body-fix-ta {
 padding:  1px 5px 10px 5px !important;
}

.pnl-heading-fix-ta {
  padding:  5px 5px 5px 5px  !important;
  color: black !important;
  background-color: rgba(11, 67, 103, 0.73) !important;
}

.pnl-footer-fix-ta {
  padding:  5px 5px 5px 5px !important;
  background-color: rgba(11, 67, 103, 1) !important;
}

.chek {
 background-color: rgba(103, 58, 11, 0.29) !important;
}

.calibrada {
  background-color: rgba(11, 28, 103, 0.29) !important;
}

.leyen {
  background-color: rgba(11, 28, 103, 0.29) !important;
  color: rgba(11, 28, 103, 0.29) !important;
}
</style>
