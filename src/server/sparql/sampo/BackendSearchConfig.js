import { perspective1Config } from './perspective_configs/Perspective1Config'
import { perspective2Config } from './perspective_configs/Perspective2Config'
import { perspective3Config } from './perspective_configs/Perspective3Config'
import { findsPerspectiveConfig } from './perspective_configs/FindsPerspectiveConfig'
import {
  productionPlacesQuery,
  lastKnownLocationsQuery,
  migrationsQuery,
  manuscriptPropertiesInstancePage,
  expressionProperties,
  collectionProperties,
  productionsByDecadeQuery,
  eventsByDecadeQuery,
  manuscriptNetworkLinksQuery,
  manuscriptNetworkNodesQuery
} from './sparql_queries/SparqlQueriesPerspective1'
import {
  workProperties
} from './sparql_queries/SparqlQueriesPerspective2'
import {
  eventProperties,
  eventPlacesQuery
} from './sparql_queries/SparqlQueriesPerspective3'
import {
  actorProperties
} from './sparql_queries/SparqlQueriesActors'
import {
  placePropertiesInstancePage,
  placePropertiesInfoWindow,
  manuscriptsProducedAt,
  lastKnownLocationsAt
} from './sparql_queries/SparqlQueriesPlaces'
import {
  findPropertiesInstancePage,
  findsPlacesQuery,
  findsTimelineQuery
} from './sparql_queries/SparqlQueriesFinds'
import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { makeObjectList } from '../SparqlObjectMapper'
import {
  mapPlaces,
  mapLineChart,
  mapMultipleLineChart
} from '../Mappers'

export const backendSearchConfig = {
  perspective1: perspective1Config,
  perspective2: perspective2Config,
  perspective3: perspective3Config,
  finds: findsPerspectiveConfig,
  manuscripts: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    instance: {
      properties: manuscriptPropertiesInstancePage,
      relatedInstances: ''
    }
  },
  works: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    instance: {
      properties: workProperties,
      relatedInstances: ''
    }
  },
  events: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    instance: {
      properties: eventProperties,
      relatedInstances: ''
    }
  },
  actors: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    instance: {
      properties: actorProperties,
      relatedInstances: ''
    }
  },
  places: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    instance: {
      properties: placePropertiesInstancePage,
      relatedInstances: ''
    }
  },
  expressions: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    instance: {
      properties: expressionProperties,
      relatedInstances: ''
    }
  },
  collections: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    instance: {
      properties: collectionProperties,
      relatedInstances: ''
    }
  },
  placesMsProduced: {
    perspectiveID: 'perspective1', // use endpoint config from perspective1
    q: productionPlacesQuery,
    filterTarget: 'manuscripts',
    resultMapper: mapPlaces,
    instance: {
      properties: placePropertiesInfoWindow,
      relatedInstances: manuscriptsProducedAt
    }
  },
  lastKnownLocations: {
    perspectiveID: 'perspective1',
    q: lastKnownLocationsQuery,
    filterTarget: 'manuscripts',
    resultMapper: mapPlaces,
    instance: {
      properties: placePropertiesInfoWindow,
      relatedInstances: lastKnownLocationsAt
    }
  },
  placesMsMigrations: {
    perspectiveID: 'perspective1',
    q: migrationsQuery,
    filterTarget: 'manuscript__id',
    resultMapper: makeObjectList
  },
  placesEvents: {
    perspectiveID: 'perspective3',
    q: eventPlacesQuery,
    filterTarget: 'manuscript__id',
    resultMapper: mapPlaces,
    instance: {
      properties: placePropertiesInfoWindow,
      relatedInstances: ''
    }
  },
  productionTimespanLineChart: {
    perspectiveID: 'perspective1',
    q: productionsByDecadeQuery,
    filterTarget: 'instance',
    resultMapper: mapLineChart
  },
  eventLineChart: {
    perspectiveID: 'perspective1',
    q: eventsByDecadeQuery,
    filterTarget: 'manuscript',
    resultMapper: mapMultipleLineChart
  },
  manuscriptInstancePageNetwork: {
    perspectiveID: 'perspective1',
    links: manuscriptNetworkLinksQuery,
    nodes: manuscriptNetworkNodesQuery,
    useNetworkAPI: true
  },
  findsPlaces: {
    perspectiveID: 'finds', // use endpoint config from finds
    q: findsPlacesQuery,
    filterTarget: 'id',
    resultMapper: mapPlaces,
    instance: {
      properties: findPropertiesInstancePage,
      relatedInstances: ''
    }
  },
  findsTimeline: {
    perspectiveID: 'finds', // use endpoint config from finds
    q: findsTimelineQuery,
    filterTarget: 'find',
    resultMapper: makeObjectList
  },
  jenaText: {
    perspectiveID: 'perspective1',
    properties: fullTextSearchProperties
  },
  federatedSearch: {
    datasets: federatedSearchDatasets
  }
}
