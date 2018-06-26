<template lang="html">
 <div class="" style="margin-bottom:10px">
   <p class="leyenda text-justify"> BINS DEL LOTE:  <b style="color:black">{{batch.batch}}</b></p>
   <p class="leyenda text-justify"> CLIENTE:  <b style="color:black">{{getdescrip(batch.client_id, 'clients')}}</b></p>
   <p class="leyenda text-justify"> PRODUCTOR:  <b style="color:black">{{getdescrip(batch.producer_id, 'producers')}}</b></p>
   <hr class="">

   <!--Panel de usuarios y sus permisos -->
      <div v-if="newview" class="panel panel-default">
        <div class="panel-heading pnl-heading-fix-t">
           {{title}}
        </div>
        <div class="panel-body">
              <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                  <div class="form-group">
                    <label for="">Fecha</label>
                      <datepicker :value="item.daterecep" v-model="item.daterecep" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                  </div>
                </div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Tarja</label>
                     <input disabled type="text" class="form-control input-sm" v-model="item.tally" placeholder="" id="tally">
                   </div>
                 </div>
                 <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label for="">Kg Brutos</label>
                     <input type="text" class="form-control input-sm" v-model="kggross" placeholder="" @keydown="valnumber($event)">
                   </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div class="form-group">
                    <label for="">Kg Netos</label>
                    <input disabled type="text" class="form-control input-sm" v-model="knet" placeholder="">
                  </div>
              </div>
            </div>
            <div class="row">
               <!--  <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                  <div class="form-group">
                    <label for="">Fecha Salida</label>
                      <datepicker :value="item.dateexit" v-model="item.dateexit" input-class="form-control input-sm" language="es"></datepicker>
                  </div>
                </div> -->
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div class="form-group input-group-sm">
                    <label for="">Propietario</label>
                     <select class="form-control" name="" v-model="item.owner">
                         <option v-for="ow in owners" :value="ow.id" :key="ow.id"> {{ow.name}}</option>
                     </select>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div class="form-group">
                    <label for="">Marca</label>
                    <input type="text" class="form-control input-sm" v-model="item.binsmark" placeholder="">
                  </div>
               </div>
               <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                 <div class="form-group input-group-sm">
                   <label for="">Estado</label>
                    <select class="form-control" name="" v-model="item.status">
                        <option v-for="st in status" :value="st.id" :key="st.id"> {{st.name}}</option>
                    </select>
                 </div>
               </div>
                <div v-if="batch.rawmaterial === 1" class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div style="padding-top:20px">
                    <div class="mousehand" @click="setautoriz()"><i class="fa" :class="{'fa-check-square-o': item.outcast, ' fa-square-o': !item.outcast }"></i> Fuera de especición</div>
                  </div>
                </div>
              </div>
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
             <button class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
             <button class="btn btn-default btn-sm" @click="closes()"> Cerrar</button>
        </div>
      </div>

  <div v-if="!newview">
   <div class="row">
        <div class="col-lg-9 col-md-6 col-sm-6 col-xs-5">
        <!--  <button v-if="batch.status_batch === 1" class="btn btn-success btn-fix btn-sm" @click="news()">Nuevo Bins</button> -->
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
                     <div class="col-lg-2 col-md-1  hidden-sm hidden-xs">Tipo</div>
                     <div class="col-lg-2 col-md-1 hidden-sm hidden-xs">Estado </div>
                     <div class="col-lg-2 col-md-3 col-sm-3 hidden-xs">Dueño </div>
                     <div v-if="batch.status_batch === 1" class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Acciones </div>
                  </div>
               </div>
             <div class="panel-body pnl-body-fix-t">
               <div class="row rowset" v-for="entity in list" :key="entity.id">
                 <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">{{entity.datefix}}</div>
                 <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">{{entity.tally}} </div>
                 <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">{{entity.kgnet}} </div>
                 <div class="col-lg-2 col-md-1  hidden-sm hidden-xs">{{getdescrip(entity.type, 'typebins')}} </div>
                 <div class="col-lg-2 col-md-1  hidden-sm hidden-xs">{{getdescrip(entity.status, 'status')}} </div>
                 <div class="col-lg-2 col-md-3 col-sm-3 hidden-xs">{{getdescrip(entity.owner, 'owners')}} </div>
                 <div v-if="batch.status_batch === 1" class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                   <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                    <!--<button class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button> -->
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
         <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.tally" :title="title"></deletes>
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
import {spin, urlapi, valid} from '@/tools'
export default {
  name: 'bins',
  props: ['batch'],
  data () {
    return {
      list: [],
      owners: [],
      clients: [],
      producers: [],
      typebins: [{id: 1, name: 'Madera'}, {id: 2, name: 'Plastico'}],
      status: [{id: 1, name: 'Bueno'}, {id: 2, name: 'Regular'}, {id: 3, name: 'Malo'}],
      url: '/bins',
      itemkill: {},
      title: '',
      item: {
        daterecep: (new Date()).toISOString(),
        batch: this.batch.batch,
        client_id: this.batch.client_id,
        producer_id: this.batch.producer_id,
        tally: 0,
        kgnet: 0,
        dateexit: (new Date()).toISOString(),
        posting_id: 0,
        // status: 0,
        binsmark: '',
        owner: 0,
        other: '-',
        type: 0,
        outcast: false
      },
      format: 'dd-MM-yyyy',
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
      kggross: 0,
      newview: false,
      filters: {
        batch: this.batch.batch,
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
      stylespiner: spin
    }
  },
  components: {
    paginator, spinner, deletes, find, datepicker
  },
  mounted () {
    // this.getowner()
    this.getlist()
  },
  computed: {
    knet: function () {
      let dis = (this.item.type === 1) ? 60 : 45
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
  methods: {
    valnumber: valid,
    getlist (pFil, pOrder, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.filters = pFil }
      if (pOrder !== undefined) { this.orders = pOrder }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener bins
        method: 'get',
        url: urlapi + this.url,
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.filters, orders: this.orders}
      }).then(response => {
        this.list = response.data.list
        this.clients = response.data.clients
        this.producers = response.data.producers
        this.owners = this.clients.concat(this.producers)
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    news () {
      for (var property in this.item) {
        if (typeof this.item[property] === 'number') { this.item[property] = 0 } else { this.item[property] = '-' }
      }
      this.axios.get(urlapi + this.url + '/tally/' + this.batch.id).then(res => {
        this.kggross = 0
        this.item.tally = res.data
        this.title = 'Nuevo bins'
        this.act = 'post'
        this.newview = true
        this.item.daterecep = new Date()
        window.$('#batch').focus()
      })
    },
    save () {
      this.item.batch = this.batch.batch
      this.item.client_id = this.batch.client_id
      this.item.producer_id = this.batch.producer_id
      this.item.daterecep = this.item.daterecep.toISOString()
      let dat = {}
      if (this.item.outcast) {
        dat = {
          item: this.item,
          det: this.det
        }
      } else {
        dat = {
          item: this.item,
          det: null
        }
      }
      if ((this.item.daterecep !== '') && (this.item.kgnet !== 0) && (this.item.status !== 0) && (this.item.tally !== 0)) {
        this.showspinner = true
        this.axios({ // guardar orden
          method: this.act,
          url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
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
    },
    edit (enty) {
      function extedit (athis, itm) {
        athis.act = 'put'
        athis.item = JSON.parse(JSON.stringify(itm))
        athis.item.daterecep = new Date(athis.item.daterecep.replace(/-/g, '/'))
        athis.title = 'Actualizando bins. / ' + athis.getdescrip(athis.item.type, 'typebins')
        let dis = (athis.item.type === 1) ? 60 : 45
        if (athis.item.kgnet > 0) athis.kggross = athis.item.kgnet + dis
        athis.newview = true
        window.$('#tally').focus()
      }
      if (enty.outcast === 1) {
        this.axios.get(urlapi + this.url + '/details/' + enty.id).then(response => {
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
          extedit(this, enty)
        })
      } else { extedit(this, enty) }
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar el Bins.'
      window.$('#delete').modal('show')
    },
    closes () {
      this.newview = false
      for (var property in this.item) {
        if (typeof this.item[property] === 'number') { this.item[property] = 0 } else { this.item[property] = '-' }
      }
      this.kggross = 0
    },
    close () {
      this.$emit('getclose')
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
    getowner () {
      this.axios.get(urlapi + '/bins/owner/' + this.batch.producer_id).then(response => {
        this.owners = response.data
      })
    },
    setautoriz () {
      this.item.outcast = !this.item.outcast
      if (this.item.outcast) {
        this.axios.get(urlapi + this.url + '/details/' + this.item.id).then(response => {
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
    }
  }
}
</script>

<style lang="css">
</style>
