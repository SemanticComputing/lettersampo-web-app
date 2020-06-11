import {
  FETCH_RESULTS,
  FETCH_RESULT_COUNT,
  FETCH_RESULTS_FAILED,
  FETCH_PAGINATED_RESULTS,
  FETCH_PAGINATED_RESULTS_FAILED,
  FETCH_BY_URI,
  UPDATE_RESULT_COUNT,
  UPDATE_RESULTS,
  UPDATE_PAGINATED_RESULTS,
  UPDATE_INSTANCE,
  UPDATE_PAGE,
  UPDATE_ROWS_PER_PAGE,
  SORT_RESULTS,
  UPDATE_PERSPECTIVE_HEADER_EXPANDED,
  UPDATE_INSTANCE_NETWORK_DATA
} from '../../actions'
import {
  fetchResults,
  fetchResultsFailed,
  fetchResultCount,
  updateSortBy,
  updateResultCount,
  updateResults,
  updatePaginatedResults,
  updateInstance,
  updateInstanceNetworkData,
  updatePage,
  updateRowsPerPage,
  updateHeaderExpanded
} from '../helpers'

export const INITIAL_STATE = {
  results: null,
  resultUpdateID: 0,
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  instance: null,
  instanceNetworkData: null,
  instanceSparqlQuery: null,
  resultCount: 0,
  page: -1,
  pagesize: 10,
  sortBy: null,
  sortDirection: null,
  fetching: false,
  fetchingResultCount: false,
  facetedSearchHeaderExpanded: false,
  instancePageHeaderExpanded: true,
  properties: [
    {
      id: 'uri',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      onlyOnInstancePage: true
    },
    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'gender',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 90,
      priority: 5
    },
    {
      id: 'type',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 90,
      priority: 5
    },
    {
      id: 'related',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250,
      priority: 8,
      onlyOnInstancePage: true
    },
    {
      id: 'birthDateTimespan',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      showSource: true,
      sourceExternalLink: true,
      minWidth: 250
    },
    {
      id: 'deathDateTimespan',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      showSource: true,
      sourceExternalLink: true,
      minWidth: 250
    },
    {
      id: 'altLabel',
      valueType: 'string',
      renderAsHTML: false,
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 150,
      collapsedMaxWords: 12,
      onlyOnInstancePage: true
    },
    {
      id: 'rel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 220,
      onlyOnInstancePage: true
    },
    {
      id: 'knownLocation',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 220,
      onlyOnInstancePage: true
    }
  ]
}

const resultClasses = new Set([
  'perspective1', 'letterNetwork'
])

const perspective1 = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    switch (action.type) {
      case FETCH_RESULTS:
      case FETCH_PAGINATED_RESULTS:
      case FETCH_BY_URI:
        return fetchResults(state)
      case FETCH_RESULT_COUNT:
        return fetchResultCount(state)
      case FETCH_RESULTS_FAILED:
      case FETCH_PAGINATED_RESULTS_FAILED:
        return fetchResultsFailed(state)
      case SORT_RESULTS:
        return updateSortBy(state, action)
      case UPDATE_RESULT_COUNT:
        return updateResultCount(state, action)
      case UPDATE_RESULTS:
        return updateResults(state, action)
      case UPDATE_PAGINATED_RESULTS:
        return updatePaginatedResults(state, action)
      case UPDATE_INSTANCE:
        return updateInstance(state, action)
      case UPDATE_INSTANCE_NETWORK_DATA:
        return updateInstanceNetworkData(state, action)  
      case UPDATE_PAGE:
        return updatePage(state, action)
      case UPDATE_ROWS_PER_PAGE:
        return updateRowsPerPage(state, action)
      case UPDATE_PERSPECTIVE_HEADER_EXPANDED:
        return updateHeaderExpanded(state, action)
      default:
        return state
    }
  } else return state
}

export default perspective1
