const perspectiveID = 'perspective1'

export const manuscriptPropertiesInstancePage =
`   {
      ?id skos:prefLabel ?prefLabel__id .
      BIND (?prefLabel__id as ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id foaf:gender ?code . 
      VALUES (?code ?gender) { 
        (sdmx-code:sex-M "Male") 
        (sdmx-code:sex-F "Female") 
      }
      BIND(?gender as ?gender__prefLabel)
    }
`

export const manuscriptPropertiesFacetResults =
  `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
  }
  UNION
  {
    ?id foaf:gender ?code . 
    VALUES (?code ?gender) { 
      (sdmx-code:sex-M "Male") 
      (sdmx-code:sex-F "Female") 
    }
    BIND(?gender as ?gender__prefLabel)
  }
  UNION
  {
    ?id eschema:birthDate ?birthDateTimespan__id .
    ?birthDateTimespan__id skos:prefLabel ?birthDateTimespan__prefLabel .
    OPTIONAL { ?birthDateTimespan__id crm:P82a_begin_of_the_begin ?birthDateTimespan__start }
    OPTIONAL { ?birthDateTimespan__id crm:P82b_end_of_the_end ?birthDateTimespan__end }
  }
  UNION
  {
    ?id eschema:deathDate ?deathDateTimespan__id .
    ?deathDateTimespan__id skos:prefLabel ?deathDateTimespan__prefLabel .
    OPTIONAL { ?deathDateTimespan__id crm:P82a_begin_of_the_begin ?deathDateTimespan__start }
    OPTIONAL { ?deathDateTimespan__id crm:P82b_end_of_the_end ?deathDateTimespan__end }
  }
`

export const expressionProperties =
`   {
      ?id skos:prefLabel ?prefLabel__id .
      BIND (?prefLabel__id as ?prefLabel__prefLabel)
      BIND(CONCAT("/expressions/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id dct:source ?source__id .
      ?source__id skos:prefLabel ?source__prefLabel .
      ?source__id mmm-schema:data_provider_url ?source__dataProviderUrl .
    }
    UNION
    {
      ?id ^crm:P128_carries ?manuscript__id .
      ?manuscript__id skos:prefLabel ?manuscript__prefLabel .
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
    }
    UNION
    {
      ?id crm:P72_has_language ?language__id .
      ?language__id skos:prefLabel ?language__prefLabel .
      BIND(?language__id as ?language__dataProviderUrl)
    }
`

export const collectionProperties =
 `  {
       ?id skos:prefLabel ?prefLabel__id .
       BIND (?prefLabel__id as ?prefLabel__prefLabel)
       BIND(CONCAT("/collections/page/", ENCODE_FOR_URI(REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"))) AS ?prefLabel__dataProviderUrl)
       BIND(?id as ?uri__id)
       BIND(?id as ?uri__dataProviderUrl)
       BIND(?id as ?uri__prefLabel)
     }
     UNION
     {
       ?id dct:source ?source__id .
       ?source__id skos:prefLabel ?source__prefLabel .
       ?source__id mmm-schema:data_provider_url ?source__dataProviderUrl .
     }
     UNION
     {
       ?id ^crm:P46i_forms_part_of ?manuscript__id .
       ?manuscript__id skos:prefLabel ?manuscript__prefLabel .
       BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
     }
     UNION
     {
       ?id crm:P51_has_former_or_current_owner ?owner__id .
       ?owner__id skos:prefLabel ?owner__prefLabel .
       BIND(CONCAT("/actors/page/", REPLACE(STR(?owner__id), "^.*\\\\/(.+)", "$1")) AS ?owner__dataProviderUrl)
     }
     UNION
     {
       ?id mmm-schema:collection_location ?place__id .
       ?place__id skos:prefLabel ?place__prefLabel .
       BIND(CONCAT("/places/page/", REPLACE(STR(?place__id), "^.*\\\\/(.+)", "$1")) AS ?place__dataProviderUrl)
     }
`

export const networkLinksQuery = `
  SELECT DISTINCT ?source ?target ("author" as ?prefLabel)
  WHERE {
    <FILTER>
    ?source ^mmm-schema:manuscript_author ?target .
  }
`

export const networkNodesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class
  WHERE {
    VALUES ?class { frbroo:F4_Manifestation_Singleton crm:E21_Person }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
        skos:prefLabel ?prefLabel .
  }
`

export const productionPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?manuscripts) as ?instanceCount)
  WHERE {
    <FILTER>
    ?manuscripts ^crm:P108_has_produced/crm:P7_took_place_at ?id .
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const productionCoordinatesQuery = `
  SELECT ?lat ?long
  WHERE {
    <FILTER>
    ?manuscripts ^crm:P108_has_produced/crm:P7_took_place_at ?place .
    ?place wgs84:lat ?lat ;
           wgs84:long ?long .
  }
`

export const lastKnownLocationsQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?manuscripts) as ?instanceCount)
  WHERE {
    <FILTER>
    ?manuscripts mmm-schema:last_known_location ?id .
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

// # https://github.com/uber/deck.gl/blob/master/docs/layers/arc-layer.md
export const migrationsQuery = `
  SELECT DISTINCT ?id ?manuscript__id ?manuscript__prefLabel ?manuscript__dataProviderUrl
    ?from__id ?from__prefLabel ?from__dataProviderUrl ?from__lat ?from__long
    ?to__id ?to__prefLabel ?to__dataProviderUrl ?to__lat ?to__long
  WHERE {
    <FILTER>
    ?manuscript__id ^crm:P108_has_produced/crm:P7_took_place_at ?from__id ;
                    mmm-schema:last_known_location ?to__id ;
                    skos:prefLabel ?manuscript__prefLabel .
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
    ?from__id skos:prefLabel ?from__prefLabel ;
              wgs84:lat ?from__lat ;
              wgs84:long ?from__long .
    BIND(CONCAT("/places/page/", REPLACE(STR(?from__id), "^.*\\\\/(.+)", "$1")) AS ?from__dataProviderUrl)
    ?to__id skos:prefLabel ?to__prefLabel ;
            wgs84:lat ?to__lat ;
            wgs84:long ?to__long .
    BIND(CONCAT("/places/page/", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1")) AS ?to__dataProviderUrl)
    BIND(IRI(CONCAT(STR(?from__id), "-", REPLACE(STR(?to__id), "http://ldf.fi/mmm/place/", ""))) as ?id)
  }
`
