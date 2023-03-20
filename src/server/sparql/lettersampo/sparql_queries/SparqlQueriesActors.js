const perspectiveID = 'actors'
/**
TODO: simplify property chain: lssc:has_time|lssc:inferredDate|lssc:approximateDate|lssc:possibleDate
 */

export const actorPropertiesInstancePage = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(?id as ?uri__dataProviderUrl)
  ?id foaf:focus ?act .
  
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)

  {
    ?act a ?type__id .
    ?type__id skos:prefLabel ?type__prefLabel .
    BIND (?type__id as ?type_dataProviderUrl)
  }
  UNION
  {
    ?act foaf:gender/skos:prefLabel ?gender
  }
  UNION
  { ?id skos:altLabel ?altLabel }
  UNION 
  { ?act skos:altLabel ?altLabel }
  UNION
  { 
    ?act lssc:is_related_to ?external__id .
    ?external__id a/skos:prefLabel ?external__prefLabel .
    BIND((REPLACE(STR(?external__id), '^https:' ,'http:')) AS ?external__dataProviderUrl)
  }
  UNION
  {
    VALUES ?_bprop {
      lssc:birthDate
      lssc:approximateBirthDate
      lssc:possibleBirthDate
    }
    ?act ?_bprop ?birthDateTimespan__id .
    ?birthDateTimespan__id skos:prefLabel ?birthDateTimespan__prefLabel .
    OPTIONAL { ?birthDateTimespan__id crm:P82a_begin_of_the_begin ?birthDateTimespan__start }
    OPTIONAL { ?birthDateTimespan__id crm:P82b_end_of_the_end ?birthDateTimespan__end }
  }
  UNION
  {
    ?act lssc:was_born_in_location/^foaf:focus ?birthPlace__id .
    ?birthPlace__id skos:prefLabel ?birthPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?birthPlace__id), "^.*\\\\/(.+)", "$1")) AS ?birthPlace__dataProviderUrl)
  }
  UNION
  {
    VALUES ?_dprop { 
      lssc:deathDate
      lssc:inferredDeathDate
      lssc:approximateDeathDate
      lssc:possibleDeathDate 
    }
    ?act ?_dprop ?deathDateTimespan__id .
    ?deathDateTimespan__id skos:prefLabel ?deathDateTimespan__prefLabel .
    OPTIONAL { ?deathDateTimespan__id crm:P82a_begin_of_the_begin ?deathDateTimespan__start }
    OPTIONAL { ?deathDateTimespan__id crm:P82b_end_of_the_end ?deathDateTimespan__end }
  }
  UNION
  {
    ?act lssc:died_at_location/^foaf:focus ?deathPlace__id .
    ?deathPlace__id skos:prefLabel ?deathPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?deathPlace__id), "^.*\\\\/(.+)", "$1")) AS ?deathPlace__dataProviderUrl)
  }
  UNION
  {
    ?id lssc:flourished/skos:prefLabel ?floruit
  }
  UNION
  {
    ?act lssc:occupation ?occupation__id . 
    ?occupation__id skos:prefLabel ?occupation__prefLabel .
    BIND(CONCAT("/occupations/page/", REPLACE(STR(?occupation__id), "^.*\\\\/(.+)", "$1")) AS ?occupation__dataProviderUrl)
  }
  UNION
  {
    VALUES (?rel__prop ?rel__label) {
      (lssc:sibling_of "Sibling of")
      (lssc:spouse_of "Spouse of")
      (lssc:parent_of "Parent of")
      (lssc:acquaintance_of "Acquaintance of")
      (lssc:collaborated_with "Collaborated with")
      (lssc:employed "Employed")
      (lssc:member_of "Member of")
      (lssc:relative_of "Relative of")
      (lssc:unspecified_relationship_with "Unspecified relationship with")
      (lssc:friend_of "Friend of")
      (lssc:colleague_of "Colleague of")
      (lssc:was_patron_of "Was patron of")
    }
    ?act ?rel__prop ?rel__id .
    ?rel__id skos:prefLabel ?rel__label2
    BIND (CONCAT(?rel__label, ' ',?rel__label2) AS ?rel__prefLabel)
    BIND(CONCAT("/actors/page/", REPLACE(STR(?rel__id), "^.*\\\\/(.+)", "$1")) AS ?rel__dataProviderUrl)  
  }
  UNION
  {
    VALUES (?rel__prop ?rel__label) {
      (lssc:member_of "Member:")
    }
    ?rel__id ?rel__prop ?id ;
      skos:prefLabel ?rel__label2
    BIND (CONCAT(?rel__label, ' ',?rel__label2) AS ?rel__prefLabel)
    BIND(CONCAT("/actors/page/", REPLACE(STR(?rel__id), "^.*\\\\/(.+)", "$1")) AS ?rel__dataProviderUrl)  
  }
  UNION
  {
    ?id lssc:out_degree ?numSent 
  }
  UNION
  {
    ?id lssc:in_degree ?numReceived
  }
  UNION
  {
    ?act sch:image ?image__id ;
      skos:prefLabel ?image__description ;
      skos:prefLabel ?image__title .
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=600")) as ?image__url)
  }
  UNION
  {
    ?act lssc:source/skos:prefLabel ?datasource
  }
