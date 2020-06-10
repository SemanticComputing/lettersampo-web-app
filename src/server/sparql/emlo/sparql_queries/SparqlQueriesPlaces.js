export const placePropertiesInstancePage = `
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id crm:P89_falls_within ?area__id .
      ?area__id skos:prefLabel ?area__prefLabel .
      BIND(CONCAT("/places/page/", REPLACE(STR(?area__id), "^.*\\\\/(.+)", "$1")) AS ?area__dataProviderUrl)
    }
`

export const placePropertiesFacetResults = `
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
    }
    UNION
    {
      ?id  owl:sameAs
          |mmm-schema:data_provider_url
          |mmm-schema:geonames_uri
          ?source__id .
      OPTIONAL { ?source__id skos:prefLabel ?source__prefLabel_}
      BIND(?source__id AS ?source__dataProviderUrl)
      BIND(COALESCE(?source__prefLabel_, ?source__id) AS ?source__prefLabel)
    }
    UNION { ?id gvp:placeTypePreferred ?placeType }
    UNION {
      ?id gvp:broaderPreferred ?area__id .
      ?area__id skos:prefLabel ?area__prefLabel .
      BIND(CONCAT("/places/page/", REPLACE(STR(?area__id), "^.*\\\\/(.+)", "$1")) AS ?area__dataProviderUrl)
    }
`

export const placePropertiesInfoWindow = `
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

export const allPlacesQuery = `
  SELECT *
  WHERE {
    <FILTER>
    ?id a crm:E53_Place .
    ?id skos:prefLabel ?prefLabel .
    ?id dct:source ?source .
    OPTIONAL {
      ?id wgs84:lat ?lat ;
          wgs84:long ?long .
    }
    OPTIONAL {
      ?id gvp:broaderPreferred ?area__id .
      ?area__id skos:prefLabel ?area__prefLabel .
    }
    OPTIONAL { ?id gvp:placeTypePreferred ?placeType  }
    OPTIONAL { ?id skos:altLabel ?altLabel  }
    OPTIONAL { ?id mmm-schema:data_provider_url ?dataProviderUrl }
    OPTIONAL { ?id owl:sameAs ?placeAuthorityURI  }
    FILTER(?id != <http://ldf.fi/mmm/places/tgn_7031096>)
  }
`

export const manuscriptsProducedAt = `
    OPTIONAL {
      <FILTER>
      ?related__id ^crm:P108_has_produced/crm:P7_took_place_at ?id .
      ?related__id skos:prefLabel ?related__prefLabel .
      BIND(CONCAT("/manuscripts/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
    }
`

export const lastKnownLocationsAt = `
    OPTIONAL {
      <FILTER>
      ?related__id mmm-schema:last_known_location ?id .
      ?related__id skos:prefLabel ?related__prefLabel .
      BIND(CONCAT("/manuscripts/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
    }
`

export const actorsAt = `
    OPTIONAL {
      { ?related__id crm:P98i_was_born/crm:P7_took_place_at ?id }
      UNION
      { ?related__id crm:P100i_died_in/crm:P7_took_place_at ?id }
      UNION
      { ?related__id ^crm:P11_had_participant/crm:P7_took_place_at ?id }
      ?related__id skos:prefLabel ?related__prefLabel .
      BIND(CONCAT("/actors/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
    }
`
