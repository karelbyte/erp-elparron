<template>
  <div>
    <ul v-if="tpage > 1" class="pagination pagination-sm paginationfix">
        <li :class="{disabled: currentpage === 1}"><a @click = "setpage(1)"> <span class="glyphicon glyphicon-step-backward mousehand " aria-hidden="true"></span></a></li>
        <li :class="{disabled: currentpage === 1}"><a @click = "setpage(currentpage - 1)"><span class="glyphicon glyphicon-chevron-left mousehand " aria-hidden="true"></span></a></li>
        <li v-for="pagex in rango(tpage, currentpage)" :key="pagex" :class="{active: currentpage == pagex}" class="mousehand"><a @click = "setpage(pagex)"> {{pagex}}</a></li>
        <li :class="{disabled: currentpage === tpage}"><a @click = "setpage(currentpage + 1)"><span class="glyphicon glyphicon-chevron-right mousehand" aria-hidden="true"></span></a></li>
        <li :class="{disabled: currentpage === tpage}"><a @click = "setpage(tpage)"><span class="glyphicon glyphicon-step-forward mousehand" aria-hidden="true"></span></a></li>
    </ul>
  </div>
</template>

<script>
import { rangoutil } from './../tools'
export default {
  name: 'paginator',
  props: ['tpage', 'pager'],
  methods: {
    setpage (page) {
      this.currentpage = page
      this.pager.page = page
      this.$emit('getresult', undefined, undefined, this.pager)
    }
  },
  watch: {
    tpage: function () {
      this.currentpage = 1
    }
  },
  data () {
    return {
      pagex: '',
      currentpage: 1,
      recordpage: this.pager.recordpage,
      rango: rangoutil
    }
  }

}
</script>

<style scoped>

.borders {
 background-color: #d0480e !important;
}

.input-group-addon {
 background-color: #033c73;
 color: white;
 border-color: black;
}
</style>
