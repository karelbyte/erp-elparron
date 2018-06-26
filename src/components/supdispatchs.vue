<template lang="html">
  <div class="panel panel-default">
    <div class="panel-heading pnl-heading-fix-t">
       {{title}}
    </div>
    <div class="panel-body">
          <div class="row">
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Fecha</label>
                <datepicker :value="item.datedispatch" input-class="form-control input-sm" language="es" v-model="item.datedispatch" :format="format"></datepicker>
              </div>
            </div>
              <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                <div class="form-group">
                  <label >Tipo</label>
                 <select class="form-control input-sm" v-model="item.type_id">
                  <option v-for="tor in types" :key="tor.id" :value="tor.id">{{tor.name}}</option>
                </select>
                </div>
              </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Folio</label>
                <input disabled class="form-control input-sm" v-model="item.batchcode">
              </div>
            </div>
             <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
               <div class="form-group input-group-sm">
                 <label >Cliente</label>
                   <vselect label="name" :options="clients" v-model="client_select"></vselect>
               </div>
             </div>
             <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
               <div class="form-group">
                 <label >Tipo de insumo</label>
                 <vselect label="name" :options="typesupplies" v-model="typesupplie"></vselect>
               </div>
             </div>
             <div class="col-lg-5 col-md-6 col-sm-7 col-xs-12">
               <div class="form-group">
                 <label >Inventario de lotes</label>
                 <vselect label="batch" :options="stocksorders" v-model="orders_select"></vselect>
               </div>
             </div>
           </div>
           <div class="row">
             <div class="col-lg-5 col-md-5 col-sm-8 col-xs-12">
               <div class="panel panel-default" >
                 <div class="panel-heading" style="color:black; padding:2px 0 2px 15px">
                   Insumo
                 </div>
                 <div class="panel-body">
                   <div v-if="orders_select !== null" class="">
                       <label >Fecha: {{orders_select.datesupplie}}</label><br>
                       <label >Lote producto: {{orders_select.batch}}</label><br>
                       <label >Lote planta: {{orders_select.batchcode}}</label><br>
                       <label >Existencia: {{orders_select.realcant}}</label>
                   </div>
                 </div>
               </div>
             </div>
           </div>
             <div class="row">
               <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                 <div class="form-group">
                   <label >Cantidad</label>
                   <input type="text" class="form-control input-sm" v-model="item.cant"  :class="{alerts: item.cant > orders_select.realcant}" @keydown="valnumber($event)">
                 </div>
               </div>
               <div v-if="item.type_id === 2" class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                 <div class="form-group input-group-sm">
                   <label >Cliente destino</label>
                     <vselect label="name" :options="clients" v-model="client_select_destini"></vselect>
                 </div>
               </div>
               <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                 <div class="form-group">
                   <label >Nota</label>
                   <input type="text" class="form-control input-sm" v-model="item.note">
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
         <button v-if="item.type_id > 0" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
         <button class="btn btn-default btn-sm" @click="close()"> Cerrar</button>
    </div>
  </div>
</template>

<script>
import {spin, urlapi, dateconvert, valid, getdescrip} from '../tools'
import datepicker from 'vuejs-datepicker'
import paginator from '@/components/paginator'
import spinner from '@/components/spinner'
import find from '@/components/find'
import deletes from '@/components/deletes'
import vselect from 'vue-select'
export default {
  name: 'supdispatchs',
  props: ['order'],
  data () {
    return {
      file: null,
      formData: 0,
      scan: null,
      tor: '',
      types: [{id: 1, name: 'Despacho'}, {id: 2, name: 'Traspaso interno'}],
      client_select: null,
      client_select_destini: null,
      orders_select: 0,
      typesupplie: null,
      title: 'Despacho de insumos',
      clients: [],
      typesupplies: [],
      stocksorders: [],
      format: 'dd-MM-yyyy',
      act: this.order.act,
      item: {
        batchcode: this.order.batchcode,
        datedispatch: this.order.datedispatch,
        typesupplie_id: this.order.typesupplie_id,
        type_id: this.order.type_id,
        client_id: this.order.client_id,
        order: this.order.order,
        cant: this.order.cant,
        destination_client_id: this.order.destination_client_id,
        note: this.order.note
      },
      url: '/suppliesdispatchs',
      showspinner: false,
      stylespiner: spin
    }
  },
  components: {
    datepicker, paginator, spinner, deletes, vselect, find
  },
  mounted () {
    this.formData = new FormData()
    this.getlist()
  },
  watch: {
    'client_select': function () {
      if (this.typesupplie !== null && this.client_select !== null) {
        this.axios.get(urlapi + this.url + '/orders/' + this.client_select.id + '/' + this.typesupplie.id).then(response => {
          this.stocksorders = null
          this.stocksorders = response.data
        })
      }
    },
    'typesupplie': function () {
      if (this.typesupplie !== null && this.client_select !== null) {
        this.axios.get(urlapi + this.url + '/orders/' + this.client_select.id + '/' + this.typesupplie.id).then(response => {
          this.stocksorders = null
          this.stocksorders = response.data
          if (this.act === 'put') {
            this.stocksorders.forEach(it => {
              if (it.id === this.item.order) { this.orders_select = it }
            })
          }
        })
      }
    },
    'orders_select': function () {
      if (this.orders_select !== null && this.orders_select !== 0) {
        this.item.batchcode = (this.item.type_id === 1 ? 'D-' : 'T-') + this.orders_select.batch + '-' + dateconvert(this.item.datedispatch, 'fullrevert')
      } else this.item.batchcode = ''
    },
    'item.type_id': function () {
      if (this.orders_select !== null && this.orders_select !== 0) {
        this.item.batchcode = (this.item.type_id === 1 ? 'D-' : 'T-') + this.orders_select.batch + '-' + dateconvert(this.item.datedispatch, 'fullrevert')
      } else this.item.batchcode = ''
    }
  },
  methods: {
    descrip: getdescrip,
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
    valnumber: valid,
    getlist () {
      this.axios.get(urlapi + this.url + '/utils').then(response => {
        this.clients = response.data.clients
        this.typesupplies = response.data.typesupplies
        if (this.order.act === 'put') {
          this.item.id = this.order.id
          // get client -------
          this.clients.forEach(it => {
            if (it.id === this.item.client_id) { this.client_select = it }
          })
          this.typesupplies.forEach(it => {
            if (it.id === this.item.typesupplie_id) { this.typesupplie = it }
          })
        }
      })
    },
    save () {
      if (this.item.cant > this.orders_select.realcant) {
        this.$toasted.info('Cantidades mayores que existencias!')
      } else {
        this.item.client_id = this.client_select !== null ? this.client_select.id : 0
        this.item.order = this.orders_select !== null ? this.orders_select.id : 0
        this.item.typesupplie_id = this.typesupplie !== null ? this.typesupplie.id : 0
        this.item.destination_client_id = this.client_select_destini != null ? this.client_select_destini.id : 0
        this.item.note = this.item.note !== '' && this.item.note !== 'undefined' ? this.item.note : '-'
        if (this.item.typesupplie_id !== 0 && this.item.client_id !== 0 && this.item.order !== 0 && this.item.cant !== 0) {
          this.axios({ // guardar orden
            method: this.act,
            url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
            data: this.item
          }).then(response => {
            this.$toasted.success(response.data.msj)
            this.formData.append('folio', this.item.batchcode)
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
.alerts {
  background-color:rgba(124, 64, 75, 0.55);
}
</style>
