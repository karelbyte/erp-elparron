import _ from 'lodash'
export const urlapi = 'http://elparronapi.jet/api'
// export const urlapi = 'http://elparronback.ticchile.cl/api'

export const spin = {
  position: 'absolute',
  top: '100%',
  left: '48%',
  color: 'rgb(39, 78, 27)',
  'z-index': 9999
}

export const itemclear = function (it) {
  for (let property in it) {
    if (typeof it[property] === 'number') { it[property] = 0 }
    if (typeof it[property] === 'string') { it[property] = '-' }
    if (typeof it[property] === 'object') { it[property] = {} }
  }
}
export const getarraydata = function (data) {
  let s1 = data.substr(1, data.length)
  let s2 = s1.substr(0, s1.length - 1)
  let s3 = (s2.replace(/\s/g, '')).split(',') // replace(/,/g, '')
  let ar = []
  s3.forEach(i => {
    ar.push(parseInt(i))
  })
  return ar
}
// Funcion para crear rangos de paginacion
export const rangoutil = function (totalpage, currentpage) {
  var star, end, total
  total = (totalpage !== null) ? parseInt(totalpage) : 0
  if (total <= 5) {
    star = 1
    end = total + 1
  } else {
    if (currentpage <= 2) {
      star = 1
      end = 6
    } else if (currentpage + 2 >= total) {
      star = total - 5
      end = total + 1
    } else {
      star = currentpage - 2
      end = currentpage + 3
    }
  }
  return _.range(star, end)
}

export const valid = function (e) {
  let key = e.key
  const permitidos = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowLeft', 'Delete', 'Tab']
  if (!permitidos.includes(key)) e.preventDefault()
}

export const exitoff = function (sender) {
  sender.$store.dispatch('clearUserObject')
  sender.$store.dispatch('clearPassportObject')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('passport')
  sender.$router.push({name: 'login'})
}

export const dateconvert = function (da, fix) {
  let y = String(da.getFullYear())
  let m = String(da.getMonth() + 1).length > 1 ? String(da.getMonth() + 1) : '0' + String(da.getMonth() + 1)
  let d = String(da.getDate()).length > 1 ? String(da.getDate()) : '0' + String(da.getDate())
  let result = ''
  if (fix === 'y') { result = y }
  if (fix === 'm') { result = m }
  if (fix === 'd') { result = d }
  if (fix === 'full') { result = y + m + d }
  if (fix === 'fullrevert') { result = d + m + y }
  return result
}

export const getdescrip = function (rl, descrip) {
  if (rl !== null && descrip !== null) {
    let aux = ''
    for (let it of this[descrip]) {
      if (it.id === rl) {
        aux = it.name
        break
      }
    }
    return aux
  } else return ''
}

export let them = {

  colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
    '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
    backgroundColor: null,
    style: {
      fontFamily: 'Signika, serif'
    }
  },
  title: {
    style: {
      color: 'black',
      'text-shadow': '1px 1px 1px rgba(0,0,0,0.3)',
      fontSize: '16px'
    }
  },
  subtitle: {
    style: {
      color: 'black'
    }
  },
  tooltip: {
    borderWidth: 0
  },
  legend: {
    itemStyle: {
      fontWeight: 'bold',
      fontSize: '13px'
    }
  },
  xAxis: {
    labels: {
      style: {
        color: '#6e6e70'
      }
    }
  },
  yAxis: {
    labels: {
      style: {
        color: '#6e6e70'
      }
    }
  },
  plotOptions: {
    series: {
      shadow: true
    },
    candlestick: {
      lineColor: '#404048'
    },
    map: {
      shadow: false
    }
  },
  // Highstock specific
  navigator: {
    xAxis: {
      gridLineColor: '#D0D0D8'
    }
  },
  rangeSelector: {
    buttonTheme: {
      fill: 'white',
      stroke: '#C0C0C8',
      'stroke-width': 1,
      states: {
        select: {
          fill: '#D0D0D8'
        }
      }
    }
  },
  scrollbar: {
    trackBorderColor: '#C0C0C8'
  },
  // General
  background2: '#E0E0E8'
}
