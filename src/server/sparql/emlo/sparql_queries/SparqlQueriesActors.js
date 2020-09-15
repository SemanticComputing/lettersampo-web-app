const perspectiveID = 'actors'
export const sahaUrl = '"http://demo.seco.tkk.fi/saha/project/resource.shtml?uri="'
export const sahaModel = '"&model=emlo"'

/**
 * TODO: add reverse relation, e.g. members on page http://localhost:8080/en/actors/page/37a1c23b-c19f-4126-a99c-3f264f939f22/table
 */

//  http://demo.seco.tkk.fi/saha/project/resource.shtml?uri=http%3A%2F%2Femlo.bodleian.ox.ac.uk%2Fid%2F822ba92b-3ccf-4f1e-b776-e87aca45c866&model=emlo
export const actorPropertiesInstancePage = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT(${sahaUrl}, STR(?id), ${sahaModel}) AS ?uri__dataProviderUrl)
  
  VALUES (?type__id ?type__prefLabel) { 
    (crm:E21_Person "Person")
    (crm:E74_Group "Group") }
  ?id a ?type__id .
  BIND (?type__id as ?type_dataProviderUrl)
  
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  
  {
    ?id foaf:gender ?gender . 
    VALUES (?gender ?gender__prefLabel) { 
      (sdmx-code:sex-M "Male") 
      (sdmx-code:sex-F "Female") 
    }
    BIND(?gender as ?gender__dataProviderUrl)
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
    ?id eschema:cofk_union_relationship_type-was_born_in_location ?birthPlace__id .
    ?birthPlace__id skos:prefLabel ?birthPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?birthPlace__id), "^.*\\\\/(.+)", "$1")) AS ?birthPlace__dataProviderUrl)
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
    ?id eschema:cofk_union_relationship_type-died_at_location ?deathPlace__id .
    ?deathPlace__id skos:prefLabel ?deathPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?deathPlace__id), "^.*\\\\/(.+)", "$1")) AS ?deathPlace__dataProviderUrl)
  }
  UNION
  {
    { ?id eschema:cofk_union_relationship_type-created/eschema:cofk_union_relationship_type-was_sent_from ?knownLocation__id }
      UNION
    { ?id ^eschema:cofk_union_relationship_type-was_addressed_to/eschema:cofk_union_relationship_type-was_sent_to ?knownLocation__id }
  ?knownLocation__id skos:prefLabel ?knownLocation__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?knownLocation__id), "^.*\\\\/(.+)", "$1")) AS ?knownLocation__dataProviderUrl)
  }
  UNION
  {
    VALUES (?rel__prop ?rel__label) {
      (eschema:cofk_union_relationship_type-sibling_of "Sibling of")
      (eschema:cofk_union_relationship_type-spouse_of "Spouse of")
      (eschema:cofk_union_relationship_type-parent_of "Parent of")
      (eschema:cofk_union_relationship_type-acquaintance_of "Acquaintance of")
      (eschema:cofk_union_relationship_type-collaborated_with "Collaborated with")
      (eschema:cofk_union_relationship_type-employed "Employed")
      (eschema:cofk_union_relationship_type-member_of "Member of")
      (eschema:cofk_union_relationship_type-relative_of "Relative of")
      (eschema:cofk_union_relationship_type-unspecified_relationship_with "Unspecified relationship with")
      (eschema:cofk_union_relationship_type-friend_of "Friend of")
      (eschema:cofk_union_relationship_type-colleague_of "Colleague of")
      (eschema:cofk_union_relationship_type-was_patron_of "Was patron of")
    }
    ?id ?rel__prop ?rel__id .
    ?rel__id skos:prefLabel ?rel__label2
    BIND (CONCAT(?rel__label, ' ',?rel__label2) AS ?rel__prefLabel)
    BIND(CONCAT("/actors/page/", REPLACE(STR(?rel__id), "^.*\\\\/(.+)", "$1")) AS ?rel__dataProviderUrl)  
  }
  UNION
  {
    { SELECT DISTINCT ?id ?alter__id (COUNT(DISTINCT ?letter) AS ?alter__count)
      WHERE {
        {
          ?id eschema:cofk_union_relationship_type-created ?letter .
          ?letter a eschema:Letter ;
              eschema:cofk_union_relationship_type-was_addressed_to ?alter__id .
        } UNION {
          ?letter eschema:cofk_union_relationship_type-was_addressed_to ?id ;
                  a eschema:Letter ;
                  ^eschema:cofk_union_relationship_type-created ?alter__id .
        }
      } GROUP BY ?id ?alter__id ORDER BY DESC(?alter__count) }
    FILTER (BOUND(?id) && BOUND(?alter__id))
    ?alter__id skos:prefLabel ?alter__label .
    FILTER (!REGEX(?alter__label, '(unknown|no_recipient_given)', 'i'))
    BIND(CONCAT(?alter__label, ' (',STR(?alter__count), ')') AS ?alter__prefLabel)
    BIND(CONCAT("/ties/page/", 
      REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),
      "__",
      REPLACE(STR(?alter__id), "^.*\\\\/(.+)", "$1")
      ) AS ?alter__dataProviderUrl)  
  }
  UNION
  {
    SELECT ?id (COUNT(DISTINCT ?letter) AS ?num_sent) WHERE {
      ?id eschema:cofk_union_relationship_type-created ?letter
    } GROUPBY ?id
  }
  UNION
  { SELECT DISTINCT ?id ?sentletter__id ?sentletter__prefLabel ?sentletter__dataProviderUrl
    WHERE {
      ?id eschema:cofk_union_relationship_type-created ?sentletter__id .
        ?sentletter__id a eschema:Letter ;
          skos:prefLabel ?sentletter__prefLabel .
      BIND(CONCAT("/letters/page/", REPLACE(STR(?sentletter__id), "^.*\\\\/(.+)", "$1")) AS ?sentletter__dataProviderUrl)
      OPTIONAL { ?sentletter__id (crm:P4_has_time-span|eschema:inferredDate|eschema:approximateDate|eschema:possibleDate)/crm:P82a_begin_of_the_begin ?time }
    } ORDER BY COALESCE(STR(?time), CONCAT("9999", ?sentletter__prefLabel))
  }
  UNION 
  {
    SELECT ?id (COUNT(DISTINCT ?letter) AS ?num_received) WHERE {
      ?letter eschema:cofk_union_relationship_type-was_addressed_to ?id
    } GROUPBY ?id
  }
  UNION
  { SELECT DISTINCT ?id ?receivedletter__id ?receivedletter__prefLabel ?receivedletter__dataProviderUrl
    WHERE {
    ?receivedletter__id
      eschema:cofk_union_relationship_type-was_addressed_to ?id ;
      a eschema:Letter ;
      skos:prefLabel ?receivedletter__prefLabel .
    BIND(CONCAT("/letters/page/", REPLACE(STR(?receivedletter__id), "^.*\\\\/(.+)", "$1")) AS ?receivedletter__dataProviderUrl)
    OPTIONAL { ?receivedletter__id (crm:P4_has_time-span|eschema:inferredDate|eschema:approximateDate|eschema:possibleDate)/crm:P82a_begin_of_the_begin ?time }
    } ORDER BY COALESCE(STR(?time), CONCAT("9999", ?receivedletter__prefLabel))
  }
