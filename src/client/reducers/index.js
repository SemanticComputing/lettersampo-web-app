import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import fullTextSearch from './emlo/fullTextSearch'
import clientSideFacetedSearch from './emlo/clientSideFacetedSearch'
import perspective1 from './emlo/perspective1' // copy of manuscripts
import perspective2 from './emlo/perspective2' // copy of works
import perspective3 from './emlo/perspective3' // copy of events
import places from './emlo/places'
import perspective1Facets from './emlo/perspective1Facets'
import perspective1FacetsConstrainSelf from './emlo/perspective1FacetsConstrainSelf'
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
