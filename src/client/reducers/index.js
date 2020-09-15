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
import actors from './emlo/actors'
import letters from './emlo/letters'
import places from './emlo/places'
import ties from './emlo/ties'
import actorsFacets from './emlo/actorsFacets'
import actorsFacetsConstrainSelf from './emlo/actorsFacetsConstrainSelf'
import lettersFacets from './emlo/lettersFacets'
import placesFacets from './emlo/placesFacets'

const reducer = combineReducers({
  actors,
  letters,
  places,
  ties,
  actorsFacets,
  actorsFacetsConstrainSelf,
  lettersFacets,
  placesFacets,
  leafletMap,
  animation,
  options,
  error,
  clientSideFacetedSearch,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
