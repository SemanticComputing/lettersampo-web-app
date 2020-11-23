const perspectiveID = 'actors'

/**
 * TODO: add reverse relation, e.g. members on page http://localhost:8080/en/actors/page/37a1c23b-c19f-4126-a99c-3f264f939f22/table
TODO: simplify property chain: crm:P4_has_time-span|ckccs:inferredDate|ckccs:approximateDate|ckccs:possibleDate
 */

//  http://demo.seco.tkk.fi/saha/project/resource.shtml?uri=http%3A%2F%2Femlo.bodleian.ox.ac.uk%2Fid%2F822ba92b-3ccf-4f1e-b776-e87aca45c866&model=emlo
export const actorPropertiesInstancePage = `

  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(?id as ?uri__dataProviderUrl)

  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)

  {
    ?id a ?type__id .
    ?type__id skos:prefLabel ?type__prefLabel .
    BIND (?type__id as ?type_dataProviderUrl)
  }
  UNION
  {
    ?id foaf:gender ?gender . 
    ?gender skos:prefLabel ?gender__prefLabel .
    BIND(?gender as ?gender__dataProviderUrl)
  }
  UNION 
  { ?id skos:altLabel ?altLabel }
  UNION
  { ?id ckccs:is_related_to ?related__id . 
    OPTIONAL { ?related__id skos:prefLabel ?related__label }
    BIND(COALESCE(?related__label, ?related__id) AS ?related__prefLabel)
    BIND(?related__id AS ?related__dataProviderUrl)
  }
  UNION
  {
    VALUES ?_bprop {
      ckccs:birthDate
      ckccs:approximateBirthDate
      ckccs:possibleBirthDate
    }
    ?id ?_bprop ?birthDateTimespan__id .
    ?birthDateTimespan__id skos:prefLabel ?birthDateTimespan__prefLabel .
    OPTIONAL { ?birthDateTimespan__id crm:P82a_begin_of_the_begin ?birthDateTimespan__start }
    OPTIONAL { ?birthDateTimespan__id crm:P82b_end_of_the_end ?birthDateTimespan__end }
  }
  UNION
  {
    ?id ckccs:was_born_in_location ?birthPlace__id .
    ?birthPlace__id skos:prefLabel ?birthPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?birthPlace__id), "^.*\\\\/(.+)", "$1")) AS ?birthPlace__dataProviderUrl)
  }
  UNION
  {
    VALUES ?_dprop { 
      ckccs:deathDate
      ckccs:inferredDeathDate
      ckccs:approximateDeathDate
      ckccs:possibleDeathDate 
    }
    ?id ?_dprop ?deathDateTimespan__id .
    ?deathDateTimespan__id skos:prefLabel ?deathDateTimespan__prefLabel .
    OPTIONAL { ?deathDateTimespan__id crm:P82a_begin_of_the_begin ?deathDateTimespan__start }
    OPTIONAL { ?deathDateTimespan__id crm:P82b_end_of_the_end ?deathDateTimespan__end }
  }
  UNION
  {
    ?id ckccs:died_at_location ?deathPlace__id .
    ?deathPlace__id skos:prefLabel ?deathPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?deathPlace__id), "^.*\\\\/(.+)", "$1")) AS ?deathPlace__dataProviderUrl)
  }
  UNION
  {
    { ?id ckccs:created/ckccs:was_sent_from ?knownLocation__id }
      UNION
    { ?id ^ckccs:was_addressed_to/ckccs:was_sent_to ?knownLocation__id }
      UNION
    { ?id ckccs:was_in_location ?knownLocation__id }
  ?knownLocation__id skos:prefLabel ?knownLocation__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?knownLocation__id), "^.*\\\\/(.+)", "$1")) AS ?knownLocation__dataProviderUrl)
  }
  UNION
  {
    VALUES (?rel__prop ?rel__label) {
      (ckccs:sibling_of "Sibling of")
      (ckccs:spouse_of "Spouse of")
      (ckccs:parent_of "Parent of")
      (ckccs:acquaintance_of "Acquaintance of")
      (ckccs:collaborated_with "Collaborated with")
      (ckccs:employed "Employed")
      (ckccs:member_of "Member of")
      (ckccs:relative_of "Relative of")
      (ckccs:unspecified_relationship_with "Unspecified relationship with")
      (ckccs:friend_of "Friend of")
      (ckccs:colleague_of "Colleague of")
      (ckccs:was_patron_of "Was patron of")
    }
    ?id ?rel__prop ?rel__id .
    ?rel__id skos:prefLabel ?rel__label2
    BIND (CONCAT(?rel__label, ' ',?rel__label2) AS ?rel__prefLabel)
    BIND(CONCAT("/actors/page/", REPLACE(STR(?rel__id), "^.*\\\\/(.+)", "$1")) AS ?rel__dataProviderUrl)  
  }
  UNION
  {
    VALUES (?rel__prop ?rel__label) {
      (ckccs:member_of "Member:")
    }
    ?rel__id ?rel__prop ?id ;
      skos:prefLabel ?rel__label2
    BIND (CONCAT(?rel__label, ' ',?rel__label2) AS ?rel__prefLabel)
    BIND(CONCAT("/actors/page/", REPLACE(STR(?rel__id), "^.*\\\\/(.+)", "$1")) AS ?rel__dataProviderUrl)  
  }
  UNION
  {
    ?id ckccs:out_degree ?num_sent 
  }
  UNION
  {
    ?id ckccs:in_degree ?num_received
  }
  UNION
  {
    ?id sch:image ?image__id ;
      skos:prefLabel ?image__description ;
      skos:prefLabel ?image__title .
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=600")) as ?image__url)
  }
`

