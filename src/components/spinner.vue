<template lang="html">
  <div v-if="show" :style="styles" class="spin">
     <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
  </div>
</template>

<script>
export default {
  name: 'spinner',
  props: ['show', 'styles']
}
</script>

<style lang="css" scoped>

.spin{
  position: absolute;
  top: 48%;
  left: 48%;
  color: rgb(115, 90, 22);
  z-index: 9999;
}
</style>
