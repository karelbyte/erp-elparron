<template lang="html">
  <div class="">
    <div>
      <p>
        <samp class="txtblack">Procedimiento:</samp> Se debe indicar la totalidad de la información, a fin de no realizar procedimientos erróneos.<br>
        <samp class="txtblack">Acciones Correctivas:</samp> Si se detecta un error en la orden, se debe avisar al Jefe de Planta.<br>
      <p class="text-justify"><samp class="txtblack">AYUDA:</samp> De click <strong >Nueva</strong> para generar datos.<br>
      </p><hr>
      <p class="leyenda"> REGISTRO DE ENVASADO POR TURNO</p>
      <p class="leyenda"> ORDEN: {{pack.folio}}</p>
      <hr>
    </div>
    <div v-if="!newview">
    <div class="panel panel-default">
      <div class="panel-heading pnl-heading-fix-t">
         Generador de datos de envasado
      </div>
      <div class="panel-body">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Fecha</label>
                  <datepicker v-model="item.moment" input-class="form-control input-sm" language="es" :format="format"></datepicker>
                </div>
              </div>
              <div class="col-lg-1 col-md-2 col-sm-2 col-xs-12">
                <div class="form-group">
                  <label>Hora</label>
                  <date-picker v-model="item.hours" :config="configtime" class="input-sm"></date-picker>
                </div>
              </div>
               <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                 <div class="form-group">
                   <label>N de tarja</label>
                   <input type="text" class="form-control input-sm" v-model.number="item.ntally" placeholder="">
                 </div>
               </div>
             <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Tipo envase</label>
                  <select class="form-control input-sm" v-model="item.typebox">
                    <option v-for="ty in supplies" :key="ty.supplie_id" :value="ty.supplie_id">{{ty.name}}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Cantidad de cajas</label>
                  <input type="text" class="form-control input-sm" v-model.number="item.cantbox" @keydown="valnumber($event)">
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div class="form-group">
                  <label>Kg</label>
                  <label class="form-control input-sm">{{this.item.kg}}</label>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label> Supervisor de turno</label>
                  <select class="form-control input-sm" name="" v-model="item.supervisor_id">
                    <option v-for="sup in supers" :key="sup.id" :value="sup.id"> {{sup.name}}</option>
                  </select>
                </div>
              </div>
             </div>
      </div>
      <div class="panel-footer">
        <button class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
         <button class="btn btn-default btn-sm" @click="close()">Cerrar</button>
      </div>
    </div>
      <!--<button class="btn btn-default btn-sm" @click="close()"> <i class="fa fa-arrow-left"></i> Regresar</button> -->
    </div>
    <div v-if="newview">
      <div  class="row">
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-6">
          <button class="btn btn-success btn-fix btn-sm" @click="news()" > Nueva</button>
        </div>
        <div  class="col-lg-8 col-md-7 col-sm-7 hidden-xs"> </div>
        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">
          <find :filters="philtres" fil="folio" v-on:getfilter="getlist" placehol="buscar folio"></find>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default pnl">
            <div class="panel-heading pnl-heading-fix-t">
              <div class="row rowheader">
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Fecha </div>
                <!--   <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Hora</div> -->
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">Hora</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">N tarja</div>
                <div class="col-lg-2 col-md-2 col-md-2 hidden-xs">Envase</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Cantidad Caja</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">Kg</div>

                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6"></div>
              </div>
            </div>
            <div class="panel-body pnl-body-fix-t">
              <div  class="row rowset" v-for="entity in list" :key="entity.id" >
                <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" >{{entity.moment}}</div>
                <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{entity.hours}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.ntally}} </div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{desc(entity.typebox, 'supplies', 'supplie_id')}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">{{entity.cantbox}}</div>
                <div class="col-lg-2 hidden-md hidden-sm hidden-xs">{{entity.kg}}</div>
                <div v-if="entity.aprove === 0" class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                  <button class="btn btn-primary btn-xs" @click="edit(entity)"><i class="fa fa-edit"></i></button>
                  <button class="btn btn-danger btn-xs" @click="kill(entity)"><i class="fa fa-eraser"></i></button>
                  <button class="btn btn-success btn-xs" @click="passline(entity)"><i class="fa fa-thumbs-up"></i></button>
                </div>
              </div>
               <div class="row rowset">
                  <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs" ></div>
                  <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6"></div>
                  <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs"> </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 hidden-xs"></div>
                 <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs text-right txtblack">TOTAL</div>
                  <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs txtblack">{{gettotalbox()}}</div>
                  <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs text-right txtblack">TOTAL</div>
                  <div class="col-lg-2 hidden-md hidden-sm hidden-xs txtblack">{{gettotalkg()}}</div>
                  <div v-if="entity.aprove === 0" class="col-lg-1 col-md-2 col-sm-2 col-xs-6">
                </div>
              </div>
            </div>
            <div class="panel-footer pnl-footer-fix-t">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                  <paginator :tpage="totalpage" :pager="pager" v-on:getresult="getlist"></paginator>
                </div>

              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <button class="btn btn-default btn-sm" @click="closes()"> <i class="fa fa-arrow-left"></i> Regresar</button>
              </div>
            </div>
          </div>
        </div>
        <deletes :urlkill="url" :itemkill="itemkill" v-on:gets="getlist" :element="itemkill.folio" :title="title"></deletes>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import paginator from '@/components/paginator'
