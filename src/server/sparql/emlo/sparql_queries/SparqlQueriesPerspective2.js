import { sahaModel, sahaUrl} from './SparqlQueriesPerspective1'
const perspectiveID = 'perspective2'


export const letterProperties = `
BIND(?id as ?uri__id)
BIND(STR(?id) as ?uri__prefLabel)
BIND(CONCAT(${sahaUrl}, STR(?id), ${sahaModel}) AS ?uri__dataProviderUrl)

{
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
} 
UNION 
{
  ?id ^eschema:cofk_union_relationship_type-created ?source__id . 
  ?source__id skos:prefLabel ?source__prefLabel . 
  FILTER (!REGEX(STR(?source__prefLabel), 'unknown', 'i'))
  BIND(CONCAT("/perspective1/page/", REPLACE(STR(?source__id), "^.*\\\\/(.+)", "$1")) AS ?source__dataProviderUrl)
}
UNION 
{
  ?id eschema:cofk_union_relationship_type-was_addressed_to ?target__id . 
  ?target__id skos:prefLabel ?target__prefLabel . 
  FILTER (!REGEX(STR(?target__prefLabel), 'unknown', 'i'))
  BIND(CONCAT("/perspective1/page/", REPLACE(STR(?target__id), "^.*\\\\/(.+)", "$1")) AS ?target__dataProviderUrl)
}
UNION
{
  { ?id crm:P4_has_time-span ?productionTimespan__id }
  UNION
  { ?id eschema:inferredDate ?productionTimespan__id }

  OPTIONAL { ?productionTimespan__id skos:prefLabel ?productionTimespan__prefLabel }
  OPTIONAL { ?productionTimespan__id crm:P82a_begin_of_the_begin ?productionTimespan__start }
  OPTIONAL { ?productionTimespan__id crm:P82b_end_of_the_end ?productionTimespan__end }
}
UNION
{
  ?id dct:description ?description__id .
  BIND (?description__id as ?description__prefLabel)
}
UNION
{ ?id dct:language  ?language__id . 
  ?language__id skos:prefLabel ?language__prefLabel .
  BIND (?language__id AS ?language__dataProviderUrl)
}
UNION 
{
  ?id eschema:cofk_union_relationship_type-was_sent_from ?from__id .
  ?from__id skos:prefLabel ?from__prefLabel .
  BIND(CONCAT("/places/page/", REPLACE(STR(?from__id), "^.*\\\\/(.+)", "$1")) AS ?from__dataProviderUrl)
}
UNION 
{
  ?id eschema:cofk_union_relationship_type-was_sent_to ?to__id .
  ?to__id skos:prefLabel ?to__prefLabel .
  BIND(CONCAT("/places/page/", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1")) AS ?to__dataProviderUrl)
}
` // TODO add source
/*
SELECT DISTINCT ?source ?source__label WHERE {
?id a  eschema:Letter ;
        eschema:source ?source .
?source skos:prefLabel ?source__label .

and possible other properties: https://api.triplydb.com/s/dHjxJhy0U
e.g. eschema:excipit
*/

// # https://github.com/uber/deck.gl/blob/master/docs/layers/arc-layer.md
//  in yasgui: https://api.triplydb.com/s/rcZVxZsHf
export const letterMigrationsQuery = `
SELECT DISTINCT ?id # ?letter__id 
?from__id ?from__prefLabel ?from__dataProviderUrl ?from__lat ?from__long
?to__id ?to__prefLabel ?to__dataProviderUrl ?to__lat ?to__long
  WHERE {
    <FILTER>
    ?letter__id a eschema:Letter ;
    	eschema:cofk_union_relationship_type-was_sent_from ?from__id ;
		  eschema:cofk_union_relationship_type-was_sent_to ?to__id ;
  		crm:P4_has_time-span ?time__id ;
      skos:prefLabel ?letter__prefLabel .
    
    ?from__id skos:prefLabel ?from__prefLabel ; 
        geo:lat ?from__lat ;
        geo:long ?from__long .
    BIND(CONCAT("/places/page/", REPLACE(STR(?from__id), "^.*\\\\/(.+)", "$1")) AS ?from__dataProviderUrl)
    
    ?to__id skos:prefLabel ?to__prefLabel ; 
        geo:lat ?to__lat ;
        geo:long ?to__long .
    BIND(CONCAT("/places/page/", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1")) AS ?to__dataProviderUrl)
    BIND(IRI(CONCAT(STR(?from__id), "-", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1") )) as ?id)
  } `

//  https://api.triplydb.com/s/JJ8pW_uH3 
export const letterByYearQuery = `
SELECT DISTINCT ?category (COUNT(DISTINCT ?letter__id) AS ?count)
WHERE {
  <FILTER>
  ?id eschema:cofk_union_relationship_type-created ?letter__id .
  ?letter__id eschema:cofk_union_relationship_type-was_addressed_to ?target .

  ?letter__id crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time_0 .

  BIND (STR(year(?time_0)) AS ?category)
  FILTER (BOUND(?category))
} GROUP BY ?category 
  ORDER BY ?category
`

