import {
  letterProperties,
  letterPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesLetters'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const lettersConfig = {
  endpoint: {
    url: 'http://ldf.fi/ckcc/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: 'ckccs:Letter',
  defaultConstraint: '',
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
      labelPath: '^ckccs:created/skos:prefLabel',
      predicate: '^ckccs:created',
      type: 'list'
    },
    target: {
      id: 'target',
      facetValueFilter: '',
      labelPath: 'ckccs:was_addressed_to/skos:prefLabel',
      predicate: 'ckccs:was_addressed_to',
      type: 'list'
    },
    description: {
      labelPath: 'dct:description'
    },
    from: {
      id: 'from',
      facetValueFilter: '',
      labelPath: 'ckccs:was_sent_from/skos:prefLabel',
      predicate: 'ckccs:was_sent_from',
      // parentProperty: 'crm:P89_falls_within',
      // type: 'hierarchical'
      type: 'list'
    },
    to: {
      id: 'to',
      facetValueFilter: '',
      labelPath: 'ckccs:was_sent_to/skos:prefLabel',
      predicate: 'ckccs:was_sent_to',
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
      labelPath: 'ckccs:source/skos:prefLabel',
      predicate: 'ckccs:source',
      type: 'list'
    },
    excipit: {
      id: 'excipit',
      facetValueFilter: '',
      label: 'Excipit',
      labelPath: 'ckccs:excipit/skos:prefLabel',
      predicate: 'ckccs:excipit',
      type: 'list'
    }
  }
}
