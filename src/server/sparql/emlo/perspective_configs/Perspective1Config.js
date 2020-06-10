import {
  manuscriptPropertiesFacetResults,
  manuscriptPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesPerspective1'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const perspective1Config = {
  endpoint: {
    url: 'http://ldf.fi/emlo/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: 'crm:E21_Person crm:E74_Group',
  paginatedResults: {
    properties: manuscriptPropertiesFacetResults
  },
  instance: {
    properties: manuscriptPropertiesInstancePage,
    relatedInstances: ''
  },
  facets: {
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'skos:prefLabel', // limit only to prefLabels
      type: 'text'
    },
    gender: {
      id: 'gender',
      facetValueFilter: '',
      label: 'Gender',
      labelPath: 'foaf:gender',
      predicate: 'foaf:gender',
      type: 'text'
    },
    class: {
      id: 'class',
      facetValueFilter: '',
      label: 'Type',
      labelPath: 'a',
      predicate: 'a',
      type: 'text'
    },
    birthDateTimespan: {
      id: 'birthDateTimespan',
      facetValueFilter: '',
      sortByAscPredicate: 'eschema:birthDate/crm:P82a_begin_of_the_begin',
      sortByDescPredicate: 'eschema:birthDate/crm:P82b_end_of_the_end',
      predicate: 'eschema:birthDate',
      startProperty: 'crm:P82a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      type: 'timespan'
    },
    deathDateTimespan: {
      id: 'deathDateTimespan',
      facetValueFilter: '',
      sortByAscPredicate: 'eschema:deathDate/crm:P82a_begin_of_the_begin',
      sortByDescPredicate: 'eschema:deathDate/crm:P82b_end_of_the_end',
      predicate: 'eschema:deathDate',
      startProperty: 'crm:P82a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      type: 'timespan'
    },
    source: {
      id: 'source',
      facetValueFilter: '',
      label: 'Source',
      labelPath: 'dct:source/skos:prefLabel',
      predicate: 'dct:source',
      type: 'list'
    }
  }
}