export const actorLettersInstancePageQuery = `
  SELECT * 
  WHERE {
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
  
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
  
    {
      ?id a ?type__id .
      ?type__id skos:prefLabel ?type__prefLabel .
      BIND (?type__id as ?type_dataProviderUrl)
    }
    UNION
    {
      VALUES (?_prop ?txt) {
        (ckccs:betweenness_centrality "Betweenness Centrality")
        (ckccs:clique_number "Clique Number")
        (ckccs:clustering_coefficient "Clustering Coefficient")
        (ckccs:core_number "Core Number")
        (ckccs:eigenvector_centrality "Eigenvector Centrality")
        (ckccs:pagerank "Pagerank Centrality")
        (ckccs:in_degree "Weighted In-Degree")
        (ckccs:out_degree "Weighted Out-Degree")
      }
      ?id ?_prop ?_stat .
      BIND (CONCAT(?txt, ': ', str(?_stat)) AS ?measures)
    }
    UNION
    {
      { SELECT ?id ?alter__id ?alter__count ?alter__prefLabel WHERE {
        { ?alter__id ckccs:actor1 ?id }
        UNION
        { ?alter__id ckccs:actor2 ?id }
        ?alter__id ckccs:num_letters ?alter__count ;
                   skos:prefLabel ?_lbl .
        BIND (CONCAT(?_lbl, ' (', STR(?alter__count), ')') AS ?alter__prefLabel)
        } ORDER BY DESC(?alter__count) }
      FILTER (BOUND(?alter__id))
      BIND(CONCAT("/ties/page/", REPLACE(STR(?alter__id), "^.*\\\\/(.+)", "$1")) AS ?alter__dataProviderUrl)
    }
    UNION
    {
      ?id ckccs:out_degree ?num_sent 
    }
    UNION
    {
      ?id ckccs:in_degree ?num_received
    }
    UNION
    {
      ?id ckccs:num_correspondences ?num_correspondences
    }
    UNION
    { SELECT DISTINCT ?id ?sentletter__id ?sentletter__prefLabel ?sentletter__dataProviderUrl
      WHERE {
        ?id ckccs:created ?sentletter__id .
          ?sentletter__id a ckccs:Letter ;
            skos:prefLabel ?sentletter__prefLabel .
        BIND(CONCAT("/letters/page/", REPLACE(STR(?sentletter__id), "^.*\\\\/(.+)", "$1")) AS ?sentletter__dataProviderUrl)
        OPTIONAL { ?sentletter__id (crm:P4_has_time-span|ckccs:inferredDate|ckccs:approximateDate|ckccs:possibleDate)/crm:P82a_begin_of_the_begin ?time }
      } ORDER BY COALESCE(STR(?time), CONCAT("9999", ?sentletter__prefLabel))
    }
    UNION 
    { SELECT DISTINCT ?id ?receivedletter__id ?receivedletter__prefLabel ?receivedletter__dataProviderUrl
      WHERE {
      ?receivedletter__id
        ckccs:was_addressed_to ?id ;
        a ckccs:Letter ;
        skos:prefLabel ?receivedletter__prefLabel .
      BIND(CONCAT("/letters/page/", REPLACE(STR(?receivedletter__id), "^.*\\\\/(.+)", "$1")) AS ?receivedletter__dataProviderUrl)
      OPTIONAL { ?receivedletter__id (crm:P4_has_time-span|ckccs:inferredDate|ckccs:approximateDate|ckccs:possibleDate)/crm:P82a_begin_of_the_begin ?time }
      } ORDER BY COALESCE(STR(?time), CONCAT("9999", ?receivedletter__prefLabel))
    } 
  }
`

