const perspectiveID = 'perspective2'

export const workProperties = `
BIND(?id as ?uri__id)
BIND(?id as ?uri__dataProviderUrl)
BIND(?id as ?uri__prefLabel)

{
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
} 
UNION 
{
  ?id ^eschema:cofk_union_relationship_type-created ?source__id . 
  ?source__id skos:prefLabel ?source__prefLabel . 
  FILTER (!REGEX(STR(?source__prefLabel), 'unknown', 'i'))
  BIND (?source__id AS ?source__dataProviderUrl)
}
UNION 
{
  ?id eschema:cofk_union_relationship_type-was_addressed_to ?target__id . 
  ?target__id skos:prefLabel ?target__prefLabel . 
  FILTER (!REGEX(STR(?target__prefLabel), 'unknown', 'i'))
  BIND (?target__id AS ?target__dataProviderUrl)
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
`

// # https://github.com/uber/deck.gl/blob/master/docs/layers/arc-layer.md
export const letterMigrationsQuery = `
SELECT DISTINCT *
  WHERE {
    <FILTER>

    ?id a eschema:Letter ;
    	eschema:cofk_union_relationship_type-was_sent_from ?from__id ;
		  eschema:cofk_union_relationship_type-was_sent_to ?to__id ;
  		crm:P4_has_time-span ?time__id ;
      skos:prefLabel ?letter__prefLabel .
    BIND(?id as ?letter__id)

    ?time__id 
      crm:P82a_begin_of_the_begin ?time__start ;
      crm:P82b_end_of_the_end ?time__end .
    ?from__id skos:prefLabel ?from__prefLabel ; 
        geo:lat ?from__lat ;
        geo:long ?from__long .
    ?to__id skos:prefLabel ?to__prefLabel ; 
        geo:lat ?to__lat ;
        geo:long ?to__long .
  } `
