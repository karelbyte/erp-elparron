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
                <datepicker :value="item.recepdate" input-class="form-control input-sm" language="es" v-model="item.recepdate" :format="format"></datepicker>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Guía recepción</label>
                <input  class="form-control input-sm" v-model="item.folio">
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">
              <div class="form-group input-group-sm">
                <label >Cliente</label>
                  <vselect label="name" :options="clients" v-model="client_select"></vselect>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">
              <div class="form-group input-group-sm">
                <label >Dueño</label>
                  <vselect label="name" :options="clients" v-model="owner_select"></vselect>
              </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="form-group">
                <label >Nota</label>
                <input type="text" class="form-control input-sm" v-model="item.note">
              </div>
            </div>
          </div>
             <hr>
             <div class="row">
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group input-group-sm">
                <label >Tipo</label>
                 <select class="form-control" name="" v-model="dte.type_id">
                     <option v-for="ty in typebins" :key="ty.id" :value="ty.id"> {{ty.name}}</option>
                 </select>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
              <div class="form-group">
                <label >Marca</label>
                <input type="text" class="form-control input-sm" v-model="dte.binsmark" placeholder="">
              </div>
           </div>
           <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
             <div class="form-group input-group-sm">
               <label >Estado</label>
                <select class="form-control" name="" v-model="dte.status">
                    <option v-for="st in status" :key="st.id" :value="st.id"> {{st.name}}</option>
                </select>
             </div>
           </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
               <div class="form-group">
                <label >Cantidad</label>
                <input type="text" class="form-control input-sm" v-model="dte.cant"  @keydown="valnumber($event)">
               </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12" style="padding-top:23px">
              <button type="button" class="btn btn-warning btn-sm" @click="add()">
                Añadir
              </button>
            </div>
           </div>
           <hr>
           <div class="row rowheader txtblack">
             <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Tipo </div>
             <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Marca</div>
             <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Estado</div>
             <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">Cantidad</div>
             <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">Acciones </div>
          </div>
          <div v-for="itn in list" :key="itn.id" class="row rowheader" style="margin: 5px 0 5px 0">
            <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{descrip(itn.type_id, 'typebins')}}</div>
            <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{itn.binsmark}}</div>
            <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{descrip(itn.status, 'status')}}</div>
            <div class="col-lg-1 col-md-2 col-sm-2 col-xs-6">{{itn.cant}}</div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-xs-6">
               <button type="button" class="btn btn-danger btn-xs" @click="kill(itn)">
                 <i class="fa fa-eraser"></i>
               </button>
            </div>
         </div>
         <hr>
         <div class="form-group">
           <label >Buscar doc guía</label>
           <input type="file" class="btn btn-default btn-sm" @change="getfile($event)" accept="image/*" name="file" id="file">
         </div>
         <div v-if="item.scan !== null" class="form-group">
           <label >Guia: {{item.scan}}</label>
         </div>
        </div>
    </div>
    <div class="panel-footer">
         <button  v-if="list.length > 0" class="btn btn-success btn-fix btn-sm" @click="save()"> Guadar</button>
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
  name: 'recepbins',
  props: ['order'],
  data () {
    return {
      itn: '',
      ty: '',
      st: '',
      file: null,
      formData: 0,
      typebins: [{id: 1, name: 'Madera'}, {id: 2, name: 'Plastico'}],
      status: [{id: 1, name: 'Bueno'}, {id: 2, name: 'Regular'}, {id: 3, name: 'Malo'}],
      client_select: null,
      producer_select: null,
      owner_select: null,
      title: '',
      clients: [],
      list: [],
      format: 'dd-MM-yyyy',
      act: this.order.act,
      item: {
        id: this.order.id,
        folio: this.order.folio,
        recepdate: this.order.recepdate,
        client_id: this.order.client_id,
        producer_id: this.order.producer_id,
        owner_id: this.order.owner_id,
        cant: this.order.cant,
        note: this.order.note,
        scan: this.order.scan
      },
      dte: {
        type_id: 0,
        binsmark: '',
        status: 0,
        cant: 0,
        code: ''
      },
      newview: false,
      url: '/binsemptys',
      showspinner: false,
      stylespiner: spin
    }
  },
  watch: {
    'act': function () {
      if (this.order.act === 'put') {
        // get client -------
        this.clients.forEach(it => {
          if (it.id === this.item.client_id) { this.client_select = it }
          if (it.id === this.item.producer_id) { this.producer_select = it }
          if (it.id === this.item.owner_id) { this.owner_select = it }
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
    savefile () {
      this.formData.append('name', this.item.folio)
      this.axios.post(urlapi + this.url + '/savefile', this.formData)
    },
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
    getcode (it) {
      return it.type_id + it.binsmark + it.status
    },
    kill (itm) {
      this.list = this.list.filter(function (n) {
        return n.code !== itm.code
      })
    },
    pass (it) {
      let exis = false
      this.list.forEach(itm => {
        if (itm.type_id === it.type_id && itm.binsmark === it.binsmark && itm.status === it.status) {
          itm.cant = parseInt(itm.cant) + parseInt(it.cant)
          exis = true
        }
      })
      return exis
    },
    add () {
      if ((this.dte.type_id !== 0) && (this.dte.cant !== 0)) {
        let itm = JSON.parse(JSON.stringify(this.dte))
        itm.code = this.getcode(itm)
        if (window._.indexOf(this.list, itm) === -1 && !this.pass(itm)) {
          this.list.push(itm)
          this.dte.cant = 0
          this.dte.binsmark = ''
        }
      }
    },
    getlist () {
      this.axios.get(urlapi + this.url + '/data/' + this.order.id).then(res => {
        this.list = res.data
      })
      this.axios.get(urlapi + this.url + '/utils').then(response => {
        this.clients = response.data.clients
        if (this.order.act === 'put') {
          this.item.id = this.order.id
          // get client -------
          this.clients.forEach(it => {
            if (it.id === this.item.client_id) { this.client_select = it }
            if (it.id === this.item.producer_id) { this.producer_select = it }
            if (it.id === this.item.owner_id) { this.owner_select = it }
          })
        }
      })
    },
    save () {
      this.item.client_id = this.client_select != null ? this.client_select.id : 0
      this.item.producer_id = this.producer_select != null ? this.producer_select.id : 0
      this.item.owner_id = this.owner_select != null ? this.owner_select.id : 0
      if (this.item.client_id !== 0 && this.item.owner_id) {
        this.axios({ // guardar orden
          method: this.act,
          url: urlapi + this.url + (this.act === 'post' ? '' : '/' + this.item.id),
          data: {item: this.item, data: this.list}
        }).then(response => {
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
