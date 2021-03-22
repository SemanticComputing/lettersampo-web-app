import {
  actorPropertiesFacetResults,
  actorPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesActors'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const actorsConfig = {
  endpoint: {
    url: 'http://ldf.fi/ckcc/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: 'crm:E21_Person crm:E74_Group',
  paginatedResults: {
    properties: actorPropertiesFacetResults
  },
  instance: {
    properties: actorPropertiesInstancePage,
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
    type: {
      id: 'type',
      facetValueFilter: '',
      label: 'Type',
      labelPath: 'a',
      predicate: 'a',
      type: 'text'
    },
    birthDateTimespan: {
      id: 'birthDateTimespan',
      facetValueFilter: '',
      sortByAscPredicate: 'ckccs:birthDate/crm:P82a_begin_of_the_begin',
      sortByDescPredicate: 'ckccs:birthDate/crm:P82b_end_of_the_end',
      predicate: 'ckccs:birthDate',
      startProperty: 'crm:P82a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      dataType: 'xsd:dateTime',
      type: 'timespan'
    },
    flourish: {
      id: 'flourish',
      facetValueFilter: '',
      sortByAscPredicate: 'ckccs:has_flourish/crm:P82a_begin_of_the_begin',
      sortByDescPredicate: 'ckccs:has_flourish/crm:P82b_end_of_the_end',
      predicate: 'ckccs:has_flourish',
      startProperty: 'crm:P82a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      dataType: 'xsd:dateTime',
      type: 'timespan'
    },
    deathDateTimespan: {
      id: 'deathDateTimespan',
      facetValueFilter: '',
      sortByAscPredicate: 'ckccs:deathDate/crm:P82a_begin_of_the_begin',
      sortByDescPredicate: 'ckccs:deathDate/crm:P82b_end_of_the_end',
      predicate: 'ckccs:deathDate',
      startProperty: 'crm:P82a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      dataType: 'xsd:dateTime',
      type: 'timespan'
    },
    num_sent: { // TODO: is there now an easier way to do this?
      orderByPattern: `
        {
          SELECT ?id ?orderBy
          WHERE {
            VALUES ?facetClass { <FACET_CLASS> }
            ?id a ?facetClass ; ckccs:out_degree ?orderBy
          } 
        }
      `
    },
    num_received: {
      orderByPattern: `
        {
          SELECT ?id ?orderBy
          WHERE {
            VALUES ?facetClass { <FACET_CLASS> }
            ?id a ?facetClass ; ckccs:in_degree ?orderBy
          } 
        }
      `
    },
    image: {
      labelPath: 'sch:image'
    }
  }
}
