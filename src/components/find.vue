<template lang="html">
<div class="find">
  <div class="input-group">
   <input type="text" class="form-control input-sm" :placeholder="placehol" v-model="find" @keyup="updates()">
   <div class="input-group-btn">
     <button class="btn btn-default btn-sm"><i class="fa fa-search"></i></button>
   </div>
 </div>
</div>
</template>

<script>
export default {
  name: 'find',
  props: ['filters', 'fil', 'placehol'],
  data () {
    return {
      find: this.filters[this.fil]
    }
  },
  methods: {
    updates () {
      this.filters[this.fil] = this.find
      this.$emit('getfilter', this.filters, undefined, undefined)
    }
  }
}
</script>

<style lang="css">
</style>
