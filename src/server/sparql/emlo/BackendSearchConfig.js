import { actorsConfig } from './perspective_configs/ActorsConfig'
import { lettersConfig } from './perspective_configs/LettersConfig'
import { placesConfig } from './perspective_configs/PlacesConfig'
import {
  letterLinksQuery,
  networkLinksQuery,
  networkNodesQuery,
  networkNodesFacetQuery,
  peopleEventPlacesQuery,
  sentReceivedQuery,
  actorLettersInstancePageQuery
} from './sparql_queries/SparqlQueriesActors'
import {
  letterMigrationsQuery,
  letterByYearQuery
} from './sparql_queries/SparqlQueriesLetters'
import {
  placePropertiesInfoWindow,
  peopleRelatedTo,
  sentReceivedByPlaceQuery
} from './sparql_queries/SparqlQueriesPlaces'
import {
  tiePropertiesInstancePage,
  tieLettersQuery,
  tieLinksQuery,
  tieNodesQuery
} from './sparql_queries/SparqlQueriesTies'
import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { makeObjectList } from '../SparqlObjectMapper'
import { mapPlaces, mapLineChart, mapMultipleLineChart } from '../Mappers'

export const backendSearchConfig = {
  actors: actorsConfig,
  letters: lettersConfig,
  places: placesConfig,
  actorLetters: {
    perspectiveID: 'actors',
    q: actorLettersInstancePageQuery,
    resultMapper: makeObjectList
  },
  ties: {
    perspectiveID: 'actors',
    instance: {
      properties: tiePropertiesInstancePage,
      relatedInstances: ''
    }
  },
  letterMigrations: {
    perspectiveID: 'letters',
    q: letterMigrationsQuery,
    filterTarget: 'letter__id',
    resultMapper: makeObjectList
  },
  letterNetwork: {
    perspectiveID: 'actors',
    q: letterLinksQuery,
    nodes: networkNodesQuery,
    useNetworkAPI: true
  },
  // Network tab in people facet results
  actorNetwork: {
    perspectiveID: 'actors',
    q: networkLinksQuery,
    nodes: networkNodesFacetQuery,
    filterTarget: 'actor',
    useNetworkAPI: true
  },
  letterByYear: {
    perspectiveID: 'letters',
    q: letterByYearQuery,
    filterTarget: 'letter__id',
    resultMapper: mapLineChart
  },
  placesActors: {
    perspectiveID: 'actors',
    q: peopleEventPlacesQuery,
    filterTarget: 'person',
    resultMapper: mapPlaces,
    instance: {
      properties: placePropertiesInfoWindow,
      relatedInstances: peopleRelatedTo
    }
  },
  jenaText: {
    perspectiveID: 'actors',
    properties: fullTextSearchProperties
  },
  federatedSearch: {
    datasets: federatedSearchDatasets
  },
  sentReceived: {
    perspectiveID: 'actors',
    q: sentReceivedQuery,
    resultMapper: mapMultipleLineChart
  },
  sentReceivedByPlace: {
    perspectiveID: 'places',
    q: sentReceivedByPlaceQuery,
    resultMapper: mapMultipleLineChart
  },
  sentReceivedByTie: {
    perspectiveID: 'actors',
    q: tieLettersQuery,
    resultMapper: mapMultipleLineChart
  },
  tieNetwork: {
    perspectiveID: 'actors',
    q: tieLinksQuery,
    nodes: tieNodesQuery,
    useNetworkAPI: true
  }
}
