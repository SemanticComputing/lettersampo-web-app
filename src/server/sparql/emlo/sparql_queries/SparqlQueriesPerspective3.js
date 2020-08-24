import { sahaModel, sahaUrl } from './SparqlQueriesPerspective1'
const perspectiveID = 'perspective3'

export const placePropertiesInstancePage =
`
BIND(?id as ?uri__id)
BIND(?id as ?uri__prefLabel)
BIND(CONCAT(${sahaUrl}, STR(?id), ${sahaModel}) AS ?uri__dataProviderUrl)

{
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  OPTIONAL {
    ?broader__id a eschema:Country .
    BIND (?broader__id AS ?country__id)    
    ?broader__id skos:prefLabel ?country__prefLabel .
    BIND(CONCAT("/perspective3/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl)
  }
}
UNION
{
  ?id crm:P89_falls_within+ ?broader__id .
  ?broader__id skos:prefLabel ?broader__prefLabel .
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?broader__dataProviderUrl)
}
UNION
{
  ?narrower__id crm:P89_falls_within ?id ;
    skos:prefLabel ?narrower__prefLabel .
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?narrower__id), "^.*\\\\/(.+)", "$1")) AS ?narrower__dataProviderUrl)
}
`

export const placePropertiesFacetResults =
  `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT(${sahaUrl}, STR(?id), ${sahaModel}) AS ?uri__dataProviderUrl)

  ?id a ?type__id .
  BIND (?type__id as ?type_dataProviderUrl)
  
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
{
  ?id crm:P89_falls_within+ ?broader__id .
  ?broader__id skos:prefLabel ?broader__prefLabel .
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?broader__dataProviderUrl)
  OPTIONAL {
    ?broader__id a eschema:Country .
    BIND (?broader__id AS ?country__id)
    ?broader__id skos:prefLabel ?country__prefLabel .
    BIND(CONCAT("/perspective3/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl)
  }
}
UNION
{
  ?narrower__id crm:P89_falls_within ?id ;
    skos:prefLabel ?narrower__prefLabel .
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?narrower__id), "^.*\\\\/(.+)", "$1")) AS ?narrower__dataProviderUrl)
}
`

export const eventPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?event) as ?instanceCount)
  WHERE {
    <FILTER>
    ?event crm:P7_took_place_at ?id .
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const eventsByTimePeriodQuery = `
  SELECT ?id ?type__id ?type__prefLabel
  (COUNT(DISTINCT ?event) as ?type__instanceCount)
  WHERE {
    <FILTER>
    <TIME_PERIODS>
  }
  GROUP BY ?id ?type__id ?type__prefLabel
  ORDER BY ?id
`

export const eventsByTimePeriodQuery2 = `
  SELECT ?id ?prefLabel ?period ?instanceCount
  WHERE {
    <FILTER>
    <TIME_PERIODS>
  }
`
