<template lang="html">
  <div class="">
    <p class="text-justify"><samp class="txtblack">AYUDA:</samp> Modulo para asignar productores a clientes".<br>
    <hr>
    <p class="leyenda text-justify"> REGISTRO DE PRODUCTORES DE UN CLIENTE</p>
    <hr>
    <div class="row">
       <div class="col-lg-5 col-md-6 col-sm-6 col-xs-12">
          <div class="panel panel-default pnl">
              <div class="panel-heading pnl-heading-fix">
                  <div class="row rowheader">
                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">Listado de productores</div>
                    <div class="col-lg-2 col-md-2 col-sm2 col-xs-2"> </div>
                 </div>
              </div>
            <div class="panel-body pnl-body-fix-t">
              <div class="row rowset" v-for="entity in list" :key="entity.id">
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">{{entity.name}}</div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <button class="btn btn-primary btn-xs" @click="add(entity)"><i class="fa fa-plus"></i></button>
                </div>
              </div>
            </div>
            <div class="panel-footer pnl-footer-fix">
              <div class="row">
                 <div class="col-lg-9 col-md-6 col-sm-6 col-xs-6 ">
                 <paginator :tpage="totalpage" :pager="pager" v-on:getresult="getlist"></paginator>
                 </div>
                 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                 </div>
              </div>
            </div>
          </div>
     </div>
     <div class="col-lg-5 col-md-6 col-sm-6 col-xs-12">
        <div class="panel panel-default pnl">
            <div class="panel-heading pnl-heading-fix-t">
                <div class="row rowheader">
                  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">Productores de {{client.name}}</div>
                  <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"> </div>
               </div>
            </div>
          <div class="panel-body pnl-body-fix-t">
            <div class="row rowset" v-for="pro in producers" :key="pro.id">
              <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">{{pro.name}}</div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                <button class="btn btn-danger btn-xs" @click="del(pro)"><i class="fa fa-eraser"></i></button>
              </div>
            </div>
          </div>
          <div class="panel-footer pnl-footer-fix-t">
            <div class="row">
               <div class="col-lg-9 col-md-6 col-sm-6 col-xs-6 ">
               <!--<paginator :tpage="totalpage" :pager="pager" v-on:getresult="getlist"></paginator> -->
               </div>
               <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 text-right">
                 <button type="button" class="btn btn-success btn-sm" @click="save()">Guardar</button>
               </div>
            </div>
          </div>
        </div>
   </div>
    </div>
    <button type="button" class="btn btn-default btn-sm" @click="close()"><i class="fa fa-arrow-left"></i> Regresar</button>
    <spinner :show="showspinner" :styles="stylespiner"></spinner>
  </div>
</template>

<script>
import spinner from '@/components/spinner'
import paginator from '@/components/paginator'
import {spin, urlapi} from '@/tools'
export default {
  name: 'clientproducer',
  props: ['client'],
  data () {
    return {
      pro: '',
      entity: '',
      title: '',
      itemkill: {},
      list: [],
      producers: [],
      full: [],
      act: 'post',
      item: {
        code: 0,
        name: '',
        email: '',
        address: '',
        phone: '',
        type_id: 1
      },
      newview: false,
      url: '/clients/producers',
      filters: {
        name: ''
      },
      orders: {
        field: 'date',
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
  components: {
    paginator, spinner
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist (pFil, pOrder, pPager) {
      this.showspinner = true
      if (pFil !== undefined) { this.filters = pFil }
      if (pOrder !== undefined) { this.orders = pOrder }
      if (pPager !== undefined) { this.pager = pPager }
      this.axios({ // obtener ordenes
        method: 'get',
        url: urlapi + this.url,
        params: {start: this.pager.page - 1, take: this.pager.recordpage, filters: this.filters, orders: this.orders}
      }).then(response => {
        this.list = response.data.list
        this.full = response.data.producers
        this.getdetails()
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
    add (item) {
      let exis = this.producers.find(pro => { return pro.id === item.id })
      if (exis === undefined) {
        this.producers.push(JSON.parse(JSON.stringify(item)))
      } else {
        this.$toasted.info('Ya existe el productor en su lista')
      }
    },
    del (item) {
      this.producers = window._.without(this.producers, item)
    },
    save () {
      let dat = {
        producers: this.producers.map(it => {
          return it.id
        }),
        id: this.client.id
      }
      this.axios.post(urlapi + this.url + '/set', dat).then(response => {
        this.$toasted.success(response.data)
      })
    },
    getdetails () {
      this.producers = []
      this.axios.get(urlapi + this.url + '/get/' + this.client.id).then(response => {
        let dat = response.data
        dat.forEach(it => {
          this.full.forEach(pro => {
            if (pro.id === it.producer_id) {
              this.producers.push(pro)
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="css">
</style>
