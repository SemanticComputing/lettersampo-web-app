import { has } from 'lodash'

// https://js.cytoscape.org/#style
export const cytoscapeStyle = [
  {
    selector: 'node',
    style: {
      shape: 'ellipse',
      'font-size': '10',
      'background-color': ele => ele.data('color') || '#90A0DE',
      label: ' data(prefLabel)',
      height: ele => (ele.data('size') || '10px'),
      width: ele => (ele.data('size') || '10px')
    }
  },
  {
    selector: 'edge',
    style: {
      width: ele => ele.data('weight'),
      'line-color': ele => ele.data('color') || '#DDD',
      'curve-style': 'bezier',
      content: ' data(prefLabel) ',
      color: 'hsl(30, 64%, 35%)', // label color
      'font-size': '8',
      'text-valign': 'center',
      'edge-text-rotation': 'autorotate',
      'text-background-opacity': 1,
      'text-background-color': 'white',
      'text-background-shape': 'roundrectangle',
      // 'text-halign': 'top',
      // 'target-arrow-shape': 'triangle',
      'target-arrow-color': ele => ele.data('color') || '#DDD'
    }
  }
]

// https://js.cytoscape.org/#layouts
export const coseLayout = {
  name: 'cose',
  idealEdgeLength: 150,
  nodeOverlap: 20,
  refresh: 20,
  fit: true,
  padding: 50,
  randomize: false,
  componentSpacing: 100,
  nodeRepulsion: 400000,
  edgeElasticity: 100,
  nestingFactor: 5,
  gravity: 80,
  numIter: 1347,
  initialTemp: 200,
  coolingFactor: 0.95,
  minTemp: 1.0
}

class ValueScaler {
  a;
  b;
  constructor (low, high) {
    this.low = low
    this.high = high
  }

  fit (vals) {
    const valmin = Math.min(...vals)
    const valmax = Math.max(...vals)
    if (valmax === valmin) {
      this.a = 0.0
    } else {
      this.a = (this.high - this.low) / (valmax - valmin)
    }
    this.b = this.low - valmin * this.a
  }

  transform (vals) {
    return vals.map(x => { return x * this.a + this.b })
  }

  fitTransform (vals) {
    this.fit(vals)
    return this.transform(vals)
  }
}

class ColorScaler extends ValueScaler {
  col1;
  col2;
  constructor (low, high) {
    super(0.0, 1.0)
    this.col1 = low
    this.col2 = high
  }

  // super.fit(vals)

  _process (s0, s1, r) {
    const x0 = parseInt(s0)
    const x1 = parseInt(s1)
    if (isNaN(x0) || isNaN(x1)) return s0
    return Math.floor(x0 + (x1 - x0) * r)
  }

  transform (vals) {
    const s1 = this.col1.split(/(\d+)/)
    const s2 = this.col2.split(/(\d+)/)
    const _vals01 = vals.map(x => { return x * this.a + this.b })

    return _vals01.map(v => s1.map((s, i) => this._process(s, s2[i], v)).join(''))
  }
}

const maxEdgeWidth = 8
/**
 const rankSort = arr => {
   const arr2 = arr.map(function (o, i) { return { idx: i, obj: o } }).sort((a, b) => a.obj - b.obj)
   return arr2.map(function (o, i) { o.ord = i; return o }).sort((a, b) => a.idx - b.idx).map(o => o.ord)
  }
*/

export const preprocess = elements => {
  console.log('preprocess')
  //  edges
  let arr = elements.edges.map(ele => ele.data.weight || 1)

  //  edge width
  let res = (new ValueScaler(1.0, maxEdgeWidth)).fitTransform(arr)
  elements.edges.forEach((ele, i) => { ele.data.weight = res[i] })

  //  edge color
  // https://www.w3schools.com/colors/colors_hsl.asp
  res = (new ColorScaler('hsl(30, 64%, 85%)', 'hsl(30, 64%, 35%)')).fitTransform(arr)
  elements.edges.forEach((ele, i) => { ele.data.color = res[i] })

  // nodes
  arr = elements.nodes.map(ele => Math.sqrt(ele.data.num_letters || 0))

  // TODO: adjust node sizes e.g. https://stackoverflow.com/questions/30167117/get-the-current-index-in-sort-function
  // node size
  res = (new ColorScaler('8px', '40px')).fitTransform(arr)
  elements.nodes.forEach((ele, i) => { ele.data.size = res[i] })

  // node color
  res = (new ColorScaler('rgb(0,0,0)', 'rgb(255,0,0)')).fitTransform(arr)
  elements.nodes.forEach((ele, i) => { ele.data.color = res[i] })
}

export const preprocessEgo = elements => {
  console.log('preprocessEgo')
  //  edges
  let arr = elements.edges.map(ele => ele.data.weight || 1)

  //  edge width
  let res = (new ValueScaler(1.0, maxEdgeWidth)).fitTransform(arr)
  elements.edges.forEach((ele, i) => { ele.data.weight = res[i] })

  //  edge color
  // https://www.w3schools.com/colors/colors_hsl.asp
  res = (new ColorScaler('hsl(30, 64%, 85%)', 'hsl(30, 64%, 35%)')).fitTransform(arr)
  elements.edges.forEach((ele, i) => { ele.data.color = res[i] })

  // nodes
  arr = elements.nodes.map(ele => has(ele.data, 'distance') ? ele.data.distance : 3)
  // node size
  res = (new ColorScaler('20px', '8px')).fitTransform(arr)
  elements.nodes.forEach((ele, i) => { ele.data.size = res[i] })

  // node color
  res = (new ColorScaler('rgb(255,0,0)', 'rgb(0,0,0)')).fitTransform(arr)
  elements.nodes.forEach((ele, i) => { ele.data.color = res[i] })
}

export const preprocessTie = elements => {
  console.log('preprocessTie')
  //  edges
  let arr = elements.edges.map(ele => ele.data.weight)

  //  edge width
  let res = (new ValueScaler(1.0, maxEdgeWidth)).fitTransform(arr)
  elements.edges.forEach((ele, i) => { ele.data.weight = res[i] })

  //  edge color
  res = (new ColorScaler('hsl(30, 64%, 85%)', 'hsl(30, 64%, 35%)')).fitTransform(arr)
  elements.edges.forEach((ele, i) => { ele.data.color = res[i] })

  // nodes
  arr = elements.nodes.map(ele => ele.data.pagerank)

  // node size
  res = (new ColorScaler('8px', '20px')).fitTransform(arr)
  elements.nodes.forEach((ele, i) => { ele.data.size = res[i] })

  // node color
  res = (new ColorScaler('rgb(0,0,0)', 'rgb(255,0,0)')).fitTransform(arr)
  elements.nodes.forEach((ele, i) => { ele.data.color = res[i] })
}
