export default {
  languageLabel: 'English',
  html: {
    title: 'LetterSampo – Historical Letters on the Semantic Web',
    description: 'LetterSampo can be used for analysing epistolary data in different data repositories in different countries, or for aggegated international datasets, such as Republic of Letters Data.'
  },
  appTitle: {
    short: 'LetterSampo',
    long: ' LetterSampo',
    mobile: 'LS',
    subheading: `
      Historical Letters on the Semantic Web
    `
  },
  selectPerspective: 'Select a perspective to search and browse the knowledge graph:',
  mainPageImageLicence: 'Images used under license from Wikimedia Commons',
  backendErrorText: 'One of the backend services is not available at the moment. Please try again later.',
  topBar: {
    feedback: 'feedback',
    info: {
      info: 'Info',
      aboutTheProject: 'About the project',
      aboutTheProjectUrl: 'https://seco.cs.aalto.fi/projects/rrl/'
    },
    searchBarPlaceHolder: 'Search all content',
    searchBarPlaceHolderShort: 'Search',
    instructions: 'instructions',
    instructionsUrl: 'https://seco.cs.aalto.fi/projects/rrl/'

  },
  facetBar: {
    results: 'Results',
    activeFilters: 'Active filters:',
    removeAllFilters: 'Remove all',
    narrowDownBy: 'Narrow down by',
    filterOptions: 'Filter options',
    filterByName: 'Filter by name',
    filterByBoundingBox: 'Filter by bounding box',
    selectionOptions: 'Selection options',
    selectAlsoSubconcepts: 'Automatically select all subconcepts',
    doNotSelectSubconcepts: 'Do not select subconcepts',
    sortingOptions: 'Sorting options',
    sortAlphabetically: 'Sort alphabetically',
    sortByNumberOfSearchResults: 'Sort by number of search results',
    useDisjunction: 'Use logical OR between selections',
    useConjuction: 'Use logical AND between selections',
    minYear: 'Min year',
    maxYear: 'Max year',
    min: 'Min',
    max: 'Max',
    facetSearchFieldPlaceholder: 'Search...',
    applyFacetSelection: 'apply',
    pieChart: {
      tooltip: 'Pie chart'
    },
    barChart: {
      tooltip: 'Bar chart',
      language: {
        title: 'Language',
        xaxisTitle: 'Language',
        yaxisTitle: 'Manuscript count',
        seriesTitle: 'Manuscript count'
      }
    },
    lineChart: {
      tooltip: 'Line chart',
      productionTimespan: {
        title: 'Manuscript production by decade',
        xaxisTitle: 'Decade',
        yaxisTitle: 'Manuscript count',
        seriesTitle: 'Manuscript count'
      }
    }
  },
  tabs: {
    table: 'table',
    map: 'map',
    migrations: 'migrations',
    network: 'network',
    export: 'export',
    'by-year': 'by year',
    'letters-by-year': 'timeline of letters',
    'by-period': 'by period',
    'letter-network': 'network of letters',
    'social-signatures': 'social signatures',
    'top-correspondences': 'top correspondences',
    sentReceivedByPlace: 'timeline of letters',
    correspondenceTimeline: 'Letter Timeline',
    sentReceivedByTie: 'Timeline',
    tieNetwork: 'Network',
    letters: 'letters',
    heatmap: 'heatmap',
    statistics: 'statistics',
    download: 'download'
  },
  table: {
    rowsPerPage: 'Rows per page',
    of: 'of'
  },
  lineChart: {
    productionCount: 'Production',
    transferCount: 'Transfer of custody',
    observationCount: 'Observation',
    sentCount: 'Sent',
    receivedCount: 'Received',
    allCount: 'All',
    average: 'Average'
  },
  exportToYasgui: 'open the result table query in yasgui sparql editor',
  openInLinkedDataBrowser: 'open in linked data browser',
  resultsAsCSV: 'download the search results as a CSV table',
  facets: {
    dateFacet: {
      invalidDate: 'Epäkelpo päivämäärä.',
      toBeforeFrom: 'Alkupäivämäärän täytyy olla ennen loppupäivämäärää.',
      minDate: 'Aikaisin sallittu päivämäärä on {minDate}',
      maxDate: 'Myöhäisin sallittu päivämäärä on {maxDate}',
      cancel: 'Peruuta',
      fromLabel: 'Alku',
      toLabel: 'Loppu'
    },
    textFacet: {
      inputLabel: 'Etsi nimellä'
    }
  },
  leafletMap: {
    basemaps: {
      mapbox: {
        'light-v10': 'Mapbox Light'
      },
      googleRoadmap: 'Google Maps',
      topographicalMapNLS: 'Topographical map (National Land Survey of Finland)',
      backgroundMapNLS: 'Background map (National Land Survey of Finland)'
    },
    externalLayers: {
      arkeologiset_kohteet_alue: 'Register of Archaeological Sites, areas',
      arkeologiset_kohteet_piste: 'Register of Archaeological Sites, points',
      karelianMaps: 'Karelian maps, 1:100 000 topographic (SeCo)',
      senateAtlas: 'Senate atlas, 1:21 000 topographic (SeCo)',
      'kotus:pitajat': 'Finnish parishes in 1938 (Institute for the Languages of Finland)',
      'kotus:rajat-sms-alueet': 'Dialectical regions in Finland (Institute for the Languages of Finland)',
      'kotus:rajat-sms-alueosat': 'Dialectical subregions in Finland (Institute for the Languages of Finland)',
      'kotus:rajat-lansi-ita': 'Border between western and eastern dialects in Finland (Institute for the Languages of Finland)'
    },
    mapModeButtons: {
      markers: 'Markers',
      heatmap: 'Heatmap'
    },
    wrongZoomLevel: 'The map zoom level has to at least 11',
    wrongZoomLevelFHA: 'The map zoom level has to be at least 13 in order to show this layer',
    tooManyResults: 'More than 3000 results, please use clustered map or heatmap'
  },
  deckGlMap: {
    arcColouring: 'Arc colouring:',
    showMoreInformation: 'Click to show more information.',
    letterMigrations: {
      legendTitle: 'Arc colouring',
      legendFrom: 'Place of sending',
      legendTo: 'Place of receiving',
      from: 'Place of sending:',
      to: 'Place of receiving:',
      count: 'Letter count:',
      listHeadingSingleInstance: 'Letter:',
      listHeadingMultipleInstances: 'Letters:'
    }
  },
  perspectives: {
    fullTextSearch: {
      properties: {
        prefLabel: {
          label: 'Label'
        },
        type: {
          label: 'Type'
        }
      }
    },
    actors: {
      label: 'Actors',
      facetResultsType: 'actors',
      shortDescription: 'People or groups of people in the collection', // altogether 19716
      longDescription: `
        <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
          TODO: short instructions here
        </p>
       
      `,
      instancePage: {
        label: 'Actor',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            TODO: short instructions here
          </p>
        `
      },
      properties: {
        uri: {
          label: 'URI',
          description: 'Uniform Resource Identifier'
        },
        prefLabel: {
          label: 'Name',
          description: ''
        },
        gender: {
          label: 'Gender',
          description: 'The gender of a person.'
        },
        image: {
          label: 'Image',
          description: `
            Image source: Wikimedia Commons.
          `
        },
        type: {
          label: 'Type',
          description: 'Person or Group'
        },
        birthDateTimespan: {
          label: 'Birth time',
          description: `
          Birth time of a person
          `
        },
        birthPlace: {
          label: 'Place of Birth',
          description: `
          Place of Birth
          `
        },
        flourish: {
          label: 'Floruit',
          description: `
          Floruit, e.g. time of flourishing, time of activity.
          `
        },
        deathDateTimespan: {
          label: 'Death time',
          description: `
          Death time of a person
          `
        },
        deathPlace: {
          label: 'Place of Death',
          description: `
          Place of Death
          `
        },
        altLabel: {
          label: 'Alternative names or vocations',
          description: `
            Alternative names or vocations of the actor.
          `
        },
        external: {
          label: 'External databases',
          description: `
            Links to External databases.
          `
        },
        event: {
          label: 'Event',
          description: `
            Events related to the manuscript.
          `
        },
        owner: {
          label: 'Owner',
          description: `
            Former or current owners (individual or institutional).
          `
        },
        rel: {
          label: 'Related actors',
          description: `
            Related actors, e.g. parents, spouses, acquaintances.
          `
        },
        metrics: {
          label: 'Network metrics',
          description: `
            Network metrics, e.g. centrality measures of the actor in the letter network. 
            Each line has the label of the measure, its value, and the rank at the end in the parenthesis. 
            (rank - 1 = the number of people who have a higher measure value).
          `
        },
        numCorrespondences: {
          label: 'Number of correspondences',
          description: `
          Number of distinct correspondences.
          `
        },
        alter: {
          label: 'Correspondences',
          description: `
            Other actors who have been in correspondence with this actor. 
            The number of mutually sent letters is in parenthesis at end of the label.
          `
        },
        numSent: {
          label: 'Number of sent letters',
          description: `
            Number of sent letters.
          `
        },
        sentletter: {
          label: 'Sent letters',
          description: `
            List of sent letters.
          `
        },
        numReceived: {
          label: 'Number of received letters',
          description: `
            Number of received letters.
          `
        },
        receivedletter: {
          label: 'Received letters',
          description: `
            List of received letters.
          `
        },
        datasource: {
          label: 'Data source',
          description: `
            The data source where this actor is mentioned.
          `
        },
        knownLocation: {
          label: 'Known locations',
          description: `
            Known locations by letter correspondence.
          `
        },
        material: {
          label: 'Material',
          description: `
            The physical material on which the text is written.
          `
        }
      }
    },
    letters: {
      label: 'Letters',
      facetResultsType: 'letters',
      shortDescription: 'Information about the letters in the database', // altogether 152166
      longDescription: `
        <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
          TODO: short instructions here
        </p>
      `,
      instancePage: {
        label: 'Letter',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            TODO: short instructions here
          </p>
        `
      },
      properties: {
        uri: {
          label: 'URI',
          description: 'Uniform Resource Identifier'
        },
        prefLabel: {
          label: 'Title',
          description: 'The name or title of the Work.'
        },
        language: {
          label: 'Language',
          description: `
            The language in which a Work is written in the manuscript
            (i.e., an “Expression” of a Work). One manuscript may contain multiple languages.
          `
        },
        subject: {
          label: 'Subject',
          description: `
            The subject of the letter.
          `
        },
        datasource: {
          label: 'Data source',
          description: `
            The data source of the letter.
          `
        },
        excipit: {
          label: 'Excipit',
          description: `
          An excipit of the letter.
          `
        },
        description: {
          label: 'Description',
          description: `
            The description of the letter content.
          `
        },
        manuscript: {
          label: 'Manuscript',
          description: `
            The specific manuscript(s) in which the Work can be found.
          `
        },
        productionTimespan: {
          label: 'Date',
          description: `
            The date(s) when the manuscript(s) in which the Work can be found were written.
            Multiple production dates may appear for a single manuscript,
            when there are discrepancies between the contributing data source
            or when the precise date is uncertain.
          `
        },
        collection: {
          label: 'Collection',
          description: `
            The specific collection(s) of manuscripts in which a Work can be found.
          `
        },
        source: {
          label: 'Sender',
          description: `
            Sender of the letter.
          `
        },
        target: {
          label: 'Recipient',
          description: `
          Recipient of the letter.
          `
        },
        mentions: {
          label: 'Mentions',
          description: `
          An actor mentioned in the letter.
          `
        },
        store: {
          label: 'Stored in',
          description: `
          A place where this letter is stored.
          `
        },
        tie: {
          label: 'Correspondence',
          description: `
          Correspondence of all letters between the sender and the recipient.
          `
        },
        from: {
          label: 'Place of sending',
          description: `
          Place from where the letter was sent.
          `
        },
        to: {
          label: 'Place of receiving',
          description: `
          The receiving place of the letter.
          `
        },
        related: {
          label: 'External links',
          description: `
            External links.
          `
        }
      }
    },
    places: {
      label: 'Places',
      facetResultsType: 'Places',
      shortDescription: 'Related towns, cities, or countries', // 4532
      longDescription: `
        <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
          TODO: short instructions here
        </p>
      `,
      instancePage: {
        label: 'Place',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            TODO: short instructions here
          </p>
        `
      },
      properties: {
        uri: {
          label: 'URI',
          description: 'Uniform Resource Identifier'
        },
        prefLabel: {
          label: 'Name',
          description: `
            Place name.
          `
        },
        country: {
          label: 'Country',
          description: `
            Related country.
          `
        },
        location: {
          label: 'Coordinates',
          description: `
            Latitude and longitude of the place.
          `
        },
        broader: {
          label: 'Parent place',
          description: `
          Parent place, e.g. a municipality, county or country.
          `
        },
        narrower: {
          label: 'Places within',
          description: `
            Smaller places, e.g. towns and villages contained within the place.
          `
        },
        place: {
          label: 'Place',
          description: `
            The specific place(s) associated with the event.
          `
        },
        altLabel: {
          label: 'Alternative names',
          description: `
            Alternative names of the place.
          `
        },
        external: {
          label: 'External links',
          description: `
            External links.
          `
        },
        related: {
          label: 'Related actors',
          description: `
          Related actors, e.g. people or groups that have sent or received letters at this place.
          `
        },
        type: {
          label: 'Place type',
          description: `
            The type of the specific place(s) associated with the event.
          `
        },
        from: {
          label: 'Sent letters',
          description: `
          Letters sent from this place.
          `
        },
        to: {
          label: 'Received letters',
          description: `
          Letters sent to this place.
          `
        },
        image: {
          label: 'Image',
          description: `
            A possible image of the person. Source: Wikimedia Commons.
          `
        },
        source: {
          label: 'Source',
          description: `
            The source database (Schoenberg, Bibale, and Bodleian) that provided
            the information about the event.
          `
        }
      }
    },
    ties: {
      instancePage: {
        label: 'Correspondence',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            TODO: short instructions here
          </p>
        `
      },
      properties: {
        ego: {
          label: 'URI 1',
          description: 'Uniform Resource Identifier'
        },
        prefLabel1: {
          label: 'Actor 1',
          description: `
            Preferable actor label.
          `
        },
        alter: {
          label: 'URI 2',
          description: 'Uniform Resource Identifier'
        },
        prefLabel2: {
          label: 'Actor 2',
          description: `
            Preferable actor label.
          `
        },
        numLetters: {
          label: 'Number of letters',
          description: `
            Number of letters sent between the two actors.
          `
        },
        letter: {
          label: 'List of letters',
          description: `
            All letters sent between the two actors.
          `
        },
        other: {
          label: 'Related people',
          description: `
          People who have been in correspondence with both the sender and the recipient.
          `
        }
      }
    },
    metrics: {
      instancePage: {
        label: 'Network Metrics',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            TODO: short instructions here
          </p>
        `
      },
      properties: {
        highest: {
          label: 'Actors with highest values',
          description: 'Actors with highest values'
        },
        prefLabel: {
          label: 'Actor 1',
          description: `
            Label for Network Metric.
          `
        },
        related: {
          label: 'Related network metrics',
          description: `
          Other network metrics available in the data.
          `
        }
      }
    },
    sources: {
      instancePage: {
        label: 'Data source',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            TODO: short instructions here
          </p>
        `
      },
      properties: {
        prefLabel: {
          label: 'Label',
          description: `
            Preferable data source label.
          `
        },
        letter: {
          label: 'List of letters',
          description: `
            List of letters from this data source.
          `
        },
        numLetters: {
          label: 'Number of letters',
          description: `
            Number of letters from this data source.
          `
        }
      }
    }
  }
}
