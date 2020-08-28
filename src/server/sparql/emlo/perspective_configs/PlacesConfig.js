import {
  placePropertiesInstancePage,
  placePropertiesFacetResults
} from '../sparql_queries/SparqlQueriesPlaces'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const placesConfig = {
  endpoint: {
    url: 'http://ldf.fi/emlo/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: 'crm:E53_Place',
  paginatedResults: {
    properties: placePropertiesFacetResults
  },
  instance: {
    properties: placePropertiesInstancePage,
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
    type: {
      predicate: 'a',
      facetValueFilter: `
        FILTER(?id NOT IN (
          <http://ldf.fi/mmm/schema/PlaceNationality>
        ))  
      `,
      type: 'list',
      labelPath: 'a/(skos:prefLabel|rdfs:label)'
    },
    country: {
      id: 'country',
      facetValueFilter: 'FILTER EXISTS { ?id a eschema:Country }',
      label: 'Country',
      labelPath: 'crm:P89_falls_within+/skos:prefLabel',
      predicate: 'crm:P89_falls_within+',
      type: 'text'
    },
    broader: {
      id: 'broader',
      facetValueFilter: '',
      label: 'Broader',
      labelPath: 'crm:P89_falls_within/skos:prefLabel',
      predicate: 'crm:P89_falls_within',
      type: 'text'
    },
    narrower: {
      id: 'narrower',
      facetValueFilter: '',
      label: 'Narrower',
      labelPath: '^crm:P89_falls_within/skos:prefLabel',
      predicate: '^crm:P89_falls_within',
      type: 'text'
    }
  }
}
