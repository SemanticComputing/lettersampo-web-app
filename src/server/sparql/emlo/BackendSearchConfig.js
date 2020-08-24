import { perspective1Config } from './perspective_configs/Perspective1Config'
import { perspective2Config } from './perspective_configs/Perspective2Config'
import { perspective3Config } from './perspective_configs/Perspective3Config'
import {
  letterLinksQuery,
  networkNodesQuery,
  peopleEventPlacesQuery,
  sentReceivedQuery
} from './sparql_queries/SparqlQueriesPerspective1'
import {
  letterMigrationsQuery,
  letterByYearQuery
} from './sparql_queries/SparqlQueriesPerspective2'
/**
import {
  placeProperties
//   eventPlacesQuery
} from './sparql_queries/SparqlQueriesPerspective3'
*/
import {
  placePropertiesInstancePage,
  placePropertiesInfoWindow,
  peopleRelatedTo
} from './sparql_queries/SparqlQueriesPlaces'
import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { makeObjectList } from '../SparqlObjectMapper'
import { mapPlaces, mapLineChart, mapMultipleLineChart } from '../Mappers'

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
  letterByYear: {
    perspectiveID: 'perspective2',
    q: letterByYearQuery,
    filterTarget: 'letter__id',
    resultMapper: mapLineChart
  },
  placesActors: {
    perspectiveID: 'perspective1', // use endpoint config from people
    q: peopleEventPlacesQuery,
    filterTarget: 'person',
    resultMapper: mapPlaces,
    instance: {
      properties: placePropertiesInfoWindow,
      relatedInstances: peopleRelatedTo
    }
  },
  jenaText: {
    perspectiveID: 'perspective1',
    properties: fullTextSearchProperties
  },
  federatedSearch: {
    datasets: federatedSearchDatasets
  },
  sentReceived: {
    perspectiveID: 'perspective1',
    q: sentReceivedQuery,
    // filterTarget: 'id',
    resultMapper: mapMultipleLineChart
  }
}
