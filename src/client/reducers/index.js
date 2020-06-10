import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './error'
import options from './options'
import animation from './animation'
import leafletMap from './leafletMap'
// portal spefic reducers:
import fullTextSearch from './emlo/fullTextSearch'
import clientSideFacetedSearch from './sampo/clientSideFacetedSearch'
import perspective1 from './emlo/perspective1' // copy of manuscripts
import perspective2 from './emlo/perspective2' // copy of works
import perspective3 from './emlo/perspective3' // copy of events
import places from './emlo/places'
import perspective1Facets from './emlo/perspective1Facets'
import perspective1FacetsConstrainSelf from './sampo/perspective1FacetsConstrainSelf'
import perspective2Facets from './emlo/perspective2Facets'
import perspective3Facets from './emlo/perspective3Facets'

const reducer = combineReducers({
  perspective1,
  perspective2,
  perspective3,
  perspective1Facets,
  perspective1FacetsConstrainSelf,
  perspective2Facets,
  perspective3Facets,
  places,
  leafletMap,
  animation,
  options,
  error,
  clientSideFacetedSearch,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
