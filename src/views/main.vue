<template>
  <div class="row">
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
      <div v-if="isbarrasdata" class="panel panel-default">
        <div class="panel-body">
          <highcharts :options="barras" ref="highcharts"> </highcharts>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
      <div  v-if="ispiedata" class="panel panel-default">
        <div class="panel-body">
          <highcharts :options="pie" ref="highcharts"> </highcharts>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-1 col-sm-2 hidden-xs">

    </div>
  </div>

</template>

<script>
import {spin, urlapi} from '@/tools'
import spinner from '@/components/spinner'
export default {
  name: 'main',
  data () {
    return {
      stylespiner: spin,
      isbarrasdata: false,
      ispiedata: false,
      datas: null,
      barras: {
        plotOptions: {
          column: {
            colorByPoint: true
          }
        },
        colors: [],
        chart: {
          type: 'column'
        },
        title: {
          text: 'Materia prima recepcionada por clientes'
        },
        xAxis: {
          categories: [],
          gridLineWidth: 1,
          title: {
            text: 'Clientes'
          }
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: 'Cantidad Kg'
          }
        },
        series: [{
          name: (new Date()).getFullYear(),
          data: []
        }]
      },
      pie: {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Recepcionada calibrada / no calibrada'
        },
        subtitle: {
          text: (new Date()).getFullYear()
        },
        series: [{
          name: 'Bins',
          colorByPoint: true,
          data: [{
            name: 'Calibrada',
            color: '#660d99',
            y: 70,
            sliced: true,
            selected: true
          },
          {
            name: 'No Calibrada',
            y: 20,
            color: '#39995c',
            sliced: true,
            selected: true
          }]
        }]
      }
    }
  },
  components: {
    spinner
  },
  mounted () {
    this.axios.get(urlapi + '/main/databar').then(response => {
      this.datas = response.data
      this.isbarrasdata = this.datas.length > 0
      this.barras.xAxis.categories = this.datas.map(it => it.name)
      this.barras.series[0].data = this.datas.map(it => parseInt(it.kgt))
      this.barras.series[0].colors = this.datas.map(it => '#' + Math.floor(Math.random() * 16777215).toString(16))
    })
    this.axios.get(urlapi + '/main/datapie').then(response => {
      this.ispiedata = response.data.length > 0
      let total = parseInt(response.data[0].kgt) + parseInt(response.data[1].kgt)
      let caliber = (response.data[0].kgt * 100) / total
      let notcaliber = (response.data[1].kgt * 100) / total
      this.pie.series[0].data[0].y = Math.round(caliber)
      this.pie.series[0].data[1].y = Math.round(notcaliber)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
