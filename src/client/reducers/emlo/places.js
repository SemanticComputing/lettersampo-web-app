import { handleDataFetchingAction } from '../general/results'

export const INITIAL_STATE = {
  results: null,
  resultUpdateID: 0,
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  resultCount: 0,
  page: -1,
  pagesize: 10,
  sortBy: null,
  sortDirection: null,
  fetching: false,
  fetchingResultCount: false,
  fetchingInstanceAnalysisData: false,
  facetedSearchHeaderExpanded: false,
  instancePageHeaderExpanded: false,
  instanceTableData: null,
  instanceTableExternalData: null,
  instanceAnalysisData: null,
  instanceAnalysisDataUpdateID: 0,
  instanceSparqlQuery: null,
  maps: {
    placesEvents: {
      center: [22.43, 10.37],
      zoom: 2
    }
  },
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
      numberedList: false
    },
    {
      id: 'image',
      valueType: 'image',
      previewImageHeight: 160,
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 120,
      hideHeader: false
    },
    {
      id: 'type',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 90,
      priority: 5
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
      id: 'location',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      onlyOnInstancePage: true
    },
    {
      id: 'country',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 200
    },
    {
      id: 'related',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 250,
      priority: 8,
      onlyOnInstancePage: true
    },
    {
      id: 'from',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: true,
      minWidth: 200,
      onlyOnInstancePage: true
    },
    {
      id: 'to',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: true,
      minWidth: 200,
      onlyOnInstancePage: true
    },
    {
      id: 'external',
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
      id: 'broader',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 200
    },
    {
      id: 'narrower',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 200
    }
  ]
}

const resultClasses = new Set([
  'places',
  'sentReceivedByPlace'
])

const places = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action)
  } else return state
}

export default places
