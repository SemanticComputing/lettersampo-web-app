export default {
  languageLabel: 'English',
  appTitle: {
    short: 'LetterSampo',
    long: ' &nbsp; &nbsp; LetterSampo  &nbsp; &nbsp;',
    subheading: `
      Republic of Letters
    `
  },
  appDescription: `
    
  `,
  appDescription1: `
    Sampo is a web service for searching and studying place names. The search results
    can be viewed as a table, on maps, and as statistical distributions. 
    Historical and current background maps are provided.
  `,
  appDescription2: `
    Start by choosing source dataset(s) and input a place name on the search field.
    Alternatively you can search by area. 
  `,
  appDescription3: `
    
  `,
  appDescription4: `
  
  `,
  selectPerspective: 'Select a perspective to search and browse the knowledge graph:',
  mainPageImageLicence: 'Images used under license from Shutterstock.com',
  topBar: {
    feedback: 'feedback',
    info: {
      info: 'Info',
      blog: 'Project blog',
      blogUrl: 'https://seco.cs.aalto.fi',
      aboutThePortal: 'About the Portal'
    },
    searchBarPlaceHolder: 'Search all content',
    searchBarPlaceHolderShort: 'Search',
    instructions: 'instructions'
  },
  facetBar: {
    results: 'Results',
    narrowDownBy: 'Narrow down by',
    filterOptions: 'Filter options',
    filterByName: 'Filter by name',
    filterByBoundingBox: 'Filter by bounding box',
    selectionOptions: 'Selection options',
    selectAlsoSubconcepts: 'Automatically select all subconcepts',
    doNotSelectSubconcepts: 'Do not select subconcepts',
    sortingOptions: 'Sorting options',
    sortAlphabetically: 'Sort alphabetically',
    sortByNumberOfSearchResults: 'Sort by number of search results'
  },
  tabs: {
    table: 'table',
    map: 'map',
    migrations: 'migrations',
    network: 'network',
    export: 'export',
    by_year: 'by year',
    'by-period': 'by period',
    letterNetwork: 'Network of letters',
    sentReceived: 'Timeline of letters',
    sentReceivedByPlace: 'Timeline of letters',
    sentReceivedByTie: 'Timeline of letters',
    map_clusters: 'clustered map',
    map_markers: 'map',
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
    allCount: 'All'
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
  instancePageGeneral: {
    introduction: `
      <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
        This landing page provides a human-readable summary of the data points that link
        to this {entity}. The data included in this summary reflect only those data points
        used in the MMM Portal. Click the Open in Linked Data Browser on button on the
        Export tab to view the complete set of classes and properties linked to this record.
      </p>
      <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
        To cite this record, use its url. You can use also use the url to return directly
        to the record at any time.
      </p>
    `,
    repetition: `
      <h6 class="MuiTypography-root MuiTypography-h6">
        Repetition of data
      </h6>
      <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
        The same or similar data may appear within a single data field multiple times.
        This repetition occurs due to the merging of multiple records from different datasets
        to create the MMM record.
      </p>
    `
  },
  perspectives: {
    actors: {
      label: 'Actors',
      facetResultsType: 'actors',
      shortDescription: 'Description',
      longDescription: `
        <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
          Use this perspective to access data related to physical manuscript objects.
          If two or more source datasets include the same manuscript and
          this has been verified, the information from the source datasets has been merged
          into one manuscript. See <a href="/instructions">instructions</a> for using the
          filters. The result view can be selected using the tabs:
        </p>
        <ul class="MuiTypography-root MuiTypography-body1">
          <li>
            <strong>TABLE</STRONG> view includes all manuscripts in
            the MMM data. One table row is equivalent to one manuscript.
          </li>
          <li>
            <strong>PRODUCTION PLACES</STRONG> view visualizes the connection
            between manuscripts and the places where they were produced.
          </li>
          <li>
            <strong>MIGRATIONS</strong> view visualizes the migration of a
            manuscript from place of production to its most recently observed location.
          </li>
          <li>
            <strong>EXPORT</strong> the SPARQL query used to generate the result
            table view into YASGUI query editor.
          </li>
        </ul>
      `,
      instancePage: {
        label: 'Actor',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            TODO: description.
          </p>
        `
      },
      properties: {
        uri: {
          label: 'URI',
          description: 'Uniform Resource Identifier'
        },
        prefLabel: {
          label: 'Label',
          description: 'A short label describing the manuscript.'
        },
        author: {
          label: 'Author',
          description: `
            The author(s) who have contributed to the intellectual content (works)
            contained in the manuscript.
          `
        },
        gender: {
          label: 'Gender',
          description: 'The gender of a person.'
        },
        type: {
          label: 'Type',
          description: 'The type is a Person or a Group.'
        },
        birthDateTimespan: {
          label: 'Birth date',
          description: `
          Birth date of a person
          `
        },
        birthPlace: {
          label: 'Place of Birth',
          description: `
          Place of Birth
          `
        },
        deathDateTimespan: {
          label: 'Death date',
          description: `
          Death date of a person
          `
        },
        deathPlace: {
          label: 'Place of Death',
          description: `
          Place of Death
          `
        },
        altLabel: {
          label: 'Alternative names or occupations',
          description: `
            Alternative names or occupations of the actor.
          `
        },
        related: {
          label: 'External links',
          description: `
            External links.
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
        alter: {
          label: 'Correspondences',
          description: `
            Other actors who have been in correspondence with this actor. 
            The number of mutually sent letters is in parenthesis at end of the label.
          `
        },
        num_sent: {
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
        num_received: {
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
        transferOfCustodyTimespan: {
          label: 'Transfer of Custody Date',
          description: `
            The dates of “Transfer of Custody” events related to the manuscript.
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
        },
        height: {
          label: 'Height',
          description: `
            The height of the manuscript in millimeters.
          `
        },
        width: {
          label: 'Width',
          description: `
            The width of the manuscript in millimeters.
          `
        },
        folios: {
          label: 'Folios',
          description: `
            The number of folios (leaves).
          `
        },
        lines: {
          label: 'Lines',
          description: `
            The number of lines in a text block. Left blank if the number of lines
            occurring throughout the manuscript is too irregular to be a useful
            descriptor for searching.
          `
        },
        columns: {
          label: 'Columns',
          description: `
            The number of columns. Left blank if the number of columns
            occurring throughout the manuscript is too irregular to be a useful
            descriptor for searching.
          `
        },
        miniatures: {
          label: 'Miniatures',
          description: `
            The number of miniatures.
          `
        },
        decoratedInitials: {
          label: 'Decorated initials',
          description: `
            The number of decorated initials.
          `
        },
        historiatedInitials: {
          label: 'Historiated initials',
          description: `
            The number of historiated initials.
          `
        },
        source: {
          label: 'Source',
          description: `
            The source dataset(s) (Bibale, Bodleian, or SDBM) contributing the
            information on the manuscript. If two or more source datasets include
            the same manuscript and this has been manually verified, the information
            from the source datasets have been merged into one manuscript (table row).
             Click on the links to view the original record on the source’s website.
          `
        }
      }
    },
    letters: {
      label: 'Letters',
      facetResultsType: 'letters',
      shortDescription: 'Description',
      longDescription: `
        <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
          TODO: description.
        </p>
      `,
      instancePage: {
        label: 'Letter',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            TODO: description.
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
          label: 'Receiver',
          description: `
          Receiver of the letter.
          `
        },
        other: {
          label: 'Correspondence',
          description: `
          Correspondence of all letters between the sender and the receiver.
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
        }

      }
    },
    places: {
      label: 'Places',
      facetResultsType: 'Places',
      shortDescription: 'Description',
      longDescription: `
        <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
          Use this perspective to access data related to events associated with the
          histories of manuscripts and manuscript collections over the centuries.
          See <a href="/instructions">instructions</a> for using the filters.
          The result view can be selected using the tabs:
        </p>
        <ul class="MuiTypography-root MuiTypography-body1">
          <li>
            <strong>TABLE</STRONG> view includes all events in the MMM data.
          </li>
          <li>
            <strong>MAP</STRONG> view visualizes the events that have location information on a map.
          </li>
          <li>
            <strong>EXPORT</strong> the SPARQL query used to generate the result
            table view into YASGUI query editor.
          </li>
        </ul>
      `,
      instancePage: {
        label: 'Place',
        description: `
          <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
            Events refer to various activities related to Manuscripts and Actors. Event
            types include Production, Transfer of Custody, and Activity events.
            Production events refer to the production of the physical manuscript.
            Transfer of Custody events indicate a change of ownership that involved
            a transaction of some kind, usually through an auction house or bookseller.
            The generic Activity event type covers all other types of events.
          </p>
        `
      },
      properties: {
        uri: {
          label: 'URI',
          description: 'Uniform Resource Identifier'
        },
        prefLabel: {
          label: 'Label',
          description: `
            Preferable place label.
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
            TODO: description.
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
        letter: {
          label: 'Sent letters',
          description: `
            All letters sent between the two people.
          `
        },
        other: {
          label: 'Related people',
          description: `
          People who have been in correspondence with both the sender and the receiver.
          `
        }
      }
    }
  },
  aboutThePortal: `
    <h1 class="MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom">
      About the Portal
    </h1>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Morbi nunc ex, ultrices vitae molestie eu, fringilla quis dolor. Vivamus in enim nibh. 
      Nunc rutrum molestie ex eget dictum. Mauris lectus leo, ultrices in sodales ac, fermentum 
      ut massa. In porta, mauris sed facilisis lacinia, eros magna sollicitudin tortor, quis venenatis 
      nisl ipsum lacinia justo. Duis pretium bibendum consequat. 
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In 
      hac habitasse platea dictumst. Curabitur consectetur aliquet est, ac dapibus ante semper vitae. 
      Sed consequat at est ac lobortis. In vitae metus in ligula pretium vehicula. Aliquam maximus 
      ac massa euismod eleifend. Vestibulum vehicula mattis libero at tempus.
    </p>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Data
    </h2>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Nullam eu blandit ex, quis consectetur enim. Nulla aliquam, enim non euismod tincidunt, 
      neque eros tincidunt urna, eget elementum diam metus vel elit. Donec dui augue, vehicula a cursus ut, 
      efficitur eget velit. Aliquam pellentesque odio vel metus sodales tempor. Donec in lectus magna. 
      Cras at odio a libero laoreet viverra nec sed lorem. In malesuada tempus dolor. 
      Suspendisse et ligula quis nisi facilisis maximus. Sed dictum justo eu condimentum efficitur. 
      Mauris porttitor ante nec auctor vulputate. Phasellus varius, odio sed egestas bibendum, 
      dolor lacus consequat turpis, ac pulvinar libero lorem maximus nunc. Praesent egestas volutpat 
      leo, vel faucibus dui convallis sed. Ut sed libero eu nisi accumsan mollis. Pellentesque 
      ultricies est non porta luctus. Maecenas eget viverra mauris.
    </p>
    <ul class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom">
      <li>
        <a href=""
          target='_blank' rel='noopener noreferrer'
        >
          Suspendisse et ligula quis
        </a>
      </li>
      <li>
        <a href=""
          target='_blank' rel='noopener noreferrer'
        >
          Aliquam pellentesque odio
        </a>
      </li>
      <li>
        <a href=""
          target='_blank' rel='noopener noreferrer'
        >
          Cras at odio a libero laoreet
        </a>
      </li>
    </ul>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Mauris porttitor ante nec auctor vulputate. Phasellus varius, odio sed egestas bibendum, 
      dolor lacus consequat turpis, ac pulvinar libero lorem maximus nunc. Praesent egestas volutpat 
      leo, vel faucibus dui convallis sed. Ut sed libero eu nisi accumsan mollis. Pellentesque 
      ultricies est non porta luctus. Maecenas eget viverra mauris.
      </p>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Data Reuse
    </h2>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Nullam eu blandit ex, quis consectetur enim. Nulla aliquam, enim non euismod tincidunt, 
      neque eros tincidunt urna, eget elementum diam metus vel elit. Donec dui augue, vehicula a cursus ut, 
      efficitur eget velit. Aliquam pellentesque odio vel metus sodales tempor. Donec in lectus magna. 
      Cras at odio a libero laoreet viverra nec sed lorem. In malesuada tempus dolor. 
      Suspendisse et ligula quis nisi facilisis maximus. Sed dictum justo eu condimentum efficitur. 
      Mauris porttitor ante nec auctor vulputate. Phasellus varius, odio sed egestas bibendum, 
      dolor lacus consequat turpis, ac pulvinar libero lorem maximus nunc. Praesent egestas volutpat 
      leo, vel faucibus dui convallis sed. Ut sed libero eu nisi accumsan mollis. Pellentesque 
      ultricies est non porta luctus. Maecenas eget viverra mauris.
    </p>
    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      More Information
    </h2>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Nullam eu blandit ex, quis consectetur enim. Nulla aliquam, enim non euismod tincidunt, 
      neque eros tincidunt urna, eget elementum diam metus vel elit. Donec dui augue, vehicula a cursus ut, 
      efficitur eget velit. Aliquam pellentesque odio vel metus sodales tempor. Donec in lectus magna. 
      Cras at odio a libero laoreet viverra nec sed lorem. In malesuada tempus dolor. 
      Suspendisse et ligula quis nisi facilisis maximus. Sed dictum justo eu condimentum efficitur. 
      Mauris porttitor ante nec auctor vulputate. Phasellus varius, odio sed egestas bibendum, 
      dolor lacus consequat turpis, ac pulvinar libero lorem maximus nunc. Praesent egestas volutpat 
      leo, vel faucibus dui convallis sed. Ut sed libero eu nisi accumsan mollis. Pellentesque 
      ultricies est non porta luctus. Maecenas eget viverra mauris.
    </p>
  `,
  instructions: `
    <h1 class="MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom">
      Instructions
    </h1>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      The search functionality of this semantic portal is based on the
      <a href="https://doi.org/10.2200/S00190ED1V01Y200904ICR005" target='_blank' rel='noopener noreferrer'>
      faceted search</a> paradigm. By default each perspective displays
      all results from the corresponding class.
      This default result set can be narrowed down by using the filters on the left.
    </p>

    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Using a single filter
    </h2>

    <h3 class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom">
      Selecting values within a filter
    </h3>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      All possible values for a filter are displayed either as a list or as a hierarchical
      tree structure (if available). The number of results is shown in brackets for each value.
      Once a value is selected, the results are automatically updated. To prevent further
      selections that do not return any results, also the possible values for all
      other filters are updated at the same time.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Multiple values can be selected within a single filter. Selecting multiple values
      generates results that contain any of the selected values. For example, selecting
      both <i>Saint Augustine</i> and <i>Saint Jerome</i> as an Author returns results that
      include either <i>Saint Augustine</i> <strong>OR</strong> <i>Saint Jerome</i> as an Author.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Selected values of a filter appear in the Active filters section at the top of the list
      of filters. To deselect a filter, click the X mark next to it within the Active filters
      section. You can also deselect a filter value by unchecking the checkmark in the
      filter’s value list. The Active filters section only appears if there are filter
      values currently selected.
    </p>

    <h3 class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom">
      Searching within a filter
    </h3>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Search within a filter by using the search field at the top of each filter.
      All possible values of a filter remain visible at all times. The values of
      the filter that match the search term are indicated by a purple underline.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Steps for searching within filters:
    </p>
    <ol class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom">
      <li>
        Type search term into search field. If there are matches, a number
        will appear to the right of the search field, indicating the number
        of filter values that match the search term.
      </li>
      <li>
        Click the arrows to the right of the search field to cycle
        through the results. As you click the arrow, a different filter value
        will appear at the top of the list. Matched filters are underlined in
        purple.
      </li>
      <li>
        Click the checkmark next to a filter value to activate it. The results
        (and also other filters) are automatically updated.
      </li>
    </ol>

    <h2 class="MuiTypography-root MuiTypography-h4 MuiTypography-gutterBottom">
      Using multiple filters simultaneously
    </h2>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      The effectiveness of faceted search is realized when multiple filters are
      applied at the same time. As in many e-commerce sites, a logical AND is
      always used between the filters. For example selecting <i>Saint Augustine </i>
      and <i>Saint Jerome</i> as an Author and <i>Sir Thomas Phillipps</i> and
      <i> Thomas Thorpe</i> as an Owner, the results are narrowed down as follows:
    </p>
    <p class="MuiTypography-root MuiTypography-body1">
      (Author: <i>Saint Augustine</i> <strong>OR</strong> Author: <i>Saint Jerome</i>)
    </p>
    <p class="MuiTypography-root MuiTypography-body1">
        <strong>AND</strong>
    </p>
    <p class="MuiTypography-root MuiTypography-body1">
      (Owner: <i>Sir Thomas Phillipps</i> <strong>OR</strong> Owner: <i>Thomas Thorpe</i>)
    </p>
  `,
  feedback: `
    <h1 class="MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom">
      Feedback
    </h1>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      This semantic portal has been developed by ...
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      We are interested in your feedback on the functionality, coverage, and usefulness of the portal and its data.
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Please complete our
      <a href="" target='_blank' rel='noopener noreferrer'>Feedback Survey Form (add link).</a>
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      You can also contact us via email: ... or DM us on Twitter: ...
    </p>
    <p class="MuiTypography-root MuiTypography-body1 MuiTypography-paragraph">
      Please be aware that this portal’s response times may be affected by the size and complexity
      of the underlying knowledge graph.
    </p>
    `
}
