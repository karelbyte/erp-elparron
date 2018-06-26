<template lang="html">
<div class="">
  <div class="panel panel-default">
    <div class="panel-heading pnl-heading-fix-t">
       Selecion de fruta.
    </div>
    <div class="panel-body">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="">Folio</label>
                    <input disabled class="form-control input-sm" v-model="item.folio" placeholder="" id="itemcode">
                  </div>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="">Fecha</label>
                    <datepicker :value="item.dateshower" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Tipo traspaso</label>
                      <vselect label="name" :options="types" v-model="item.type"></vselect>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Clientes</label>
                      <vselect label="name" :options="clients" v-model="item.init_client"></vselect>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Productores</label>
                      <vselect multiple label="name" :options="producers" v-model="item.producers"></vselect>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Calibres</label>
                      <vselect multiple label="name" :options="listcalibers" v-model="selectcalibers"></vselect>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-for="rag in rangecaliber()" :key="rag.id" class="btn btn-xs" :class="{'btn-default': ifset(rag), 'btn-info': !ifset(rag)}"  style="margin: 0 2px 2px 0" @click="setcaliber(rag)">{{rag}}</div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="">Clasificaciones</label>
                    <vselect multiple label="clasification" :options="clasifications" v-model="item.clasifications"></vselect>
                  </div>
                </div>
                <div v-if="binscalibers.length > 0" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="">Enviar fruta a cliente</label>
                    <vselect label="name" :options="clients" v-model="item.end_client"></vselect>
                  </div>
                </div>

              </div>

            </div>
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
             <div class="row">
               <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                 <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4 txtblack">KG NETOS: {{item.totalkgnet}}</div>
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4 txtblack">MADERA: {{item.cantwood}}</div>
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4 txtblack">PLASTICOS: {{item.cantplastic}}</div>
                 </div>
                 <div class="row">
                   <hr>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 txtblack">
                      <find :filters="philtres" fil="tally" v-on:getfilter="getlist" placehol="buscar tara"></find>
                    </div>
                 </div>
                 <div class="panel panel-default pnl">
                     <div class="panel-heading pnl-heading-fix-t">
                         <div class="row rowheader">
                           <div class="col-lg-3 col-md-2 col-sm-2 hidden-xs">Productor</div>
                           <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6">Tarja </div>
                           <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">Neto</div>
                           <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Calibre</div>
                           <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">Clasificacion</div>
                           <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">Acciones </div>
                        </div>
                     </div>
                   <div class="panel-body pnl-body-fix-t">
                     <div class="row rowset" v-for="entity in list" :key="entity.id" v-bind:class="{'chek': !findcheck(entity), 'found': entity.tally === philtres.tally}">
                       <div class="col-lg-3 col-md-2 col-sm-2 hidden-xs">{{getdescrip(entity.producer_id, 'clientshow')}}</div>
                       <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6">{{entity.tally}} </div>
                       <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">{{entity.kgnet}} </div>
                       <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.caliberaverage}} </div>
                       <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.classification}} </div>
                       <div  class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
                         <button class="btn btn-success btn-xs" @click="add(entity)"><i class="fa fa-plus"></i></button>
                         <button class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button>
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
           </div>
         </div>
    </div>
    <div class="panel-footer">
      <button v-if="binscalibers.length > 0 && item.end_client !== null" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
      <button class="btn btn-default btn-sm" @click="closes()"> Cerrar</button>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import {urlapi} from '../tools'
