<template lang="html">
  <div class="">
    <p class="text-justify"><samp class="txtblack">AYUDA:</samp>Modulo para configurar datos generales del sistema, modifique y guarde.<br>
    <hr>
  <ul class="nav nav-tabs" role="tablist">
   <li role="presentation" class="active"><a href="#cargos" aria-controls="cargos" role="tab" data-toggle="tab">Cargos</a></li>
   <li role="presentation"><a href="#taras" aria-controls="taras" role="tab" data-toggle="tab">Pesos taras</a></li>
   <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">% de diferencia</a></li>
   <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Clasificación de bins</a></li>
  <!-- <li role="presentation"><a href="#box" aria-controls="box" role="tab" data-toggle="tab">Cajas</a></li>  -->
   <li role="presentation"><a href="#supplies" aria-controls="supplies" role="tab" data-toggle="tab">Insumos</a></li>
   <li role="presentation"><a href="#boxclient" aria-controls="boxclient" role="tab" data-toggle="tab">Cajas x clientes</a></li>
   <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Insumos por procesos</a></li>
   <li role="presentation"><a href="#optimo" aria-controls="optimo" role="tab" data-toggle="tab">% de rendimiento óptimo</a></li>
 </ul>
 <!-- Tab panes -->
 <div class="tab-content">
   <div role="tabpanel" class="tab-pane active" id="cargos" style="margin-top: 5px">
         <div class="panel panel-default ">
           <div class="panel-heading pnl-heading-fix-t">
             Añadir cargo
           </div>
           <div class="panel-body">
             <div class="row" style="margin-top: 5px">
               <div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">
                 <div class="panel panel-default">
                   <div class="panel-heading pnl-heading-fix-t"> AÑADIR CARGO</div>
                   <div class="panel-body">
                     <div class="form-group">
                       <label >Descripcion</label>
                       <input v-model="rank.name" class="form-control input-sm">
                     </div>
                   </div>
                 </div>
               </div>
               <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                 CARGOS DE LA EMPRESA
                   <div v-for="rank in ranks" :key="rank.id" class="row rowset">
                     <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                       {{rank.name}}
                     </div>
                     <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                       <a class="btn btn-success btn-xs" @click="setrank(rank)"> <i class="fa fa-edit"></i></a>
                       <a class="btn btn-danger btn-xs" @click="delrank(rank.id)"> <i class="fa fa-eraser"></i></a>
                     </div>
                   </div>
               </div>
             </div>
           </div>
           <div class="panel-footer">
             <button class="btn btn-success btn-sm" @click="saverank()">Guardar</button>
           </div>
     </div>
   </div>
   <div role="tabpanel" class="tab-pane" id="taras">
    <div class="row" style="margin-top: 5px">
      <div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">
         <div class="panel panel-default ">
           <div class="panel-heading pnl-heading-fix-t">
             Pesos de las taras
           </div>
           <div class="panel-body">
              <div class="form-group">
                <label >Madera</label>
                <input v-model="taras[0].weight" class="form-control input-sm" placeholder="kg">
              </div>
              <div class="form-group">
                <label >Plastico</label>
                <input v-model="taras[1].weight" class="form-control input-sm" placeholder="kg">
              </div>
           </div>
           <div class="panel-footer">
             <button class="btn btn-success btn-sm" @click="savetaras()">Guardar</button>
           </div>
         </div>
      </div>
    </div>
   </div>
   <div role="tabpanel" class="tab-pane" id="profile">
    <div class="row" style="margin-top: 5px">
      <div class="col-lg-3 col-md-5 col-sm-6 col-xs-12">
         <div class="panel panel-default ">
           <div class="panel-heading pnl-heading-fix-t">
             % de diferencia entre recepción y calibrado
           </div>
           <div class="panel-body">
              <div class="form-group">
                <label > % de diferencia</label>
                <input v-model="percenrecepcaliber.percent" class="form-control input-sm" placeholder="%">
              </div>
           </div>
           <div class="panel-footer">
             <button class="btn btn-success btn-sm" @click="savepercentcaliber()">Guardar</button>
           </div>
         </div>
      </div>
    </div>
   </div>
   <div role="tabpanel" class="tab-pane" id="messages">
     <div class="row" style="margin-top: 5px">
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
          <div class="panel panel-default ">
            <div class="panel-heading pnl-heading-fix-t">
              Clasificación de bins calibrados
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                    <label >Desde</label>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                    <label >Hasta</label>
                </div>
                <div class="col-lg-4 col-md-5 col-sm-3 col-xs-12">
                    <label >Tendencia</label> <br>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <label >Clasificacion</label> <br>
                </div>
              </div>
              <div class="" v-for="clas in clasifications" :key="clas.id">
                <div class="row" style="padding-bottom:5px">
                  <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                      <input v-model="clas.begins" class="form-control input-sm" placeholder="kg">
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                      <input v-model="clas.ends" class="form-control input-sm" placeholder="kg">
                  </div>
                  <div class="col-lg-4 col-md-5 col-sm-3 col-xs-12">
                      <label class="txtblack">{{clas.trends}}</label>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <label class="txtblack">{{clas.clasification}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel-footer">
              <button class="btn btn-success btn-sm" @click="saveclass()">Guardar</button>
            </div>
          </div>
        </div>
     </div>
   </div>
   <div role="tabpanel" class="tab-pane" id="supplies">  <!-- insumos -->
     <div class="row" style="margin-top: 5px">
       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="panel panel-default ">
            <div class="panel-heading pnl-heading-fix-t">
            </div>
            <div class="panel-body">
              <div class="row">
                 <div class="col-lg-3 col-md-5 col-sm-6 col-xs-12">
                      <div class="panel panel-default">
                        <div class="panel-heading  pnl-heading-fix-t">
                          Agregar insumo
                        </div>
                        <div class="panel-body">
                              <div class="form-group">
                                <label >Nombre</label>
                                <input type="text" class="form-control input-sm" v-model="supp.name">
                              </div>
                              <div class="form-group">
                                <label >Medida</label>
                                <select class="form-control input-sm" v-model="supp.measure_id">
                                <option v-for="ms in measures" :key="ms.id" :value="ms.id">{{ms.name}}</option>
                              </select>
                              </div>
                              <div class="form-group">
                                <label >Código</label>
                                <input type="text" class="form-control input-sm" v-model="supp.code">
                              </div>
                              <div class="form-group">
                                <label >Tipo</label>
                              <select class="form-control input-sm" v-model="supp.generic_id">
                                <option v-for="gn in generics" :key="gn.id" :value="gn.id">{{gn.name}}</option>
                              </select>
                              </div>
                        </div>
                        <div class="panel-footer">
                             <button class="btn btn-success btn-sm" @click="SaveSupplie()">Guardar</button>
                        </div>
                      </div>
                 </div>
                 <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                  <div v-for="sup in supplies" :key="sup.id" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="panel panel-default panelf" >
                      <div class="panel-body" style="padding: 5px">
                        <div class="row txtblack">
                          <div class="col-lg-4 col-md-3 col-sm-3 col-xs-12">Nombre</div>
                          <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">Codigo</div>
                          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">Tipo </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-4 col-md-3 col-sm-3 col-xs-12">{{sup.name}}</div>
                          <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">{{sup.code}}</div>
                          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">{{descriptor(sup.generic_id, 'generics')}} </div>
                          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <button class="btn btn-success btn-xs"  @click="editsup(sup)"><i class="fa fa-edit"></i></button>
                            <button class="btn btn-danger btn-xs"  @click="delsup(sup)"><i class="fa fa-eraser"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
              </div>
            </div>
            <div class="panel-footer">
            </div>
          </div>
       </div>
     </div>
   </div>
   <div role="tabpanel" class="tab-pane" id="settings">  <!-- insumos -->
     <div class="row" style="margin-top: 5px">
       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="panel panel-default ">
            <div class="panel-heading pnl-heading-fix-t">
               Insumos por procesos
            </div>
            <div class="panel-body">
               <div class="row">
                 <div  class="col-lg-3 col-md-3 col-sm-4 col-xs-12" > <label >PROCESOS</label> </div>
                 <div  class="col-lg-9 col-md-9 col-sm-8 col-xs-12" style="border-bottom:1px solid rgba(142, 136, 124, 0.4)" > <label >INSUMOS</label></div>
               </div>
               <div class="row">
                 <div  class="col-lg-3 col-md-3 col-sm-4 col-xs-12" >
                     <div class="list-group">
                        <button v-for="paq in typepacking" :key="paq.id" @click="setpaq(paq.id)" type="button" class="list-group-item"> {{paq.name}}</button>
                    </div>
                 </div>
                 <div v-for="sup in supplies" :key="sup.id" @click="chek(paqid, sup.id)" class="module mousehand col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-top:5px">
                    <div><i class="fa" :class="{'fa-check-square-o': ischeck(paqid, sup.id), ' fa-square-o': !ischeck(paqid, sup.id) }"></i>{{ ' ' + sup.name}}</div>
                 </div>
               </div>
            </div>
            <div class="panel-footer">
              <button class="btn btn-success btn-sm" @click="SaveSupplieDiscount()">Guardar</button>
            </div>
          </div>
       </div>
     </div>
   </div>
   <div role="tabpanel" class="tab-pane" id="box">  <!-- insumos -->
     <div class="row" style="margin-top: 5px">
       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="panel panel-default ">
            <div class="panel-heading pnl-heading-fix-t">
            </div>
            <div class="panel-body">
              <div class="row">
                 <div class="col-lg-3 col-md-5 col-sm-6 col-xs-12">
                      <div class="panel panel-default">
                        <div class="panel-heading  pnl-heading-fix-t">
                          Agregar caja
                        </div>
                        <div class="panel-body">
                              <div class="form-group">
                                <label >Descripcion</label>
                                <input type="text" class="form-control input-sm" v-model="box.name">
                              </div>
                        </div>
                        <div class="panel-footer">
                             <button class="btn btn-success btn-sm" @click="savebox()">Guardar</button>
                        </div>
                      </div>
                 </div>
                 <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                  <div v-for="bo in boxs"  :key="bo.id" class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                    <div class="panel panel-default panelf" >
                      <div class="panel-body" style="padding: 5px">
                        <div class="row txtblack">
                          <div class="col-lg-8 col-md-3 col-sm-3 col-xs-12">Nombre</div>
                          <div class="col-lg-4 col-md-3 col-sm-3 col-xs-12"></div>
                        </div>
                        <div class="row">
                          <div class="col-lg-8 col-md-3 col-sm-3 col-xs-12">{{bo.name}}</div>
                          <div class="col-lg-4 col-md-3 col-sm-3 col-xs-12">
                            <button class="btn btn-success btn-xs"  @click="editbox(bo)"><i class="fa fa-edit"></i></button>
                            <button class="btn btn-danger btn-xs"  @click="delbox(bo.id)"><i class="fa fa-eraser"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
              </div>
            </div>
            <div class="panel-footer">
            </div>
          </div>
       </div>
     </div>
   </div>
   <div role="tabpanel" class="tab-pane" id="optimo">  <!-- insumos -->
     <div class="row" style="margin-top: 5px">
       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="panel panel-default ">
            <div class="panel-heading pnl-heading-fix-t">
               Cajas y clientes
            </div>
            <div class="panel-body">
               <div class="row" style="margin-bottom: 10px">
                 <div class="col-lg-1 col-md-3 col-sm-4 col-xs-12" style="text-align: right">
                   <label>Calibres</label>
                 </div>
                 <div  class="col-lg-2 col-md-3 col-sm-4 col-xs-12" >
                   <label>% de rendimiento</label>
                 </div>
               </div>
              <div class="row" v-for="cali in listcalibersnotcarozo" :key="cali.id" style="margin-bottom: 5px">
                <div  class="col-lg-1 col-md-3 col-sm-4 col-xs-12"  style="padding-top: 5px; text-align: right">
                  <label>{{cali.name}}</label>
                </div>
                <div  class="col-lg-2 col-md-3 col-sm-4 col-xs-12" >
                  <input class="form-control input-sm" v-model="cali.percent">
                </div>
              </div>
            </div>
            <div class="panel-footer">
              <button class="btn btn-success btn-sm" @click="SavePercentCalibers()">Guardar</button>
            </div>
          </div>
       </div>
     </div>
   </div>
   <div role="tabpanel" class="tab-pane" id="boxclient">  <!-- insumos -->
     <div class="row" style="margin-top: 5px">
       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <div class="panel panel-default ">
           <div class="panel-heading pnl-heading-fix-t">
             Cajas y clientes
           </div>
           <div class="panel-body">
             <div class="row">
               <div  class="col-lg-3 col-md-3 col-sm-4 col-xs-12" >
                 <label >CLIENTES</label>
                 <div class="list-group">
                   <button v-for="cli in clients" :key="cli.id" @click="setcli(cli.id)" type="button" class="list-group-item" style="padding: 5px 15px 5px 10px"> {{cli.name}}</button>
                 </div>
               </div>
               <div class="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                 <label >CAJAS</label>
                 <div v-for="bx in boxs" :key="bx.id" class="mousehand" @click="cheksup(cliID, bx.id)" style="margin:10px 0 10px 0">
                   <div><i class="fa" :class="{'fa-check-square-o': ischecksup(cliID, bx.id), ' fa-square-o': !ischecksup(cliID, bx.id) }"></i>{{ ' ' + bx.name}}</div>
                 </div>
               </div>
             </div>
           </div>
           <div class="panel-footer">
             <button class="btn btn-success btn-sm" @click="SaveBoxClients()">Guardar</button>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
     <deletes :urlkill="urlkill" :itemkill="itemkill" v-on:gets="getvalues" :element="itemkill.name" :title="title"></deletes>
    </div>
</template>

<script>
import {spin, urlapi, valid, getdescrip} from '@/tools'
import deletes from '@/components/deletes'
export default {
  name: 'setings',
  data () {
    return {
      ranks: [],
      rank: {
        id: 0,
        name: ''
      },
      title: '',
      paqid: 0,
      generics: [],
      measures: [],
      boxs: [],
      listcalibersnotcarozo: [],
      supp: {
        id: 0,
        name: '',
        code: '',
        measure_id: 0,
        generic_id: 0
      },
      checks: [],
      clients: [],
      taras: [{
        wood: 0,
        plastic: 0
      }, {
        wood: 0,
        plastic: 0
      }],
      box: {
        id: 0,
        name: ''
      },
      url: '/setings',
      urlkill: '',
      percenrecepcaliber: 0,
      clasifications: [],
      typepacking: [],
      supplies: [],
      cliID: 0,
      checksSupplies: [],
      itemkill: {}
    }
  },
  components: {
    spin, deletes
  },
  mounted () {
    this.getvalues()
  },
  methods: {
    setcli (i) {
      this.cliID = i
    },
    setrank (r) {
      this.rank = r
    },
    cheksup (apaqid, asupid) {
      let pass = false
      this.checksSupplies.forEach(it => {
        if (it.client_id === apaqid && it.box_id === asupid) { pass = true }
      })
      let ck = {
        client_id: apaqid,
        box_id: asupid
      }
      if (!pass) { this.checksSupplies.push(ck) } else {
        let f = window._.find(this.checksSupplies, function (n) {
          return (n.client_id === apaqid) && (n.box_id === asupid)
        })
        this.checksSupplies = window._.without(this.checksSupplies, f)
      }
    },
    ischecksup (apaqid, asupid) {
      let pass = false
      this.checksSupplies.forEach(it => {
        if (it.client_id === apaqid && it.box_id === asupid) { pass = true }
      })
      return pass
    },
    setpaq (i) {
      this.paqid = i
    },
    chek (apaqid, asupid) {
      let pass = false
      this.checks.forEach(it => {
        if (it.paqid === apaqid && it.supid === asupid) { pass = true }
      })
      let ck = {
        paqid: apaqid,
        supid: asupid
      }
      if (!pass) { this.checks.push(ck) } else {
        let f = window._.find(this.checks, function (n) {
          return (n.paqid === apaqid) && (n.supid === asupid)
        })
        this.checks = window._.without(this.checks, f)
      }
    },
    ischeck (apaqid, asupid) {
      let pass = false
      this.checks.forEach(it => {
        if (it.paqid === apaqid && it.supid === asupid) { pass = true }
      })
      return pass
    },
    valnumber: valid,
    descriptor: getdescrip,
    getvalues () {
      this.axios.get(urlapi + this.url + '/get').then(res => {
        this.taras = res.data.taras
        this.percenrecepcaliber = res.data.percenrecepcaliber
        this.clasifications = res.data.clasifications
        this.typepacking = res.data.typepacking
        this.supplies = res.data.supplies
        this.checks = res.data.cheksupplies
        this.generics = res.data.generics
        this.boxs = res.data.boxs
        this.clients = res.data.clients
        this.checksSupplies = res.data.boxclients
        this.measures = res.data.measures
        this.ranks = res.data.ranks
        this.listcalibersnotcarozo = res.data.listcalibersnotcarozo
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    SavePercentCalibers () {
      this.axios.post(urlapi + this.url + '/savepercentcalibers', {listcalibers: this.listcalibersnotcarozo}).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    saverank () {
      this.axios.post(urlapi + this.url + '/saverank', {rank: this.rank}).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    delrank (id) {
      this.axios.post(urlapi + this.url + '/delrank/' + id).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    savetaras () {
      this.axios.post(urlapi + this.url + '/savetaras', {taras: this.taras}).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    savepercentcaliber () {
      this.axios.post(urlapi + this.url + '/savepercentcaliber', {percenrecepcaliber: this.percenrecepcaliber}).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    saveclass () {
      this.axios.post(urlapi + this.url + '/saveclas', {clas: this.clasifications}).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    SaveSupplieDiscount () {
      this.axios.post(urlapi + this.url + '/savesuppliediscount', {suppliesdiscount: this.checks}).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    SaveBoxClients () {
      this.axios.post(urlapi + this.url + '/saveboxclients', {boxsclients: this.checksSupplies}).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    SaveSupplie () {
      if (this.supp.name !== '' && this.supp.measure_id !== 0 && this.supp.code !== '' && this.supp.generic_id !== 0) {
        this.axios.post(urlapi + this.url + '/savesupplie', {sup: this.supp}).then(res => {
          this.supp.name = ''
          this.supp.code = ''
          this.supp.measure_id = 0
          this.supp.id = 0
          this.supp.generic_id = 0
          this.$toasted.success(res.data)
          this.getvalues()
        }).catch(e => {
          this.$toasted.error(e.response.data)
        })
      } else {
        this.$toasted.info('Faltan datos!')
      }
    },
    delsup (item) {
      this.itemkill = item
      this.title = 'Eliminar insumo!'
      this.urlkill = this.url + '/delsupplie'
      window.$('#delete').modal('show')
    },
    editsup (sup) {
      this.supp = sup
    },
    savebox () {
      this.axios.post(urlapi + this.url + '/boxs', {box: this.box}).then(res => {
        this.box = {}
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    },
    editbox (bo) {
      this.box = bo
    },
    delbox (id) {
      this.axios.post(urlapi + this.url + '/delbox/' + id).then(res => {
        this.$toasted.success(res.data)
        this.getvalues()
      }).catch(e => {
        this.$toasted.error(e.response.data)
      })
    }
  }
}
</script>

<style lang="css">

.closes {
  background-color: rgba(85, 46, 42, 0.52);
  text-shadow: 1px 1px 1px rgba(0,0,0,0.21);
  color:rgb(16, 34, 21);
}

.panelf {
  margin-bottom: 4px
}
</style>