`

export const actorLettersInstancePageQuery = `
  SELECT * 
  WHERE {
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)

    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND (?prefLabel__id as ?prefLabel__prefLabel)
    }
    UNION
    {
      SELECT DISTINCT ?id ?metrics__id ?metrics__dataProviderUrl ?metrics__prefLabel
      WHERE {
        ?id lssc:has_statistic [
          lssc:value ?stat_value ;
          lssc:rank ?stat_rank ;
          a ?metrics__id ] .
        ?metrics__id skos:prefLabel ?stat_label .
        BIND (CONCAT(?stat_label, ': ', STR(?stat_value), ' (#', STR(?stat_rank),")") AS ?metrics__prefLabel)
        BIND(CONCAT("/metrics/page/", REPLACE(STR(?metrics__id), "^.*\\\\/(.+)", "$1")) AS ?metrics__dataProviderUrl)
      }
    }
    UNION
    {
      { SELECT ?id ?tie__id ?tie__count ?tie__prefLabel WHERE {
        { ?tie__id lssc:actor1 ?id }
        UNION
        { ?tie__id lssc:actor2 ?id }
        ?tie__id lssc:num_letters ?tie__count ;
                   skos:prefLabel ?_lbl .
        BIND (CONCAT(?_lbl, ' (', STR(?tie__count), ')') AS ?tie__prefLabel)
        } ORDER BY DESC(?tie__count) }
      FILTER (BOUND(?tie__id))
      BIND(CONCAT("/ties/page/", REPLACE(STR(?tie__id), "^.*\\\\/(.+)", "$1")) AS ?tie__dataProviderUrl)
    }
    UNION
    {
      ?id lssc:out_degree ?numSent 
    }
    UNION
    {
      ?id lssc:in_degree ?numReceived
    }
    UNION
    {
      ?id lssc:num_correspondences ?numCorrespondences
    }
    UNION
    {
      ?id lssc:flourished/skos:prefLabel ?floruit
    }
    UNION
    { SELECT DISTINCT ?id ?sentletter__id ?sentletter__prefLabel ?sentletter__dataProviderUrl
        ?knownLocation__id ?knownLocation__prefLabel 
        (CONCAT("/places/page/", REPLACE(STR(?knownLocation__id), "^.*\\\\/(.+)", "$1")) AS ?knownLocation__dataProviderUrl)
      WHERE {
        ?id foaf:focus/lssc:created ?sentletter__id .
          ?sentletter__id a lssc:Letter ;
            skos:prefLabel ?sentletter__prefLabel .
        BIND(CONCAT("/letters/page/", REPLACE(STR(?sentletter__id), "^.*\\\\/(.+)", "$1")) AS ?sentletter__dataProviderUrl)
        OPTIONAL { ?sentletter__id (lssc:has_time|lssc:inferredDate|lssc:approximateDate|lssc:possibleDate)/crm:P82a_begin_of_the_begin ?time }
        OPTIONAL { ?sentletter__id lssc:was_sent_from/^foaf:focus ?knownLocation__id .
          ?knownLocation__id skos:prefLabel ?knownLocation__prefLabel }
      } ORDER BY COALESCE(STR(?time), CONCAT("9999", ?sentletter__prefLabel))
    }
    UNION 
    { SELECT DISTINCT ?id ?receivedletter__id ?receivedletter__prefLabel ?receivedletter__dataProviderUrl
        ?knownLocation__id ?knownLocation__prefLabel 
        (CONCAT("/places/page/", REPLACE(STR(?knownLocation__id), "^.*\\\\/(.+)", "$1")) AS ?knownLocation__dataProviderUrl)
      WHERE {
      ?receivedletter__id
        lssc:was_addressed_to/^foaf:focus ?id ;
        a lssc:Letter ;
        skos:prefLabel ?receivedletter__prefLabel .
      BIND(CONCAT("/letters/page/", REPLACE(STR(?receivedletter__id), "^.*\\\\/(.+)", "$1")) AS ?receivedletter__dataProviderUrl)
      OPTIONAL { ?receivedletter__id (lssc:has_time|lssc:inferredDate|lssc:approximateDate|lssc:possibleDate)/crm:P82a_begin_of_the_begin ?time }
      OPTIONAL { ?receivedletter__id lssc:was_sent_to/^foaf:focus ?knownLocation__id .
        ?knownLocation__id skos:prefLabel ?knownLocation__prefLabel }

      } ORDER BY COALESCE(STR(?time), CONCAT("9999", ?receivedletter__prefLabel))
    } 
  }
