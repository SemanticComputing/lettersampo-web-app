import { sahaModel, sahaUrl } from './SparqlQueriesActors'
const perspectiveID = 'places'

// TODO add migrations from the place
export const placePropertiesInstancePage = `
BIND(?id as ?uri__id)
BIND(?id as ?uri__prefLabel)
BIND(CONCAT(${sahaUrl}, STR(?id), ${sahaModel}) AS ?uri__dataProviderUrl)

{ 
  SELECT ?id ?prefLabel__id ?prefLabel__prefLabel WHERE {
  ?id (rdfs:label|skos:prefLabel) ?prefLabel__id .
   BIND (?prefLabel__id as ?prefLabel__prefLabel)
   } LIMIT 1
}
UNION
{
  VALUES (?type__id ?type__prefLabel) { 
    (crm:E53_Place "Place")
    (eschema:City "City")
    (eschema:Country "Country")
  }
  ?id a ?type__id .
  BIND (?type__id as ?type_dataProviderUrl)
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
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl)
  }
}
UNION
{
  ?narrower__id crm:P89_falls_within ?id ;
    skos:prefLabel ?narrower__prefLabel .
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?narrower__id), "^.*\\\\/(.+)", "$1")) AS ?narrower__dataProviderUrl)
}
UNION
{ ?id eschema:cofk_union_relationship_type-is_related_to ?external__id . 
  ?external__id skos:prefLabel ?external__prefLabel .
  BIND(?external__id AS ?external__dataProviderUrl)
}
UNION
{ 
  ?id skos:altLabel ?altLabel . 
  # FILTER (STR(?prefLabel__prefLabel) != STR(?altLabel)) 
}
UNION
{
  ?id ^eschema:cofk_union_relationship_type-was_sent_from ?from__id .
  ?from__id skos:prefLabel ?from__prefLabel .
  BIND(CONCAT("/letters/page/", REPLACE(STR(?from__id), "^.*\\\\/(.+)", "$1")) AS ?from__dataProviderUrl)
} 
UNION
{
  ?id ^eschema:cofk_union_relationship_type-was_sent_from ?to__id .
  ?to__id skos:prefLabel ?to__prefLabel .
  BIND(CONCAT("/letters/page/", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1")) AS ?to__dataProviderUrl)
}
UNION {
  {
    ?id ^eschema:cofk_union_relationship_type-was_sent_from/^eschema:cofk_union_relationship_type-created ?related__id 
  } 
  UNION 
  {
    ?id ^eschema:cofk_union_relationship_type-was_sent_from/eschema:cofk_union_relationship_type-was_addressed_to ?related__id 
  }
  FILTER (BOUND(?related__id))
  ?related__id skos:prefLabel ?related__prefLabel .
  BIND(CONCAT("/actors/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
}
UNION
{
  ?id geo:lat ?lat ; geo:long ?long .
  BIND (CONCAT('lat ', STR(?lat), ', long ',STR(?long)) as ?location__prefLabel)
  BIND (?location__prefLabel AS ?location__id)
} 
`

export const placePropertiesFacetResults = `
BIND(?id as ?uri__id)
BIND(?id as ?uri__prefLabel)
BIND(CONCAT(${sahaUrl}, STR(?id), ${sahaModel}) AS ?uri__dataProviderUrl)

VALUES (?type__id ?type__prefLabel) { 
  (crm:E53_Place "Place")
  (eschema:City "City")
  (eschema:Country "Country")
}
?id a ?type__id .
BIND (?type__id as ?type_dataProviderUrl)

?id skos:prefLabel ?prefLabel__id .
BIND (?prefLabel__id as ?prefLabel__prefLabel)
BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)

{
  ?id crm:P89_falls_within+ ?broader__id .
  ?broader__id skos:prefLabel ?broader__prefLabel .
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?broader__dataProviderUrl)
  OPTIONAL {
    ?broader__id a eschema:Country .
    BIND (?broader__id AS ?country__id)
    ?broader__id skos:prefLabel ?country__prefLabel .
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl)
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

export const placePropertiesInfoWindow = `
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

//  https://api.triplydb.com/s/ck2-SDpCO
export const peopleRelatedTo = `
  OPTIONAL {
    <FILTER>
    { ?related__id eschema:cofk_union_relationship_type-created/eschema:cofk_union_relationship_type-was_sent_from ?id }
    UNION
    { ?related__id ^eschema:cofk_union_relationship_type-was_addressed_to/eschema:cofk_union_relationship_type-was_sent_to ?id }
    ?related__id skos:prefLabel ?related__prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
  } 
`

//  TODO add subplaces to counts
// https://api.triplydb.com/s/gYYySP446
export const sentReceivedByPlaceQuery = `
SELECT DISTINCT (STR(?year) as ?category)
  (count(distinct ?sent_letter) AS ?sentCount)
  (count(distinct ?received_letter) AS ?receivedCount)
  ((?sentCount + ?receivedCount) as ?allCount)
WHERE {
  BIND(<ID> as ?id)
  ?sub crm:P89_falls_within* ?id .
  {
    ?sent_letter eschema:cofk_union_relationship_type-was_sent_from ?sub ;
      a eschema:Letter ;
      crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time .
  BIND (STR(year(?time)) AS ?year)
  } 
  UNION 
  {
    ?received_letter eschema:cofk_union_relationship_type-was_sent_to ?sub ;
                     a eschema:Letter ;
                    crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time .
  BIND (STR(year(?time)) AS ?year)
  }
  FILTER (BOUND(?year))
} GROUP BY ?year ORDER BY ?year 
`
