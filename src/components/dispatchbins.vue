<template lang="html">
  <div class="panel panel-default">
    <div class="panel-heading pnl-heading-fix-t">
       {{title}}
    </div>
    <div class="panel-body">
        <div class="">
          <div class="row">
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Fecha</label>
                <datepicker :value="item.dispatchdate" input-class="form-control input-sm" language="es" v-model="item.dispatchdate" :format="format"></datepicker>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Tipo</label>
               <select class="form-control input-sm" v-model="item.type_id">
                <option v-for="tor in types" :key="tor.id" :value="tor.id" >{{tor.name}}</option>
              </select>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Guia despacho</label>
                <input  class="form-control input-sm" v-model="item.folio">
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">
              <div class="form-group input-group-sm">
                <label >Dueño</label>
                  <vselect label="name" :options="clients" v-model="owner_select"></vselect>
              </div>
            </div>
            <div v-if="item.type_id === 3" class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Ordenes</label>
               <select class="form-control input-sm" v-model="item.order_id">
                <option v-for="or in orders" :key="or.id" :value="or.id" >{{or.folio}}</option>
              </select>
              </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="form-group">
                <label >Nota</label>
                <input type="text" class="form-control input-sm" v-model="item.note">
              </div>
            </div>
          </div>
          <div v-if="item.type_id !== 3">
            Bins en inventario
            <hr>
            <div class="row rowheader txtblack">
              <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Tipo </div>
            <!--  <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Marca</div>
              <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Estado</div> -->
              <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Cantidad</div>
              <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">Despachar </div>
           </div>
           <div v-for="itn in list" :key="itn.id" class="row rowheader" style="margin: 5px 0 5px 0" >
             <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{descrip(itn.type_id, 'typebins')}}</div>
            <!-- <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{itn.binsmark}}</div>
             <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{descrip(itn.status, 'status')}}</div> -->
             <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6" :class="{'errorred': itn.cant < itn.dis}">{{itn.cant}}</div>
             <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">
               <!-- <button type="button" class="btn btn-danger btn-xs" @click="kill(itn)">
                  <i class="fa fa-eraser"></i>
                </button> -->
                <input type="text" v-model="itn.dis"  @keydown="valnumber($event)">
             </div>
          </div>
        </div>
         <div v-if="item.type_id === 2">
           <hr>
           <div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">
             <div class="form-group input-group-sm">
               <label >Destino</label>
                 <vselect label="name" :options="clients" v-model="destini_select"></vselect>
             </div>
           </div>
         </div>
        </div>
     <div class="row" style="margin-top: 20px">
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
         <button  v-if="good" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
         <button class="btn btn-default btn-sm" @click="close()"> Cerrar</button>
    </div>
  </div>
</template>

<script>
import {spin, urlapi, valid, getdescrip} from '../tools'
import datepicker from 'vuejs-datepicker'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import find from '@/components/find'
import deletes from '@/components/deletes'
import vselect from 'vue-select'
export default {
  name: 'dispatchbins',
  props: ['order'],
  data () {
    return {
      formData: 0,
      scan: '',
      file: null,
      good: false,
      cants: [],
      types: [{id: 1, name: 'Despacho'}, {id: 2, name: 'Tras. interno'}],
      typebins: [{id: 1, name: 'Madera'}, {id: 2, name: 'Plastico'}],
      status: [{id: 1, name: 'Bueno'}, {id: 2, name: 'Regular'}, {id: 3, name: 'Malo'}],
      client_select: null,
      producer_select: null,
      owner_select: null,
      destini_select: null,
      title: '',
      clients: [],
      list: [],
      orders: [],
      format: 'dd-MM-yyyy',
      act: this.order.act,
      item: {
        folio: this.order.folio,
        dispatchdate: this.order.dispatchdate,
        type_id: this.order.type_id,
        owner_id: this.order.owner_id,
        note: this.order.note,
        destination_client_id: this.order.destination_client_id,
        order_id: this.order.order_id,
        scan: ''
      },
      dte: {
        type_id: 0,
        binsmark: '',
        status: 0,
        cant: 0,
        code: ''
      },
      newview: false,
      url: '/binsemptysdispatch',
      showspinner: false,
      stylespiner: spin
    }
  },
  watch: {
    'owner_select': function () {
      if (this.owner_select !== null) {
        if (this.item.type_id === 3) {
          this.axios.get(urlapi + this.url + '/orders/' + this.owner_select.id).then(res => {
            this.orders = res.data.orders
            this.good = true
          })
        } else {
          this.axios.get(urlapi + this.url + '/datastore/' + this.owner_select.id).then(res => {
            let listaux = res.data
            this.good = true
            if (this.act === 'put') {
              this.axios.get(urlapi + this.url + '/data/' + this.order.id).then(res => {
                let dta = res.data
                dta.forEach(it => {
                  listaux.forEach(l => {
                    if (it.bins_id === l.id) { l.dis = it.dis }
                  })
                })
                this.list = listaux
              })
            } else { this.list = listaux }
          })
        }
      } else {
        this.list = []
        this.good = false
      }
    }
  },
  components: {
    datepicker, paginator, spinner, deletes, vselect, find
  },
  mounted () {
    this.formData = new FormData()
    this.getlist()
  },
  methods: {
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
    descrip: getdescrip,
    valnumber: valid,
    pass () {
      let exis = false
      let dis = 0
      this.list.forEach(itm => {
        if (itm.dis === undefined) { itm.dis = 0 }
        dis += parseInt(itm.dis)
        if (itm.cant < itm.dis) {
          exis = true
        }
      })
      if (dis === 0) { exis = true }
      return exis
    },
    getlist () {
      this.axios.get(urlapi + this.url + '/utils').then(response => {
        this.clients = response.data.clients
        if (this.order.act === 'put') {
          this.item.id = this.order.id
          // get client -------
          this.clients.forEach(it => {
            if (it.id === this.item.owner_id) { this.owner_select = it }
            if (it.id === this.item.destination_client_id) { this.destini_select = it }
          })
        }
      })
    },
    save () {
      /* this.item.client_id = this.client_select != null ? this.client_select.id : 0
      this.item.producer_id = this.producer_select != null ? this.producer_select.id : 0 */
      this.item.owner_id = this.owner_select != null ? this.owner_select.id : 0
      this.item.destination_client_id = this.destini_select != null ? this.destini_select.id : 0
      if (this.item.type_id === 2 && this.item.destination_client_id === 0) {
        this.$toasted.info('No se ha definido el destino de los bins!')
      } else {
        if (this.item.owner_id !== 0 && this.item.folio && !this.pass()) {
          this.axios({ // guardar orden
            method: this.act,
            url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
            data: {item: this.item, data: this.list}
          }).then(response => {
            this.$toasted.success(response.data.mjs)
            this.formData.append('folio', this.item.folio)
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
            this.$emit('getclose')
          }).catch(e => {
            this.$toasted.error(e.response.data)
          })
        } else {
          this.$toasted.info('Datos erroneos o incompletos!')
        }
      }
    },
    close () {
      this.$emit('getclose')
    }
  }
}
</script>

<style lang="css">

.panelf {
  margin-bottom: 4px
}
.errorred {
  background-color: rgb(198, 65, 46);
  color:black
}
</style>