`

export const actorPropertiesFacetResults = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  ?id foaf:focus ?act .

  {
  ?act a ?type__id .
  ?type__id skos:prefLabel ?type__prefLabel .
  BIND (?type__id as ?type_dataProviderUrl)
  }
  UNION
  {
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    VALUES ?_bprop {
      lssc:birthDate
      lssc:approximateBirthDate
      lssc:possibleBirthDate
    }
    ?act ?_bprop ?birthDateTimespan__id .
    ?birthDateTimespan__id skos:prefLabel ?birthDateTimespan__prefLabel .
    OPTIONAL { ?birthDateTimespan__id crm:P82a_begin_of_the_begin ?birthDateTimespan__start }
    OPTIONAL { ?birthDateTimespan__id crm:P82b_end_of_the_end ?birthDateTimespan__end }
  }
  UNION
  { 
    VALUES ?_dprop { 
      lssc:deathDate
      lssc:inferredDeathDate
      lssc:approximateDeathDate
      lssc:possibleDeathDate 
    }
    ?act ?_dprop ?deathDateTimespan__id .
    ?deathDateTimespan__id skos:prefLabel ?deathDateTimespan__prefLabel .
    OPTIONAL { ?deathDateTimespan__id crm:P82a_begin_of_the_begin ?deathDateTimespan__start }
    OPTIONAL { ?deathDateTimespan__id crm:P82b_end_of_the_end ?deathDateTimespan__end }
  }
  UNION
  {
    ?id lssc:out_degree ?numSent
  }
  UNION
  {
    ?id lssc:in_degree ?numReceived
  }
  UNIoN
  {
    ?act lssc:source/skos:prefLabel ?datasource
  }
  UNION
  {
    ?act foaf:gender/skos:prefLabel ?gender
  }
  UNION
  {
    ?act sch:image ?image__id ;
      skos:prefLabel ?image__description ;
      skos:prefLabel ?image__title .
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=600")) as ?image__url)
  }
`

