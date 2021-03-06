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
  sortBy: 'num_sent',
  sortDirection: 'desc',
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
    placesActors: {
      center: [22.43, 10.37],
      zoom: 2
    }
  },
  properties: [
    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 300
    },
    {
      id: 'image',
      valueType: 'image',
      previewImageHeight: 160,
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 100,
      hideHeader: false
    },
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
      id: 'gender',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 70,
      priority: 5
    },
    {
      id: 'type',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 70,
      priority: 5
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
      minWidth: 90
    },
    {
      id: 'birthPlace',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      sourceExternalLink: true,
      minWidth: 150,
      onlyOnInstancePage: true
    },
    {
      id: 'flourish',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 70,
      priority: 5,
      onlyOnInstancePage: true
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
      minWidth: 90
    },
    {
      id: 'deathPlace',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      sourceExternalLink: true,
      minWidth: 150,
      onlyOnInstancePage: true
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
      id: 'num_sent',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      showSource: false,
      sourceExternalLink: false,
      minWidth: 70
    },
    {
      id: 'num_received',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      showSource: false,
      sourceExternalLink: false,
      minWidth: 70
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
      id: 'rel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: false,
      numberedList: true,
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
    },
    {
      id: 'datasource',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: false,
      numberedList: false,
      minWidth: 70,
      priority: 5,
      onlyOnInstancePage: true
    }
  ]
}

const resultClasses = new Set([
  'actors',
  'placesActors',
  'letterNetwork',
  'sentReceived',
  'actorLetters',
  'actorNetwork',
  'socialSignature',
  'correspondenceTimeline'
])

const actors = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action)
  } else return state
}

export default actors
