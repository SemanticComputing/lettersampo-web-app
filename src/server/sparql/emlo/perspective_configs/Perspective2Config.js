import {
  workProperties
} from '../sparql_queries/SparqlQueriesPerspective2'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const perspective2Config = {
  endpoint: {
    url: 'http://ldf.fi/emlo/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: 'eschema:Letter',
  paginatedResults: {
    properties: workProperties
  },
  instance: {
    properties: workProperties,
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
    source: {
      id: 'source',
      facetValueFilter: '',
      labelPath: '^eschema:cofk_union_relationship_type-created/skos:prefLabel',
      predicate: '^eschema:cofk_union_relationship_type-created',
      type: 'list'
    },
    target: {
      id: 'target',
      facetValueFilter: '',
      labelPath: 'eschema:cofk_union_relationship_type-was_addressed_to/skos:prefLabel',
      predicate: 'eschema:cofk_union_relationship_type-was_addressed_to',
      type: 'list'
    },
    description: {
      labelPath: 'dct:description'
    },
    language: {
      id: 'language',
      facetValueFilter: '',
      label: 'Language',
      labelPath: 'dct:language/skos:prefLabel',
      predicate: 'dct:language',
      type: 'list'
    },
    productionTimespan: {
      id: 'productionTimespan',
      facetValueFilter: '',
      sortByAscPredicate: 'crm:P4_has_time-span/crm:P82a_begin_of_the_begin',
      sortByDescPredicate: 'crm:P4_has_time-span/crm:P82b_end_of_the_end',
      predicate: 'crm:P4_has_time-span',
      startProperty: 'crm:P82a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      type: 'timespan'
    }
  }
}