export const letterLinksQuery = `
SELECT DISTINCT ?source ?target 
  ?weight 
  (STR(?weight) AS ?prefLabel)
WHERE {
  VALUES ?id { <ID> }
  {
    ?tie lssc:actor1 ?id ;
      lssc:actor2 ?target
    BIND(?id AS ?source)
  } UNION {
    ?tie lssc:actor1 ?source ; 
      lssc:actor2 ?id
      BIND(?id AS ?target)
  }
  ?tie lssc:num_letters ?weight .

  # filter 'unknown' etc entries
  ?source skos:prefLabel ?source__label . 
  # FILTER (!REGEX(?source__label, 'unknown', 'i'))
  ?target skos:prefLabel ?target__label . 
  # FILTER (!REGEX(?target__label, 'unknown', 'i'))

  # no self links
  FILTER (?source!=?target)
} 
`

//  https://api.triplydb.com/s/Utt3HBx4l
export const peopleEventPlacesQuery = `
SELECT DISTINCT ?id ?lat ?long 
(COUNT(DISTINCT ?person) AS ?instanceCount)
WHERE {
  <FILTER>
  ?person foaf:focus ?act 
  { ?act lssc:created/lssc:was_sent_from ?id }
  UNION 
  { ?act ^lssc:was_addressed_to/lssc:was_sent_to ?id } 
  UNION
  { ?act lssc:was_born_in_location ?id }
  UNION
  { ?act lssc:died_at_location ?id }
  ?id geo:lat ?lat ;
    geo:long ?long .
} GROUP BY ?id ?lat ?long
`

export const peopleRelatedTo = `
  OPTIONAL {
    <FILTER>
    ?related__id foaf:focus ?act 
    { ?act lssc:created/lssc:was_sent_from ?id }
    UNION
    { ?act ^lssc:was_addressed_to/lssc:was_sent_to ?id }
    UNION
    { ?act lssc:was_born_in_location ?id }
    UNION
    { ?act lssc:died_at_location ?id }
    ?related__id skos:prefLabel ?related__prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
  } 
`

export const placePropertiesInfoWindow = `
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

//  TODO: add href to tie
//  query on people facet page tab 'Network'
export const networkLinksQuery = `
SELECT DISTINCT (?actor as ?source) ?target ?weight (str(?weight) as ?prefLabel)
  WHERE {
    <FILTER>
    ?_tie lssc:actor1 ?actor ;
      lssc:actor2 ?target ;
    lssc:num_letters ?weight .
}
`

export const socialSignatureQuery = `
SELECT (?source AS ?id) (?source__label as ?id__label) 
  ?target ?target__label
  ?time_0
WHERE 
{
  VALUES ?node { <ID> }
  {
    ?node foaf:focus/lssc:created ?letter .
    ?letter a lssc:Letter ;
      lssc:was_addressed_to/^foaf:focus ?target .
    ?target skos:prefLabel ?_target__label . 
    FILTER (!REGEX(?_target__label, '(unknown|no_recipient_given)', 'i'))
  
    BIND(?node AS ?source)
  } UNION {
    ?letter lssc:was_addressed_to/^foaf:focus ?node ;
      a lssc:Letter .
    ?source foaf:focus/lssc:created ?letter ;
      skos:prefLabel ?_source__label . 
    FILTER (!REGEX(?_source__label, '(unknown|no_recipient_given)', 'i'))

    BIND(?node AS ?target)
  }
  ?target skos:prefLabel ?target__label .
  ?source skos:prefLabel ?source__label .
  ?letter lssc:has_time/crm:P82a_begin_of_the_begin ?time_0 .
} `

export const networkNodesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
    (COALESCE(?_out, 0)+COALESCE(?_in, 0) AS ?numLetters)
  WHERE {
    VALUES ?class { lssc:ProvidedActor }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
      skos:prefLabel ?_label .
    OPTIONAL { ?id lssc:out_degree ?_out }
    OPTIONAL { ?id lssc:in_degree ?_in }

    BIND(REPLACE(?_label, ',[^,A-ZÜÅÄÖ]+$', '') AS ?prefLabel)
    BIND(CONCAT("../../page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),"/letter-network") AS ?href)
  }
`

