import {
  actorPropertiesFacetResults,
  actorPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesActors'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const actorsConfig = {
  endpoint: {
    // url: 'http://localhost:3030/lettersampo/query',
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
    datasource: {
      id: 'datasource',
      facetValueFilter: '',
      label: 'Source',
      labelPath: 'ckccs:source',
      predicate: 'ckccs:source',
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
      sortByAscPredicate: 'ckccs:flourished/crm:P82a_begin_of_the_begin',
      sortByDescPredicate: 'ckccs:flourished/crm:P82b_end_of_the_end',
      predicate: 'ckccs:flourished',
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
          SELECT ?id (COALESCE(?_orderBy,0) AS ?orderBy)
          WHERE {
            VALUES ?facetClass { crm:E21_Person }
            ?id a ?facetClass .
            OPTIONAL { ?id ckccs:out_degree ?_orderBy }
          } 
        }
      `
    },
    num_received: {
      orderByPattern: `
        {
          SELECT ?id (COALESCE(?_orderBy,0) AS ?orderBy)
          WHERE {
            VALUES ?facetClass { crm:E21_Person }
            ?id a ?facetClass .
            OPTIONAL { ?id ckccs:in_degree ?_orderBy }
          } 
        }
      `
    },
    image: {
      labelPath: 'sch:image'
    }
  }
}
