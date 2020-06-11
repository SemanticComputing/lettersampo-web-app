import {
  FETCH_FACET,
  FETCH_FACET_FAILED,
  UPDATE_FACET_VALUES,
  UPDATE_FACET_OPTION,
  CLEAR_FACET
} from '../../actions'
import {
  fetchFacet,
  fetchFacetFailed,
  updateFacetValues,
  updateFacetOption,
  clearFacet
} from '../helpers'

export const INITIAL_STATE = {
  updatedFacet: null,
  facetUpdateID: 0,
  updatedFilter: null,
  facets: {
    prefLabel: {
      id: 'prefLabel',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: null,
      sortDirection: null,
      sortButton: false,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'one',
      filterType: 'textFilter',
      textFilter: null,
      priority: 1
    }, 
    gender: {
      id: 'gender',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: false,
      spatialFilterButton: false,
      chartButton: true,
      isFetching: false,
      searchField: false,
      containerClass: 'three',
      filterType: 'uriFilter',
      uriFilter: null,
      priority: 9
    },
    type: {
      id: 'type',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: false,
      spatialFilterButton: false,
      chartButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'three',
      filterType: 'uriFilter',
      uriFilter: null,
      priority: 9
    },
    birthDateTimespan: {
      id: 'birthDateTimespan',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: null,
      sortDirection: null,
      sortButton: false,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'three',
      filterType: 'timespanFilter',
      min: null,
      max: null,
      timespanFilter: null,
      type: 'timespan',
      priority: 8
    },
    deathDateTimespan: {
      id: 'deathDateTimespan',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: null,
      sortDirection: null,
      sortButton: false,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'three',
      filterType: 'timespanFilter',
      min: null,
      max: null,
      timespanFilter: null,
      type: 'timespan',
      priority: 8
    }
  }
}

const perspective1Facets = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'perspective1') {
    switch (action.type) {
      case FETCH_FACET:
        return fetchFacet(state, action)
      case FETCH_FACET_FAILED:
        return fetchFacetFailed(state, action)
      case UPDATE_FACET_VALUES:
        return updateFacetValues(state, action)
      case UPDATE_FACET_OPTION:
        return updateFacetOption(state, action)
      case CLEAR_FACET:
        return clearFacet(state, action)
      default:
        return state
    }
  } else return state
}

export default perspective1Facets
