<template>
 <div class="row">
   <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
     <div class="panel panel-default">
       <div class="panel-heading pnl-heading-fix-t">
        Lista de informes
       </div>
       <div class="panel-body" style="padding: 2px 10px 2px 10px">
             <form action="" class="form-inline">
                <label><input type="radio" name="op" :value="1" v-model="setinfo"> CALIBRADOS EN BODEGA</label><br>
                <label><input type="radio" name="op" :value="2" v-model="setinfo"> RECEPCIONES</label><br>
               <label><input type="radio" name="op" :value="3" v-model="setinfo"> STOCK DE MATERIA PRIMA</label><br>
               <label><input type="radio" name="op" :value="4" v-model="setinfo"> INVENTARIO DE BINS</label>
              </form>
       </div>
       <div class="panel-footer">
       </div>
     </div>
   </div>
    <div v-if="setinfo === 2" class="col-lg-6 col-md-8 col-sm-12 col-xs-12">
      <div class="panel panel-default">
        <div class="panel-heading" style="color:black">INFORMES DE RECEPCIÓN</div>
        <div class="panel-body">
          <div class="form-group form-group-sm">
            <label class="control-label">Materia prima</label>
            <vselect multiple label="name" :options="materia" v-model="materia_select"></vselect>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label">Clientes</label>
            <vselect multiple label="name" :options="clients" v-model="client_select"></vselect>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label">Productores</label>
            <vselect multiple label="name" :options="producers" v-model="producer_select"></vselect>
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label">Lotes</label>
            <vselect multiple label="name" :options="batchs" v-model="batch_select"></vselect>
          </div>
        </div>
        <div class="panel-footer">
          <button class="btn btn-info" @click="getInfoRecep(1)"> <i class="fa fa-file-pdf-o"></i></button>
          <button class="btn btn-success" @click="getInfoRecep(2)"><i class="fa fa-file-excel-o"></i></button>
        </div>
      </div>
    </div>

   <div class="modal fade"  id="view_doc" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="z-index: 1060">
     <div class="modal-dialog modal-lg">
       <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
           <h6 class="modal-title">Visor información</h6>
         </div>
         <div class="modal-body" >
             <iframe id="iframeive" src="" height="100%" width="100%" frameborder="0"></iframe>
         </div>
         <div class="modal-footer">
           <button class="btn btn-default btn-sm" data-dismiss="modal">Cerrar</button>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import vselect from 'vue-select'
import {urlapi} from '@/tools'
export default {
  name: 'reports',
  components: {
    vselect
  },
  data () {
    return {
      setinfo: 2,
      clients: [],
      producers: [],
      batchs: [],
      client_select: null,
      producer_select: null,
      batch_select: null,
      materia: [{id: 1, name: 'Calibrada Externa'}, {id: 2, name: 'No calibrada'}, {id: 3, name: 'Calibrada Planta'}],
      materia_select: null,
      inforecep: {
        materia_id: 0
      }
    }
  },
  watch: {
    'client_select': 'getproducer',
    'materia_select': 'getbatchs',
    'producer_select': 'getbatchs'
  },
  mounted () {
    this.getclients()
    this.getbatchs()
  },
  methods: {
    getclients () {
      this.axios.get(urlapi + '/clients/getclients').then(response => {
        this.clients = response.data
      })
    },
    getproducer () {
      if (this.client_select != null && this.client_select.length > 0) {
        let clientIDS = {
          ids: this.client_select.map(it => it.id)
        }
        this.axios.get(urlapi + '/clients/producers/get', { params: clientIDS }).then(response => {
          this.producers = response.data
          this.producer_select = null
          this.getbatchs()
        })
      } else {
        this.producer_select = null
      }
    },
    getbatchs () {
      let IDS = {
        clientids: this.client_select !== null && this.client_select.length > 0 ? this.client_select.map(it => parseInt(it.id)) : 0,
        producerids: this.producer_select !== null && this.producer_select.length > 0 ? this.producer_select.map(it => it.id) : 0,
        materiaids: this.materia_select !== null && this.materia_select.length > 0 ? this.materia_select.map(it => parseInt(it.id)) : 0
      }
      this.axios.get(urlapi + '/info/getbatchs', { params: IDS }).then(response => {
        this.batchs = response.data
      })
    },
    getInfoRecep (op) {
      let IDS = {
        clientids: this.client_select !== null && this.client_select.length > 0 ? this.client_select.map(it => parseInt(it.id)) : 0,
        producerids: this.producer_select !== null && this.producer_select.length > 0 ? this.producer_select.map(it => it.id) : 0,
        materiaids: this.materia_select !== null && this.materia_select.length > 0 ? this.materia_select.map(it => parseInt(it.id)) : 0,
        batchsids: this.batch_select !== null && this.batch_select.length > 0 ? this.batch_select.map(it => parseInt(it.id)) : 0,
        option: op
      }
      this.axios.get(urlapi + '/info/inforecep', { params: IDS }).then(response => {
        window.$('#view_doc .modal-body').height(450)
        window.$('#view_doc .modal-dialog').width(620)
        window.$('#iframeive').attr('src', response.data)
        window.$('#view_doc').modal('show')
      })
    }
  }
}
</script>

<style scoped>

</style>
