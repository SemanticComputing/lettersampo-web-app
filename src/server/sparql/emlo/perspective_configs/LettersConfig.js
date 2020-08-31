import {
  letterProperties,
  letterPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesLetters'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const lettersConfig = {
  endpoint: {
    url: 'http://ldf.fi/emlo/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: 'eschema:Letter',
  paginatedResults: {
    properties: letterProperties
  },
  instance: {
    properties: letterPropertiesInstancePage,
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
    from: {
      id: 'from',
      facetValueFilter: '',
      labelPath: 'eschema:cofk_union_relationship_type-was_sent_from/skos:prefLabel',
      predicate: 'eschema:cofk_union_relationship_type-was_sent_from',
      //  parentProperty: 'crm:P89_falls_within',
      //  parentPredicate: 'crm:P7_took_place_at/crm:P89_falls_within+',
      //  type: 'hierarchical'
      type: 'list'
    },
    to: {
      id: 'to',
      facetValueFilter: '',
      labelPath: 'eschema:cofk_union_relationship_type-was_sent_to/skos:prefLabel',
      predicate: 'eschema:cofk_union_relationship_type-was_sent_to',
      type: 'list'
    },
    language: {
      id: 'language',
      facetValueFilter: '',
      label: 'Language',
      labelPath: 'dct:language/skos:prefLabel',
      predicate: 'dct:language',
      type: 'list'
    },
    subject: {
      id: 'subject',
      facetValueFilter: '',
      label: 'Subject',
      labelPath: 'dct:subject/skos:prefLabel',
      predicate: 'dct:subject',
      type: 'list'
    },
    datasource: {
      id: 'datasource',
      facetValueFilter: '',
      label: 'Data Source',
      labelPath: 'eschema:source/skos:prefLabel',
      predicate: 'eschema:source',
      type: 'list'
    },
    excipit: {
      id: 'excipit',
      facetValueFilter: '',
      label: 'Excipit',
      labelPath: 'eschema:excipit/skos:prefLabel',
      predicate: 'eschema:excipit',
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
      dataType: 'xsd:dateTime',
      type: 'timespan'
    }
  }
}
