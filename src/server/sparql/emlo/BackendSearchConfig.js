import { perspective1Config } from './perspective_configs/Perspective1Config'
import { perspective2Config } from './perspective_configs/Perspective2Config'
import { perspective3Config } from './perspective_configs/Perspective3Config'
import {
  letterLinksQuery,
  networkNodesQuery
} from './sparql_queries/SparqlQueriesPerspective1'
import {
  letterMigrationsQuery
} from './sparql_queries/SparqlQueriesPerspective2'
// import {
//   eventProperties,
//   eventPlacesQuery
// } from './sparql_queries/SparqlQueriesPerspective3'
import {
  placePropertiesInstancePage
  // placePropertiesInfoWindow,
} from './sparql_queries/SparqlQueriesPlaces'
import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { makeObjectList } from '../SparqlObjectMapper'
// import { mapPlaces } from '../Mappers'


export const backendSearchConfig = {
  perspective1: perspective1Config,
  perspective2: perspective2Config,
  perspective3: perspective3Config,
  places: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    instance: {
      properties: placePropertiesInstancePage,
      relatedInstances: ''
    }
  },
  letterMigrations: {
    perspectiveID: 'perspective2', // use endpoint config from perspective2
    q: letterMigrationsQuery,
    filterTarget: 'letter__id',
    resultMapper: makeObjectList
  },
  letterNetwork: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    links: letterLinksQuery,
    nodes: networkNodesQuery,
    useNetworkAPI: true
  },
  jenaText: {
    perspectiveID: 'perspective1',
    properties: fullTextSearchProperties
  },
  federatedSearch: {
    datasets: federatedSearchDatasets
  }
}
