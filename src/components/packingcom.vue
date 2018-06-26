<template lang="html">
  <div class="panel panel-default">
    <div class="panel-heading pnl-heading-fix-t">
       Generador de ordenes de envasado
    </div>
    <div class="panel-body">
        <div class="">
          <div class="row">
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label  >Fecha</label>
                <datepicker v-model="item.datepacking" input-class="form-control input-sm" language="es" :format="format"></datepicker>
              </div>
            </div>
             <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label  >Numero de orden</label>
                 <input type="text" class="form-control input-sm" v-model="item.folio" placeholder="">
               </div>
             </div>

             <div class="col-lg-4 col-md-5 col-sm-7 col-xs-12">
               <div class="form-group input-group-sm">
                 <label>Clientes</label>
                   <vselect label="name" :options="clients" v-model="select_client"></vselect>
               </div>
             </div>
             <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label>Tipo de fruta</label>
                 <select class="form-control input-sm" name="" v-model="item.typefruit">
                 <option value="1">Ciruela</option>
               </select>
               </div>
             </div>

             <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label>Variedad</label>
                 <select class="form-control input-sm" name="" v-model="item.variety">
                   <option value="1">D'Agen</option>
                 </select>
               </div>
             </div>

             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label>Tipo de proceso</label>
                 <select class="form-control input-sm" v-model="item.typepacking">
                   <option v-for="ty in typepacking"  :key="ty.id" :value="ty.id">{{ty.name}}</option>
                 </select>
               </div>
             </div>

             <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
               <div class="form-group">
                 <label  >Ordenes (kg = {{item.realcant}})</label>
                   <vselect multiple label="folio" :options="orders" v-model="orders_select"></vselect>
               </div>
             </div>
           </div>
           <div v-if="item.typepacking != 0" >
           <div class="panel panel-default">
             <div class="panel-heading" style="padding:2px 0 2px 15px; color:black">
               Materiales
             </div>
             <div class="panel-body">
               <div class="row"> <!-- Materiales -->
                 <div v-for="supl in supplies" :key="supl.id" class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                   <div class="form-group">
                     <label  >{{supl.name}}</label>
                     <div class="input-group input-group-sm">
                           <input type="text" class="form-control" aria-label="..."  v-model="supl.data" :class="{bk: supl.data > isvalidstock(supl)}" @keydown="valnumber($event)">
                           <div  class="input-group-btn">
                             <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Inventario <span class="caret"></span></button>
                             <ul v-if="getstock(supl.typesupplie).exis" class="dropdown-menu dropdown-menu-right">
                               <li v-for="st in getstock(supl.typesupplie).stock" :key="st.id" class="mousehand">
                               <a> <input type="checkbox" :value="st" v-model="addstock">
                                 {{st.batch + '-->' + st.realcant}}</a>
                               </li>
                             </ul>
                           </div><!-- /btn-group -->
                         </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           </div>
           <div class="row">
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">  <!-- CLIBRE POR PROCESO -->
               <div class="form-group input-group-sm">
                 <label >Calibre</label>
                 <vselect label="name" :options="listcalibers" v-model="selectcaliber"></vselect>
               </div>
             </div>
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label  >Cantidad</label>
                  <input type="text" class="form-control input-sm" v-model="item.cant" :class="{bk: item.cant > item.realcant}" @keydown="valnumber($event)">
               </div>
             </div>
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label  >Tipo de envasado</label>
                 <input type="text" class="form-control input-sm" v-model="item.containertype" placeholder="">
               </div>
             </div>

             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label  >% de Humedad</label>
                  <input type="text" class="form-control input-sm" v-model="item.humidity" @keydown="valnumber($event)">
               </div>
             </div>
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label  >% Carozo</label>
                  <input type="text" class="form-control input-sm" v-model="item.carozo" @keydown="valnumber($event)">
               </div>
             </div>

             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label  >Preservante</label>
                 <input type="text" class="form-control input-sm" v-model="item.preserver" placeholder="">
               </div>
             </div>
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label>Impresion</label>
                 <input type="text" class="form-control input-sm" v-model="item.print" placeholder="">
               </div>
             </div>
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label>Peso caja (Kg)</label>
                 <input type="text" class="form-control input-sm" v-model="item.kgbox" placeholder="">
               </div>
             </div>
             <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
               <div class="form-group">
                 <label  >Tratamientos especiales</label>
                  <input type="text" class="form-control input-sm" v-model="item.specialtreatments" placeholder="">
               </div>
             </div>
             <!--
             <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
               <div class="form-group">
                 <label  >Supervisor</label>
                 <input type="text" class="form-control input-sm" v-model="item.surpervisor" placeholder="">
               </div>
             </div>
             <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
               <div class="form-group">
                 <label  >Jefe de producción</label>
                  <input type="text" class="form-control input-sm" v-model="item.productionmanager" placeholder="">
               </div>
             </div> -->

           </div>
        </div>
    </div>
    <div class="panel-footer">
         <button v-if="savepass()" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
         <button class="btn btn-default btn-sm" @click="closes()"> Cerrar</button>
       <!-- <button class="btn btn-default btn-sm" @click="gets()">get</button> -->
    </div>
  </div>