import find from '@/components/find'
import datepicker from 'vuejs-datepicker'
import paginator from '@/components/paginator'
import easpinner from '@/components/spinner'
import deletes from '@/components/deletes'
import vselect from 'vue-select'
import {spin} from '@/tools'
export default {
  name: 'transfersbins',
  props: ['shower'],
  data () {
    return {
      types: [{id: 1, name: 'Producto calibrado'}, {id: 2, name: 'Producto terminado'}],
      rag: '',
      entity: '',
      title: '',
      itemkill: {},
      list: [],
      listcalibers: [],
      clients: [],
      clientshow: [],
      clasifications: [],
      producers: [],
      act: 'post',
      format: 'dd-MM-yyyy',
      selectcalibers: [],
      binscalibers: [],
      item: {
        id: 0,
        dateshower: new Date(),
        init_client: null,
        end_client: null,
        type: null,
        producers: [],
        calibers: [],
        clasifications: null,
        folio: 0,
        cantwood: 0,
        cantplastic: 0,
        totalbins: 0,
        totalkgnet: 0,
        status: 0
      },
      newview: false,
      url: '/transfers',
      philtres: {folio: '', tally: ''},
      items: {
        field: 'dateshower',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 10
      },
      totalpage: 0,
      showspinner: false,
      stylespiner: spin,
      calibermax: 0,
      calibermin: 0
    }
  },
  components: {
    datepicker, paginator, easpinner, deletes, vselect, find
  },
  mounted () {
    this.getutils()
  },
  watch: {
    'binscalibers': function () {
      this.item.cantwood = 0
      this.item.cantplastic = 0
      this.item.totalbins = 0
      this.item.totalkgnet = 0
      this.binscalibers.forEach(itm => {
        if (itm.type_id === 1) this.item.cantwood++
        if (itm.type_id === 2) this.item.cantplastic++
        this.item.totalbins += (this.item.cantwood + this.item.cantplastic)
        this.item.totalkgnet += itm.kgnet
      })
    },
    'item.init_client': function () {
      this.binscalibers.length = 0
      this.getproducers()
      this.getlist()
    },
    'item.producers': function () {
      this.getlist()
    },
    'selectcalibers': function () {
      if (this.selectcalibers !== null) {
        let list = this.selectcalibers.map(it => {
          return {i: it.begin, f: it.ends}
        })
        let r1 = list.map(it => it.i)
        let r2 = list.map(it => it.f)
        let r = r1.concat(r2)
        this.calibermin = Math.min(...r)
        this.calibermax = Math.max(...r)
        this.item.calibers.length = 0
        for (let i = this.calibermin; i < this.calibermax + 1; i++) {
          this.item.calibers.push(i)
        }
        this.getlist()
      } else {
        this.calibermin = 0
        this.calibermax = 0
        this.item.calibers = []
      }
    },
    'item.clasifications': function () {
      this.getlist()
    }
  },
  methods: {
    findcheck (itm) {
      return window._.indexOf(this.binscalibers, itm) === -1 && !this.pass(itm)
    },
    kill (itm) {
      this.binscalibers = window._.remove(this.binscalibers, function (n) {
        return n.id !== itm.id
      })
    },
    pass (it) {
      let exis = false
      this.binscalibers.forEach(itm => {
        if (itm.id === it.id) { exis = true }
      })
      return exis
    },
    add (itm) {
      if (window._.indexOf(this.binscalibers, itm) === -1 && !this.pass(itm)) {
        this.binscalibers.push(itm)
      }
    },
    setcaliber (cal) {
      if (window._.indexOf(this.item.calibers, cal) === -1) {
        this.item.calibers.push(cal)
        this.getlist()
      } else {
        this.item.calibers = window._.without(this.item.calibers, cal)
        this.getlist()
      }
    },
    ifset (cal) {
      return window._.indexOf(this.item.calibers, cal) === -1
    },
    rangecaliber () {
      return this.calibermin > 0 && this.calibermax > 0 ? _.range(this.calibermin, this.calibermax + 1) : []
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
    getproducers () {
      if (this.item.init_client != null) {
        this.axios.get(urlapi + '/transfers/producers/' + this.item.init_client.id).then(response => {
          this.producers = response.data.producers
          this.clientshow = response.data.clients
        })
      } else {
        this.item.producers = null
        this.producers = []
      }
    },
    getutils () {
      this.axios.get(urlapi + this.url + '/utils/get').then(res => {
        this.item.folio = res.data.folio
        this.clients = res.data.clients
        this.listcalibers = res.data.listcalibers
        this.clasifications = res.data.clasifications
      })
    },
    getlist (pFil, pitem, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.philtres = pFil }
      if (pitem !== undefined) { this.items = pitem }
      if (pPager !== undefined) { this.pager = pPager }
      this.philtres = {
        'client_id': this.item.init_client !== null ? this.item.init_client.id : 0,
        'producers': this.item.producers !== null && this.item.producers.length > 0 ? this.item.producers.map(it => it.id) : '',
        'clasifications': this.item.clasifications !== null && this.item.clasifications.length > 0 ? this.item.clasifications.map(it => it.clasification) : '',
        'calibers': this.item.calibers !== null && this.item.calibers.length > 0 ? this.item.calibers : '',
        'tally': this.philtres.tally
      }
      this.axios({ // obtener ordenes
        method: 'get',
        url: urlapi + this.url + '/getbinscalibrated',
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.philtres, items: this.items}
      }).then(response => {
        this.list = response.data.list
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    save () {
      let transfers = {
        id: 0,
        moment: this.item.dateshower,
        initial_client_id: this.item.init_client.id,
        end_client_id: this.item.end_client.id,
        type_id: this.item.type.id,
        /* producers: this.item.producers.map(it => it.id),
        calibers: this.selectcalibers === null ? [] : this.selectcalibers.map(it => it.id),
        clasifications: this.item.clasifications === null ? [] : this.item.clasifications.map(it => it.id), */
        folio: this.item.folio,
        /* cantwood: this.item.cantwood,
        cantplastic: this.item.cantplastic, */
        cant: this.item.cantwood + this.item.cantplastic,
        tallys: this.binscalibers.map(it => it.id)
      }
      /* let datas = {
        'transfers': shower,
        'items': this.binscalibers.map(it => it.id)
      } */
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: transfers
      }).then(response => {
        this.$toasted.success(response.data)
        this.$emit('getcloseshower')
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    closes () {
      this.$emit('getcloseshower')
    }
  }
}
</script>

<style lang="css">

.chek {
 background-color: rgba(103, 58, 11, 0.29) !important;
}
</style>
