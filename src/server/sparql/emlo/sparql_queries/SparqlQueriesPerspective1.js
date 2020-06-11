const perspectiveID = 'perspective1'
export const sahaUrl = '"http://demo.seco.tkk.fi/saha/project/resource.shtml?uri="'
export const sahaModel = '"&model=emlo"'

//  http://demo.seco.tkk.fi/saha/project/resource.shtml?uri=http%3A%2F%2Femlo.bodleian.ox.ac.uk%2Fid%2F822ba92b-3ccf-4f1e-b776-e87aca45c866&model=emlo
export const actorPropertiesInstancePage =
`   BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(CONCAT(${sahaUrl}, STR(?id), ${sahaModel}) AS ?uri__dataProviderUrl)
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
    { ?id skos:altLabel ?altLabel }
    UNION
    { ?id eschema:cofk_union_relationship_type-is_related_to ?related__id . 
      ?related__id skos:prefLabel ?related__prefLabel .
      BIND(?related__id AS ?related__dataProviderUrl)
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
    UNION 
    {
      { ?id eschema:cofk_union_relationship_type-created/eschema:cofk_union_relationship_type-was_sent_from ?knownLocation__id }
        UNION 
      { ?id ^eschema:cofk_union_relationship_type-was_addressed_to/eschema:cofk_union_relationship_type-was_sent_to ?knownLocation__id }
    ?knownLocation__id skos:prefLabel ?knownLocation__prefLabel .
      BIND(CONCAT("/places/page/", REPLACE(STR(?knownLocation__id), "^.*\\\\/(.+)", "$1")) AS ?knownLocation__dataProviderUrl)
    }

    VALUES (?class__id ?class__prefLabel) { 
      (crm:E21_Person "Person")
      (crm:E74_Group "Group") }
    ?id a ?class__id .
`


export const actorPropertiesFacetResults =
  `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id foaf:gender ?gender__id . 
    VALUES (?gender__id ?gender__prefLabel) { 
      (sdmx-code:sex-M "Male") 
      (sdmx-code:sex-F "Female") 
    }
    BIND(?gender__id as ?gender__dataProviderUrl)
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

  VALUES (?class__id ?class__prefLabel) { 
    (crm:E21_Person "Person")
    (crm:E74_Group "Group") }
  ?id a ?class__id .
`

export const letterLinksQuery = `
SELECT DISTINCT ?source ?target (COUNT(DISTINCT ?letter) AS ?weight)
WHERE 
{
  VALUES ?id { <ID> }
  {
    ?id eschema:cofk_union_relationship_type-created ?letter .
    ?letter a eschema:Letter ;
        eschema:cofk_union_relationship_type-was_addressed_to ?target .
    BIND(?id AS ?source)
  } UNION {
    ?letter eschema:cofk_union_relationship_type-was_addressed_to ?id ;
           	a eschema:Letter .
    ?source eschema:cofk_union_relationship_type-created ?letter ;
    BIND(?id AS ?target)
  }
} GROUP BY ?source ?target `

/** 
 export const networkLinksQuery = `
 SELECT DISTINCT ?source ?target ("letter" as ?prefLabel)
 WHERE {
   ?letter a eschema:Letter ;
   eschema:cofk_union_relationship_type-was_sent_from ?source ;
   eschema:cofk_union_relationship_type-was_sent_to ?target 
  }
  `
*/

export const networkNodesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
  WHERE {
    VALUES ?class { crm:E21_Person crm:E74_Group }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
      skos:prefLabel ?prefLabel .
    BIND(CONCAT("../", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),"/letterNetwork") AS ?href)
  }
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
