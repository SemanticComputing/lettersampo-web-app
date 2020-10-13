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
  // defaultConstraint: `
  //   VALUES ?source {
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Barlaeus%2C+Caspar> 
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Beeckman%2C+Isaac>
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Descartes%2C+Ren%C3%A9>
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Groot%2C+Hugo+de>
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Huygens%2C+Christiaan>
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Huygens%2C+Constantijn>
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Leeuwenhoek%2C+Antoni+van>
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Nierop%2C+Dirck+Rembrantsz+van>
  //     <http://emlo.bodleian.ox.ac.uk/id/source_Swammerdam%2C+Jan>
  //   }
  //   <SUBJECT> eschema:source ?source .
  // `,
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
      // parentProperty: 'crm:P89_falls_within',
      // parentPredicate: 'eschema:cofk_union_relationship_type-was_sent_from/crm:P89_falls_within+',
      // type: 'hierarchical'
      type: 'list'
    },
    to: {
      id: 'to',
      facetValueFilter: '',
      labelPath: 'eschema:cofk_union_relationship_type-was_sent_to/skos:prefLabel',
      predicate: 'eschema:cofk_union_relationship_type-was_sent_to',
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
    }
  }
}