import easpinner from '@/components/spinner'
import deletes from '@/components/deletes'
import find from '@/components/find'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
import timePicker from 'vue-bootstrap-datetimepicker'
import datepicker from 'vuejs-datepicker'
import {spin, urlapi, valid} from '@/tools'
export default {
  name: 'packingsorbatodetails',
  props: ['pack'],
  data () {
    return {
      passaprove: false,
      supers: [],
      sup: '',
      turn: '',
      entity: '',
      title: '',
      itemkill: {},
      list: [],
      us: '',
      users: [],
      supplies: [],
      newview: true,
      act: this.pack.act,
      format: 'dd-MM-yyyy',
      configtime: {
        format: 'h:mm a',
        useCurrent: true
      },
      item: {
        daily_id: this.pack.id,
        moment: new Date(),
        hours: new Date(),
        ntally: 0,
        typebox: 0,
        cantbox: 0,
        cantbags: 0,
        kg: '',
        order_supplie_id: 0,
        aprove: 0,
        supervisor_id: 0
      },
      philtres: {daily_id: this.pack.id},
      items: {
        field: 'moment',
        type: 'asc'
      },
      pager: {
        page: 1,
        recordpage: 9
      },
      totalpage: 0,
      url: '/packingsdailyd',
      showspinner: false,
      stylespiner: spin
    }
  },
  components: {
    datepicker, 'date-picker': timePicker, find, paginator, easpinner, deletes
  },
  computed: {
    ...mapState({
      passportStore: state => state.passportstore,
      userStore: state => state.userstore
    })
  },
  mounted () {
    this.axios.get(urlapi + '/packingsdailyd/getutils/' + this.pack.packing_id).then(res => {
      this.supplies = res.data
      this.getlist()
    })
    this.axios.get(urlapi + '/users/xranks/' + '7').then(res => {
      this.supers = res.data
    })
  },
  watch: {
    'item.typebox': function () {
      // this.supplies.find(it => { return it.supplie_id === this.item.typebox }).kg
      if (this.item.typebox !== 0) {
        this.item.order_supplie_id = this.supplies.find(it => { return it.supplie_id === this.item.typebox }).id
      }
      this.item.kg = parseInt(this.item.cantbox) * this.pack.kgbox
    },
    'item.cantbox': function () {
      // let kg = this.supplies.find(it => { return it.supplie_id === this.item.typebox }).kg
      this.item.kg = parseInt(this.item.cantbox) * this.pack.kgbox
    }
  },
  methods: {
    gettotalbox () {
      let aux = 0
      this.list.forEach(it => {
        aux += it.cantbox
      })
      return aux
    },
    gettotalkg () {
      let aux = 0
      this.list.forEach(it => {
        aux += it.kg
      })
      return aux
    },
    passline (item) {
      if (this.item.manager_id !== 0) {
        this.axios.post(urlapi + this.url + '/passline/' + item.id).then(res => {
          item.aprove = 1
        })
      }
    },
    getkg (itm) {
      if (this.supplies !== undefined) {
        let kg = this.supplies.find(it => { return it.supplie_id === itm.typebox }).kg
        return parseInt(itm.cantbox) * kg
      } else {
        return 0
      }
    },
    close () {
      this.newview = true
    },
    closes () {
      this.$emit('getclosepacking')
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
        this.users = response.data.users
        this.totalpage = Math.ceil(response.data.total / this.pager.recordpage)
        this.showspinner = false
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    news () {
      this.act = 'post'
      this.item.daily_id = this.pack.id
      this.item.moment = new Date()
      this.item.hours = new Date()
      this.item.ntally = 0
      this.item.typebox = 0
      this.item.cantbox = 0
      this.item.supervisor_id = 0
      this.item.order_supplie_id = 0
      this.item.kg = 0
      this.newview = false
    },
    save () {
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: this.item
      }).then(response => {
        this.$toasted.success(response.data)
        this.showspinner = false
        this.newview = true
        this.getlist()
      }).catch(e => {
        this.$toasted.error(e.response.data)
        this.showspinner = false
      })
    },
    edit (enty) {
      this.act = 'put'
      this.item = JSON.parse(JSON.stringify(enty))
      this.newview = false
    },
    kill (aitem) {
      this.itemkill = aitem
      this.title = 'Eliminar datos de envasado'
      window.$('#delete').modal('show')
    },
    valnumber: valid,
    desc (rl, descrip, idfind) {
      if (rl !== null && descrip !== null) {
        let aux = ''
        for (let it of this[descrip]) {
          if (it[idfind] === rl) {
            aux = it.name
            break
          }
        }
        return aux
      } else return ''
    }
  }
}
</script>

<style lang="css">
</style>