export const actorPropertiesFacetResults =
  `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)

  {
  ?id a ?type__id .
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
      ckccs:birthDate
      ckccs:approximateBirthDate
      ckccs:possibleBirthDate
    }
    ?id ?_bprop ?birthDateTimespan__id .
    ?birthDateTimespan__id skos:prefLabel ?birthDateTimespan__prefLabel .
    OPTIONAL { ?birthDateTimespan__id crm:P82a_begin_of_the_begin ?birthDateTimespan__start }
    OPTIONAL { ?birthDateTimespan__id crm:P82b_end_of_the_end ?birthDateTimespan__end }
  }
  UNION
  {
    ?id ckccs:was_born_in_location ?birthPlace__id .
    ?birthPlace__id skos:prefLabel ?birthPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?birthPlace__id), "^.*\\\\/(.+)", "$1")) AS ?birthPlace__dataProviderUrl)
  }
  UNION
  { 
    VALUES ?_dprop { 
      ckccs:deathDate
      ckccs:inferredDeathDate
      ckccs:approximateDeathDate
      ckccs:possibleDeathDate 
    }
    ?id ?_dprop ?deathDateTimespan__id .
    ?deathDateTimespan__id skos:prefLabel ?deathDateTimespan__prefLabel .
    OPTIONAL { ?deathDateTimespan__id crm:P82a_begin_of_the_begin ?deathDateTimespan__start }
    OPTIONAL { ?deathDateTimespan__id crm:P82b_end_of_the_end ?deathDateTimespan__end }
  }
  UNION
  {
    ?id ckccs:died_at_location ?deathPlace__id .
    ?deathPlace__id skos:prefLabel ?deathPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?deathPlace__id), "^.*\\\\/(.+)", "$1")) AS ?deathPlace__dataProviderUrl)
  }
  UNION
  {
    ?id ckccs:out_degree ?num_sent
  }
  UNION
  {
    ?id ckccs:in_degree ?num_received
  }
  UNION
  {
    ?id foaf:gender ?gender__id . 
    ?gender__id skos:prefLabel ?gender__prefLabel .
    BIND(?gender__id as ?gender__dataProviderUrl)
  }
  UNION
  {
    ?id sch:image ?image__id ;
      skos:prefLabel ?image__description ;
      skos:prefLabel ?image__title .
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=600")) as ?image__url)
  }
`

//  https://api.triplydb.com/s/U-6MA_haY
export const letterLinksQuery = `
SELECT DISTINCT ?source ?target 
  ?weight 
  (STR(?weight) AS ?prefLabel)
WHERE {
  VALUES ?id { <ID> }
  {
    ?tie ckccs:actor1 ?id ;
      ckccs:actor2 ?target
    BIND(?id AS ?source)
  } UNION {
    ?tie ckccs:actor1 ?source ; 
    ckccs:actor2 ?id
    BIND(?id AS ?target)
  }
  ?tie ckccs:num_letters ?weight .

  # filter 'unknown' etc entries
  ?source skos:prefLabel ?source__label . 
  # FILTER (!REGEX(?source__label, 'unknown', 'i'))
  ?target skos:prefLabel ?target__label . 
  # FILTER (!REGEX(?target__label, 'unknown', 'i'))

  # no self links
  FILTER (?source!=?target)
} 
`

