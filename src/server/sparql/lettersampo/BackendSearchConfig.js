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
  sentReceivedQuery,
  correspondenceTimelineQuery
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
import { makeObjectList, mapPlaces, mapLineChart, mapMultipleLineChart, linearScale } from '../Mappers'

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
    resultMapper: mapMultipleLineChart,
    resultMapperConfig: {
      fillEmptyValues: false
    }
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
    resultMapper: mapLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
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
    resultMapper: mapMultipleLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  correspondenceTimeline: {
    perspectiveID: 'actors',
    q: correspondenceTimelineQuery,
    resultMapper: mapMultipleLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  sentReceivedByPlace: {
    perspectiveID: 'places',
    q: sentReceivedByPlaceQuery,
    resultMapper: mapMultipleLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  sentReceivedByTie: {
    perspectiveID: 'actors',
    q: tieLettersQuery,
    resultMapper: mapMultipleLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  tieNetwork: {
    perspectiveID: 'actors',
    q: tieLinksQuery,
    nodes: tieNodesQuery,
    useNetworkAPI: true
  }
}