`

export const actorPropertiesFacetResults =
  `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)

  VALUES (?type__id ?type__prefLabel) { 
    (crm:E21_Person "Person")
    (crm:E74_Group "Group") }
  ?id a ?type__id .
  BIND (?type__id as ?type_dataProviderUrl)
  
  {
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
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
    ?id eschema:cofk_union_relationship_type-was_born_in_location ?birthPlace__id .
    ?birthPlace__id skos:prefLabel ?birthPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?birthPlace__id), "^.*\\\\/(.+)", "$1")) AS ?birthPlace__dataProviderUrl)
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
    ?id eschema:cofk_union_relationship_type-died_at_location ?deathPlace__id .
    ?deathPlace__id skos:prefLabel ?deathPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?deathPlace__id), "^.*\\\\/(.+)", "$1")) AS ?deathPlace__dataProviderUrl)
  }
  UNION
  {
    SELECT ?id (COUNT(DISTINCT ?letter) AS ?num_sent)
    WHERE {
      ?id eschema:cofk_union_relationship_type-created ?letter
    } GROUP BY ?id
  }
  UNION
  {
    SELECT ?id (COUNT(DISTINCT ?letter) AS ?num_received)  
    WHERE {
      ?letter eschema:cofk_union_relationship_type-was_addressed_to ?id
    } GROUP BY ?id
  }
  UNION
  {
    ?id foaf:gender ?gender__id . 
    VALUES (?gender__id ?gender__prefLabel) { 
      (sdmx-code:sex-M "Male" ) 
      (sdmx-code:sex-F "Female" ) 
    }
    BIND(?gender__id as ?gender__dataProviderUrl)
  }