//  https://api.triplydb.com/s/lhDOivCiG
export const peopleEventPlacesQuery = `
SELECT DISTINCT ?id ?lat ?long 
(COUNT(DISTINCT ?person) AS ?instanceCount)
WHERE {

  {
    ?person ckccs:created/ckccs:was_sent_from ?id .
  } UNION {
    ?person ^ckccs:was_addressed_to/ckccs:was_sent_to ?id .
  } 
  
  ?id geo:lat ?lat ;
    geo:long ?long .
  
} GROUP BY ?id ?lat ?long
`

//  TODO: add href to tie
//  query on people facet page tab 'Network'
export const networkLinksQuery = `
SELECT DISTINCT (?actor as ?source) ?target ?weight (str(?weight) as ?prefLabel)
  WHERE {
    <FILTER>
    ?_tie ckccs:actor1 ?actor ;
      ckccs:actor2 ?target ;
    ckccs:num_letters ?weight .
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
    ?node ckccs:created ?letter .
    ?letter a ckccs:Letter ;
      ckccs:was_addressed_to ?target .
    ?target skos:prefLabel ?_target__label . 
    FILTER (!REGEX(?_target__label, '(unknown|no_recipient_given)', 'i'))
  
    BIND(?node AS ?source)
  } UNION {
    ?letter ckccs:was_addressed_to ?node ;
      a ckccs:Letter .
    ?source ckccs:created ?letter ;
      skos:prefLabel ?_source__label . 
    FILTER (!REGEX(?_source__label, '(unknown|no_recipient_given)', 'i'))

    BIND(?node AS ?target)
  }
  ?target skos:prefLabel ?target__label .
  ?source skos:prefLabel ?source__label .
  ?letter crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time_0 .
} `

export const networkNodesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
    (COALESCE(?_out, 0)+COALESCE(?_in, 0) AS ?num_letters)
  WHERE {
    VALUES ?class { crm:E21_Person crm:E74_Group }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
      skos:prefLabel ?_label .
    OPTIONAL { ?id ckccs:out_degree ?_out }
    OPTIONAL { ?id ckccs:in_degree ?_in }

    BIND(REPLACE(?_label, ',[^,A-ZÜÅÄÖ]+$', '')AS ?prefLabel)
    BIND(CONCAT("../", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),"/letterNetwork") AS ?href)
  }
`

export const networkNodesFacetQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
    (COALESCE(?_out, 0)+COALESCE(?_in, 0) AS ?num_letters)
  WHERE {
    VALUES ?class { crm:E21_Person crm:E74_Group }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
      skos:prefLabel ?_label .
    OPTIONAL { ?id ckccs:out_degree ?_out }
    OPTIONAL { ?id ckccs:in_degree ?_in }

    BIND(REPLACE(?_label, ',[^,A-ZÜÅÄÖ]+$', '')AS ?prefLabel)
    BIND(CONCAT("../../actors/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),"/letterNetwork") AS ?href)
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
      ?id ckccs:created ?sent_letter .
      ?sent_letter a ckccs:Letter ;
                   crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time_0 .
      BIND (year(?time_0) AS ?year)
    } 
    UNION 
    {
      ?received_letter ckccs:was_addressed_to ?id ;
                       a ckccs:Letter ;
                      crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time_0 .
      BIND (year(?time_0) AS ?year)
    }
    FILTER (BOUND(?year))

    OPTIONAL {
      ?id ckccs:birthDate/crm:P82b_end_of_the_end ?birth_end .
    BIND(year(?birth_end) AS ?birth)
    }
    FILTER ((bound(?birth) && ?birth<?year) || !bound(?birth))

    OPTIONAL {
        ?id ckccs:deathDate/crm:P82b_end_of_the_end ?death_end .
      BIND(year(?death_start) AS ?death)
    }
    FILTER ((bound(?death) && ?year<=?death) || !bound(?death))
  } 
  GROUP BY ?year 
  ORDER BY ?year
`