export const networkNodesFacetQuery = `
 SELECT DISTINCT ?id ?prefLabel ?class ?href
 (COALESCE(?_out, 0)+COALESCE(?_in, 0) AS ?numLetters)
 WHERE {
   VALUES ?class { lssc:ProvidedActor }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
    skos:prefLabel ?_label .
    OPTIONAL { ?id lssc:out_degree ?_out }
    OPTIONAL { ?id lssc:in_degree ?_in }
    
    BIND(REPLACE(?_label, ',[^,A-ZÜÅÄÖ]+$', '')AS ?prefLabel)
    BIND(CONCAT("../../actors/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),"/letter-network") AS ?href)
  }
`

//  https://api.triplydb.com/s/99nDsr8uW
export const topCorrespondenceQuery = `
SELECT ?id ?from__label ?to__label (xsd:date(?_date) AS ?date) ?type (year(?_date) AS ?year)
WHERE 
{
  VALUES ?id { <ID> }
  {
    ?id foaf:focus/lssc:created ?letter .
    ?letter lssc:was_addressed_to/^foaf:focus ?target ;
      a lssc:Letter .    
    BIND (?id AS ?source)
    BIND ("to" AS ?type)
  } 
  UNION 
  {
    ?letter lssc:was_addressed_to/^foaf:focus ?id ;
      a lssc:Letter .
    ?source foaf:focus/lssc:created ?letter .
    BIND (?id AS ?target)
    BIND ("from" AS ?type)
  }
  
  ?target skos:prefLabel ?to__label .
  ?source skos:prefLabel ?from__label .
  ?letter lssc:has_time/crm:P82a_begin_of_the_begin ?_date .
} 
`

export const letterSourcesQuery = `
SELECT DISTINCT ?id ?received__label ?sent__label (xsd:date(?_date) AS ?date) ?type (year(?_date) AS ?year)
WHERE 
{
  VALUES ?id { <ID> }
  {
    ?id foaf:focus/lssc:created ?letter .
    ?letter lssc:source ?target ;
      a lssc:Letter .    
    BIND (?id AS ?source)
    BIND ("sent" AS ?type)
  } 
  UNION 
  {
    ?letter lssc:was_addressed_to/^foaf:focus ?id ;
      a lssc:Letter ;
      lssc:source ?source .
    # ?source foaf:focus/lssc:created ?letter .
    BIND (?id AS ?target)
    BIND ("received" AS ?type)
  }
  # ?prs foaf:focus/:created [ :has_time/crm:P81a_end_of_the_begin ?time ; :source ?source ] .
  ?target skos:prefLabel ?sent__label .
  ?source skos:prefLabel ?received__label .
  ?letter lssc:has_time/crm:P82a_begin_of_the_begin ?_date .
} 
`

// https://api.triplydb.com/s/l_lnHMact
export const sentReceivedQuery = `
  SELECT DISTINCT (STR(?year) as ?category) 
    (count(distinct ?sent_letter) AS ?sentCount) 
    (count(distinct ?received_letter) AS ?receivedCount) 
    ((?sentCount + ?receivedCount) as ?allCount)
  WHERE {
    BIND(<ID> as ?id)
    ?id foaf:focus ?act .

    {
      ?act lssc:created ?sent_letter .
      ?sent_letter a lssc:Letter ;
                   lssc:has_time/crm:P82a_begin_of_the_begin ?time_0 .
      BIND (year(?time_0) AS ?year)
    } 
    UNION 
    {
      ?received_letter lssc:was_addressed_to ?act ;
                       a lssc:Letter ;
                      lssc:has_time/crm:P82a_begin_of_the_begin ?time_0 .
      BIND (year(?time_0) AS ?year)
    }
    FILTER (BOUND(?year))

    OPTIONAL {
      ?id foaf:focus/lssc:birthDate/crm:P82b_end_of_the_end ?birth_end .
    BIND(year(?birth_end) AS ?birth)
    }
    FILTER ((bound(?birth) && ?birth<?year) || !bound(?birth))

    OPTIONAL {
        ?id foaf:focus/lssc:deathDate/crm:P82b_end_of_the_end ?death_end .
      BIND(year(?death_start) AS ?death)
    }
    FILTER ((bound(?death) && ?year<=?death) || !bound(?death))
  } 
  GROUP BY ?year
  ORDER BY ?year
`