</template>

<script>
import {spin, urlapi, valid, getarraydata} from '../tools'
import datepicker from 'vuejs-datepicker'
import easpinner from '@/components/spinner'
import vselect from 'vue-select'
export default {
  name: 'packingcom',
  props: ['pack', 'acts'],
  data () {
    return {
      selectcaliber: '',
      listcalibers: [],
      entity: '',
      trend: '',
      prod: '',
      propi: '',
      ty: '',
      calib: '',
      clients: [],
      select_client: null,
      typepacking: [],
      supplies: [],
      orders: [],
      status: [],
      act: this.acts,
      orders_select: [],
      format: 'dd-MM-yyyy',
      stock: [],
      item: {
        id: this.pack.id,
        folio: this.pack.folio,
        datepacking: this.pack.datepacking,
        typepacking: this.pack.typepacking,
        typefruit: this.pack.typefruit,
        variety: this.pack.variety,
        caliber: this.pack.caliber,
        cant: this.pack.cant,
        process: this.pack.progress,
        client_id: this.pack.client_id,
        containertype: this.pack.containertype,
        humidity: this.pack.humidity,
        preserver: this.pack.preserver,
        print: this.pack.print,
        surpervisor: this.pack.surpervisor,
        productionmanager: this.pack.productionmanager,
        realcant: this.pack.realcant,
        orders: this.pack.ordenes,
        orderslist: this.pack.orderslist,
        carozo: this.pack.carozo,
        kgbox: this.pack.kgbox,
        specialtreatments: this.pack.specialtreatments
      },
      url: '/packings',
      showspinner: false,
      stylespiner: spin,
      flag: false,
      dat: [],
      addstock: []
    }
  },
  components: {
    datepicker, easpinner, vselect
  },
  mounted () {
    this.getdata()
  },
  watch: {
    'item.typepacking': 'getorders',
    'select_client': 'getorders',
    'orders_select': 'calkg'
  },
  methods: {
    getcalibers (type) {
      this.axios.get(urlapi + this.url + '/calibers/' + type).then(res => {
        this.listcalibers = res.data
        if (this.act === 'put') { // si eactulizacion se ajustan los datos
          this.selectcaliber = this.listcalibers.find(it => { return it.id === parseInt(this.item.caliber) })
        }
      })
    },
    getdata () { // se cargan dato de utilidad
      this.axios.get(urlapi + this.url + '/getutils').then(res => {
        this.clients = res.data.clients
        this.typepacking = res.data.typepacking
        if (this.act === 'put') { // si eactulizacion se ajustan los datos
          this.select_client = this.clients.find((client) => { return client.id === this.item.client_id })
          this.getorders()
          this.getcalibers(this.item.typepacking)
        }
      })
    },
    savepass () { // se valida los dotos a guardar
      return this.item.folio !== '' && this.item.client_id !== 0 && this.item.variety !== 0 && this.item.typefruit !== 0 && this.item.typepacking !== 0 &&
       this.item.cant !== 0
    },
    isvalidstock (itm) {
      let cant = 0
      this.addstock.forEach(it => {
        if (it.typesupplie_id === itm.typesupplie) {
          cant += it.realcant
        }
      })
      if (cant === 0) { return cant } else {
        return this.act === 'post' ? cant : cant + parseInt(itm.data)
      }
    },
    getstock (ids) {
      let res = {
        stock: this.stock.filter(it => { return it.typesupplie_id === ids }),
        exis: this.stock.find(it => { return it.typesupplie_id === ids }) !== undefined
      }
      return res
    },
    calkg () {
      this.item.realcant = 0
      if (this.orders_select !== null) {
        this.orders_select.forEach(it => {
          this.item.realcant += parseInt(it.totalkgnet)
        })
        this.item.orders = this.orders_select.map(it => it.id)
      }
    },
    getssupplies () {
      let sub = this.supplies.map(su => {
        return { id: su.typesupplie, cant: su.data, orders: (this.addstock.filter((item) => { return su.typesupplie === item.typesupplie_id })).map(it => it.id) }
      })
      return sub.filter((it) => { return it.cant !== undefined && it.cant > 0 })
    },
    getorders () {
      if (this.select_client !== null) { this.item.client_id = this.select_client.id }
      if (this.act === 'post') { this.orders_select = null }
      switch (this.item.typepacking) {
        case 1:
          let sup = []
          sup[1] = 'a'
          let parm = {
            client_id: this.item.client_id,
            typepacking: this.item.typepacking,
            act: this.act,
            pack_id: this.item.id
          }
          this.getcalibers(1)
          this.axios.get(urlapi + this.url + '/getshowers', {params: parm}).then(res => {
            this.orders = res.data.orders
            this.stock = res.data.stock
            if (this.act === 'post') { this.supplies = res.data.supplies } else {
              sup = res.data.supplies
            }
            if (this.act === 'put' && !this.flag) {
              this.axios.get(urlapi + this.url + '/getdata/' + this.item.id).then(res => {
                res.data.forEach(it => {
                  sup.forEach(su => {
                    if (it.supplie_id === su.typesupplie) { su.data = it.cant }
                  })
                  let or = this.getarray(it.orders)
                  or.forEach(o => {
                    this.stock.forEach(s => {
                      if (s.id === o) this.addstock.push(s)
                    })
                  })
                })
                this.supplies = sup
              })
              this.getarrayorders()
            }
            this.flag = true
          })
          break
        case 2:
          break
        case 3:
          this.showers = []
          break
        case 4:
          this.showers = []
          break
        default:
      }
    },
    save () {
      this.item.caliber = this.selectcaliber.id
      this.axios({
        method: this.act,
        url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
        data: {item: this.item, data: this.getssupplies()}
      }).then(response => {
        this.$toasted.success(response.data)
        this.$emit('getclosepacking')
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    getarrayorders () {
      let aux = this.getarray(this.item.orderslist)
      let arrayfinal = []
      aux.forEach(its => {
        arrayfinal.push(parseInt(its))
        this.orders.forEach(it => {
          if (it.id === parseInt(its)) {
            this.orders_select.push(it)
          }
        })
      })
      this.item.orders = arrayfinal
    },
    closes () {
      this.$emit('getclosepacking')
    },
    getarray: getarraydata,
    valnumber: valid
  }
}
</script>

<style lang="css">
.bk {
  background-color: rgba(189, 87, 87, 0.6);
}
</style>
