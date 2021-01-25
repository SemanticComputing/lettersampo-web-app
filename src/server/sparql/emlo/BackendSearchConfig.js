import { actorsConfig } from './perspective_configs/ActorsConfig'
import { lettersConfig } from './perspective_configs/LettersConfig'
import { placesConfig } from './perspective_configs/PlacesConfig'
import {
  actorLettersInstancePageQuery,
  letterLinksQuery,
  networkLinksQuery,
  networkNodesQuery,
  networkNodesFacetQuery,
  socialSignatureQuery,
  peopleEventPlacesQuery,
  sentReceivedQuery
} from './sparql_queries/SparqlQueriesActors'
import {
  letterMigrationsQuery,
  letterMigrationsDialogQuery,
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
import {
  sourcePropertiesInstancePage
} from './sparql_queries/SparqlQueriesSources'

import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { makeObjectList } from '../SparqlObjectMapper'
import { mapPlaces, mapLineChart, linearScale } from '../Mappers'
import { mapMultipleLineChart } from '../cckc_Mappers'

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
  sources: {
    perspectiveID: 'actors',
    instance: {
      properties: sourcePropertiesInstancePage,
      relatedInstances: ''
    }
  },
  letterMigrations: {
    perspectiveID: 'letters',
    q: letterMigrationsQuery,
    filterTarget: 'letter',
    resultMapper: makeObjectList,
    postprocess: {
      func: linearScale,
      config: {
        variable: 'instanceCount',
        minAllowed: 3,
        maxAllowed: 30
      }
    }
  },
  letterMigrationsDialog: {
    perspectiveID: 'letters',
    q: letterMigrationsDialogQuery,
    filterTarget: 'id',
    resultMapper: makeObjectList
  },
  letterNetwork: {
    perspectiveID: 'actors',
    q: letterLinksQuery,
    nodes: networkNodesQuery,
    useNetworkAPI: true
  },
  socialSignature: {
    perspectiveID: 'actors',
    q: socialSignatureQuery,
    nodes: '',
    useNetworkAPI: true,
    queryType: 'signature',
    resultMapper: mapMultipleLineChart
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
