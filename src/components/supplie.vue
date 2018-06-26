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
                <datepicker :value="item.datesupplie" input-class="form-control input-sm" language="es" v-model="item.datesupplie" :format="format"></datepicker>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Lote de producto</label>
                <input  class="form-control input-sm" v-model="item.batch">
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
              <div class="form-group">
                <label >Lote planta</label>
                <input disabled class="form-control input-sm" v-model="item.batchcode">
              </div>
            </div>
            <div class="col-lg-3 col-md-5 col-sm-6 col-xs-12">
              <div class="form-group">
                <label >Tipo de insumo</label>
                <vselect label="name" :options="typesupplies" v-model="typesupplie"></vselect>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
               <div class="form-group">
                <label >Cantidad</label>
                <input type="text" class="form-control input-sm" v-model="item.cant"  @keydown="valnumber($event)">
               </div>
            </div>
             <div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">
               <div class="form-group input-group-sm">
                 <label >Cliente</label>
                   <vselect label="name" :options="clients" v-model="client_select"></vselect>
               </div>
             </div>
             <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
               <div class="form-group">
                 <label >Guia</label>
                   <input type="text" class="form-control input-sm" v-model="item.guide" >
               </div>
             </div>
             <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <div class="form-group">
                 <label>Nota</label>
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
    </div>
    <div class="panel-footer">
         <button  class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
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
  name: 'supplie',
  props: ['order'],
  data () {
    return {
      file: null,
      formData: 0,
      scan: null,
      client_select: null,
      typesupplie: null,
      title: '',
      clients: [],
      typesupplies: [],
      format: 'dd-MM-yyyy',
      act: this.order.act,
      item: {
        batch: this.order.batch,
        batchcode: this.order.batchcode,
        datesupplie: this.order.datesupplie,
        guide: this.order.guide,
        client_id: this.order.client_id,
        supplie_id: this.order.typesupplie_id,
        cant: this.order.cant,
        note: this.order.note
      },
      newview: false,
      url: '/supplies',
      philtres: {batch: ''},
      items: {
        field: 'datesupplie',
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
  watch: {
    'typesupplie.code': function () {
      if (this.act !== 'put') {
        this.item.batchcode = this.typesupplie.code + '-' + dateconvert(this.item.datesupplie, 'fullrevert') + '-' + this.item.batch
        this.item.supplie_id = this.typesupplie.id
      }
    },
    'item.batch': function () {
      if (this.typesupplie !== null) this.item.batchcode = this.typesupplie.code + '-' + dateconvert(this.item.datesupplie, 'fullrevert') + '-' + this.item.batch
    },
    'act': function () {
      if (this.order.act === 'put') {
        // get client -------
        this.clients.forEach(it => {
          if (it.id === this.item.client_id) { this.client_select = it }
        })
        this.typesupplies.forEach(it => {
          if (it.id === this.item.typesupplie_id) { this.typesupplie = it }
        })
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
            if (it.id === this.item.supplie_id) { this.typesupplie = it }
          })
        }
      })
    },
    save () {
      this.item.client_id = this.client_select != null ? this.client_select.id : 0
      this.item.supplie_id = this.typesupplie != null ? this.typesupplie.id : 0
      if (this.item.supplie_id_id !== 0 && this.item.supplie_id !== '' && this.item.guide !== '' && this.item.batch !== '') {
        this.axios({ // guardar orden
          method: this.act,
          url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
          data: {sup: this.item}
        }).then(response => {
          this.formData.append('folio', this.item.batch)
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
          this.$toasted.success(response.data.msj)
          this.$emit('getclose')
        }).catch(e => {
          this.$toasted.error(e.response.data)
        })
      } else {
        this.$toasted.info('Datos erroneos o incompletos!')
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
</style>
