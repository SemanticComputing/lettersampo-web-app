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
  ?id crm:P4_has_time-span ?productionTimespan__id .
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
  BIND (?from__id AS ?from__dataProviderUrl)
}
UNION 
{
  ?id eschema:cofk_union_relationship_type-was_sent_to ?to__id .
  ?to__id skos:prefLabel ?to__prefLabel .
  BIND (?to__id AS ?to__dataProviderUrl)
}

`

/** TODO
 eschema:source            <http://emlo.bodleian.ox.ac.uk/id/source_Bodleian+card+catalogue> ;
        dct:date                  "Jan. 13, 1728/9" ;
        dct:description "..."
 */
