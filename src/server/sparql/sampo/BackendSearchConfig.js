import { perspective1Config } from './perspective_configs/Perspective1Config'
import { perspective2Config } from './perspective_configs/Perspective2Config'
import { perspective3Config } from './perspective_configs/Perspective3Config'
import {
  productionPlacesQuery,
  lastKnownLocationsQuery,
  migrationsQuery,
  manuscriptPropertiesInstancePage,
  expressionProperties,
  collectionProperties,
  productionsByDecadeQuery,
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
import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { makeObjectList } from '../SparqlObjectMapper'
import { mapPlaces, mapLineChart } from '../Mappers'

export const backendSearchConfig = {
  perspective1: perspective1Config,
  perspective2: perspective2Config,
  perspective3: perspective3Config,
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
  manuscriptInstancePageNetwork: {
    perspectiveID: 'perspective1',
    links: manuscriptNetworkLinksQuery,
    nodes: manuscriptNetworkNodesQuery,
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
