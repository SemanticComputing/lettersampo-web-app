//  replace function mapMultipleLineChart from Mappers.js
//  update: now fills in the missing years with zeroes
export const mapMultipleLineChart = sparqlBindings => {
  const res = {}
  sparqlBindings.forEach(b => {
    for (const p in b) {
      if (p !== 'category') {
        res[p] = {}
      }
    }
  })
  const category = sparqlBindings.map(p => parseFloat(p.category.value))
  //  fill the missing years with zeroes
  const valmax = Math.max(...category)
  for (var i = Math.min(...category); i <= valmax; i++) {
    for (const p in res) {
      if (p !== 'category') {
        res[p][i] = 0
      }
    }
  }
  //  read the known years into the data object
  sparqlBindings.forEach(b => {
    for (const p in b) {
      if (p !== 'category') {
        res[p][parseFloat(b.category.value)] = parseFloat(b[p].value)
      }
    }
  })
  // sort by year and remove empty sequence at start and end
  for (const p in res) {
    var arr = Object.entries(res[p])
      .map(p => [parseFloat(p[0]), p[1]])
      .sort((a, b) => ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0)))
    res[p] = trimResult(arr)
  }
  return res
}

/* Data processing as in:
*  https://github.com/apexcharts/apexcharts.js/blob/master/samples/vue/area/timeseries-with-irregular-data.html
*  Trim zero values from array start and end
*/
const trimResult = arr => {
  //  trim start of array
  let i = 0
  while (i < arr.length && arr[i][1] === 0) i++

  //  end of array
  let j = arr.length - 1
  while (i < j && arr[j][1] === 0) j--

  return arr.slice(i, j + 1)
}
