<template>
  <div class="modal fade " id="delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
              <div class="modal-header mdl_header_custom">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h5 class="modal-title" id="myModalLabel">{{title}}</h5>
              </div>
              <div class="modal-body mdl_body_custom">
                  <p v-if="element">Elemento: <samp class="txtblack">{{element}}</samp> </p>
                  <p>Cuidado! Esta acción es irreversible. Desea proceder?</p>
              </div>
              <div class="modal-footer mdl_footer_custom">
                  <button @click="delitem()" class="btn btn-danger btn-sm">SI</button>
                  <a href="#" data-dismiss="modal" class="btn btn-default  btn-sm">No</a>
              </div>
          </div>
     </div>
  </div>
</template>

<script>
import {urlapi} from '../tools'
export default {
  name: 'deletes',
  props: ['urlkill', 'itemkill', 'element', 'title'],
  methods: {
    delitem () {
      this.axios({
        method: 'delete',
        url: urlapi + this.urlkill + '/' + this.itemkill.id
      }).then(
        response => {
          this.$toasted.success(response.data)
          this.$emit('gets')
          window.$('#delete').modal('hide')
        }
      ).catch(
        e => {
          this.$toasted.error(e.response.data)
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
