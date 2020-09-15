// const perspectiveID = 'ties'
export const sahaUrl = '"http://demo.seco.tkk.fi/saha/project/resource.shtml?uri="'
export const sahaModel = '"&model=emlo"'

//  http://demo.seco.tkk.fi/saha/project/resource.shtml?uri=http%3A%2F%2Femlo.bodleian.ox.ac.uk%2Fid%2F822ba92b-3ccf-4f1e-b776-e87aca45c866&model=emlo
export const tiePropertiesInstancePage = `
BIND (URI(STRBEFORE(STR(?id),'__')) AS ?ego__id)
BIND (URI(CONCAT("http://emlo.bodleian.ox.ac.uk/id/",STRAFTER(STR(?id),'__'))) AS ?alter__id)

BIND(?ego__id as ?ego__prefLabel)
BIND(CONCAT(${sahaUrl}, STR(?ego__id), ${sahaModel}) AS ?ego__dataProviderUrl)

BIND(?alter__id as ?alter__prefLabel)
BIND(CONCAT(${sahaUrl}, STR(?alter__id), ${sahaModel}) AS ?alter__dataProviderUrl)

{
?ego__id skos:prefLabel ?prefLabel1__id .
BIND (?prefLabel1__id as ?prefLabel1__prefLabel)
BIND(CONCAT("/actors/page/", REPLACE(STR(?ego__id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel1__dataProviderUrl)

?alter__id skos:prefLabel ?prefLabel2__id .
BIND (?prefLabel2__id as ?prefLabel2__prefLabel)
BIND(CONCAT("/actors/page/", REPLACE(STR(?alter__id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel2__dataProviderUrl)
} 
UNION 
{
  {
  ?ego__id eschema:cofk_union_relationship_type-created/eschema:cofk_union_relationship_type-was_addressed_to ?other__id .
  ?alter__id eschema:cofk_union_relationship_type-created/eschema:cofk_union_relationship_type-was_addressed_to ?other__id .
  }
  UNION
  {
  ?other__id eschema:cofk_union_relationship_type-created/eschema:cofk_union_relationship_type-was_addressed_to ?ego__id .
  ?other__id eschema:cofk_union_relationship_type-created/eschema:cofk_union_relationship_type-was_addressed_to ?alter__id .
  }
  FILTER (?other__id!=?ego__id && ?other__id!=?alter__id)
  ?other__id skos:prefLabel ?other__prefLabel .
  BIND(CONCAT("/actors/page/", REPLACE(STR(?other__id), "^.*\\\\/(.+)", "$1")) AS ?other__dataProviderUrl)
}
UNION
{ SELECT DISTINCT ?ego__id ?alter__id ?letter__id ?letter__prefLabel ?letter__dataProviderUrl  WHERE {
  {
    ?letter__id ^eschema:cofk_union_relationship_type-created ?ego__id .
    ?letter__id eschema:cofk_union_relationship_type-was_addressed_to ?alter__id .
  } 
  UNION 
  {
    ?letter__id ^eschema:cofk_union_relationship_type-created ?alter__id .
    ?letter__id eschema:cofk_union_relationship_type-was_addressed_to ?ego__id .
  }
  ?letter__id skos:prefLabel ?letter__prefLabel .
  BIND(CONCAT("/letters/page/", REPLACE(STR(?letter__id), "^.*\\\\/(.+)", "$1")) AS ?letter__dataProviderUrl)

  OPTIONAL { ?letter__id (crm:P4_has_time-span|eschema:inferredDate|eschema:approximateDate|eschema:possibleDate)/crm:P82a_begin_of_the_begin ?letter__timespan }
  } 
  ORDER BY COALESCE(STR(?letter__timespan), CONCAT("9999", ?letter__prefLabel))
}

  BIND (CONCAT(?prefLabel1__id, " <---> ", ?prefLabel2__id) as ?prefLabel)
`