`

//  https://api.triplydb.com/s/U-6MA_haY
export const letterLinksQuery = `
SELECT DISTINCT ?source ?target 
  (COUNT(DISTINCT ?letter) AS ?weight)
  (STR(COUNT(DISTINCT ?letter)) AS ?prefLabel)
WHERE {
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

# filter 'unknown' etc entries
?source skos:prefLabel ?source__label . 
FILTER (!REGEX(?source__label, '(unknown|no_recipient_given)', 'i'))
?target skos:prefLabel ?target__label . 
FILTER (!REGEX(?target__label, '(unknown|no_recipient_given)', 'i'))

# no self links
FILTER (?source!=?target)

} GROUP BY ?source ?target
`

//  https://api.triplydb.com/s/lhDOivCiG
export const peopleEventPlacesQuery = `
SELECT DISTINCT ?id ?lat ?long 
(COUNT(DISTINCT ?person) AS ?instanceCount)
WHERE {

  {
    ?person eschema:cofk_union_relationship_type-created/eschema:cofk_union_relationship_type-was_sent_from ?id .
  } UNION {
    ?person ^eschema:cofk_union_relationship_type-was_addressed_to/eschema:cofk_union_relationship_type-was_sent_to ?id .
  } 
  
  ?id geo:lat ?lat ;
    geo:long ?long .
  
} GROUP BY ?id ?lat ?long
`

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

//  https://api.triplydb.com/s/O9tYz4CRO
export const sentReceivedQuery = `
  SELECT DISTINCT (STR(?year) as ?category) 
    (count(distinct ?sent_letter) AS ?sentCount) 
    (count(distinct ?received_letter) AS ?receivedCount) 
    ((?sentCount + ?receivedCount) as ?allCount)
  WHERE {
    BIND(<ID> as ?id)
    {
      ?id eschema:cofk_union_relationship_type-created ?sent_letter .
      ?sent_letter a eschema:Letter ;
                   crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time_0 .
      BIND (year(?time_0) AS ?year)
    } 
    UNION 
    {
      ?received_letter eschema:cofk_union_relationship_type-was_addressed_to ?id ;
                       a eschema:Letter ;
                      crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time_0 .
      BIND (year(?time_0) AS ?year)
    }
    FILTER (BOUND(?year))

    OPTIONAL {
      ?id eschema:birthDate/crm:P82b_end_of_the_end ?birth_end .
    BIND(year(?birth_end) AS ?birth)
    }
    FILTER ((bound(?birth) && ?birth<?year) || !bound(?birth))

    OPTIONAL {
        ?id eschema:deathDate/crm:P82b_end_of_the_end ?death_end .
      BIND(year(?death_start) AS ?death)
    }
    FILTER ((bound(?death) && ?year<=?death) || !bound(?death))
  } 
  GROUP BY ?year 
  ORDER BY ?year
`
