const perspectiveID = 'places'

export const placePropertiesFacetResults = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(?id as ?uri__dataProviderUrl)
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)

  ?id foaf:focus ?plc .
  {
    VALUES (?type__id ?type__prefLabel) { 
      (crm:E53_Place "Place")
      (lssc:City "City")
      (lssc:Country "Country")
    }
    ?plc a ?type__id .
    BIND (?type__id as ?type_dataProviderUrl)
  }
  UNION
  {
    ?id foaf:focus/crm:P89_falls_within/^foaf:focus ?broader__id .
    FILTER (?broader__id != ?id)
    ?broader__id skos:prefLabel ?broader__prefLabel .
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?broader__dataProviderUrl)
    OPTIONAL {
      ?broader__id foaf:focus/a lssc:Country .
      BIND (?broader__id AS ?country__id)
      ?broader__id skos:prefLabel ?country__prefLabel .
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl)
    }
  }
  UNION
  {
    ?narrower__id foaf:focus/crm:P89_falls_within/^foaf:focus ?id ;
      skos:prefLabel ?narrower__prefLabel .
    FILTER (?narrower__id != ?id)
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?narrower__id), "^.*\\\\/(.+)", "$1")) AS ?narrower__dataProviderUrl)
  }
  UNION
  {
    ?id foaf:focus/sch:image ?image__id ;
      skos:prefLabel ?image__description ;
      skos:prefLabel ?image__title .
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=300")) as ?image__url)
  }
`

// https://api.triplydb.com/s/cBUaK7IGl
export const placePropertiesInstancePage = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(?id as ?uri__dataProviderUrl)
  ?id foaf:focus ?plc .
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
  }
  UNION
  {
    VALUES (?type__id ?type__prefLabel) {
      (crm:E53_Place "Place")
      (lssc:City "City")
      (lssc:Country "Country")
    }
    ?plc a ?type__id .
    BIND (?type__id as ?type_dataProviderUrl)
  }
  UNION
  {
    ?id foaf:focus/crm:P89_falls_within/^foaf:focus ?broader__id .
    FILTER (?broader__id != ?id)
    ?broader__id skos:prefLabel ?broader__prefLabel .
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?broader__dataProviderUrl)
    OPTIONAL {
      ?broader__id foaf:focus/a lssc:Country .
      BIND (?broader__id AS ?country__id)
      ?broader__id skos:prefLabel ?country__prefLabel .
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl)
    }
  }
  UNION
  { ?narrower__id foaf:focus/crm:P89_falls_within/^foaf:focus ?id ;
      skos:prefLabel ?narrower__prefLabel .
    FILTER (?narrower__id != ?id)
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?narrower__id), "^.*\\\\/(.+)", "$1")) AS ?narrower__dataProviderUrl)
  }
  UNIoN
  { ?id foaf:focus/lssc:is_related_to ?external__id .
    OPTIONAL { ?external__id a/skos:prefLabel ?external__classlabel }
    OPTIONAL { ?external__id skos:prefLabel ?external__label }
    BIND(COALESCE(?external__label, ?external__classlabel, ?external__id) AS ?external__prefLabel)
    BIND(?external__id AS ?external__dataProviderUrl)
  }
  UNION
  { ?id foaf:focus/skos:altLabel ?altLabel .
    # FILTER (STR(?prefLabel__prefLabel) != STR(?altLabel)) 
  }
  UNION
  {
    ?id foaf:focus [ geo:lat ?lat ; geo:long ?long ] .
    BIND (CONCAT('lat ', STR(?lat), ', long ',STR(?long)) as ?location__prefLabel)
    BIND (?location__prefLabel AS ?location__id)
  }
  UNION
  {
    ?id foaf:focus/sch:image ?image__id .
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "^https*:", ""), "?width=600")) as ?image__url)
  }
`

export const placeLettersInstancePageQuery = `
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
    ?id foaf:focus/((^crm:P89_falls_within)*) ?sub .
    {
      ?sub ^lssc:was_sent_from ?from__id .
      ?from__id skos:prefLabel ?from__prefLabel .
      BIND(CONCAT("/letters/page/", REPLACE(STR(?from__id), "^.*\\\\/(.+)", "$1")) AS ?from__dataProviderUrl)
    } 
    UNION
    {
      ?sub ^lssc:was_sent_to ?to__id .
      ?to__id skos:prefLabel ?to__prefLabel .
      BIND(CONCAT("/letters/page/", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1")) AS ?to__dataProviderUrl)
    }
    UNION 
    {
      {
        ?sub ^lssc:was_sent_from/^lssc:created ?related__id 
      } 
      UNION 
      {
        ?sub ^lssc:was_sent_from/lssc:was_addressed_to ?related__id 
      }
      FILTER (BOUND(?related__id))
      ?related__id skos:prefLabel ?related__prefLabel .
      BIND(CONCAT("/actors/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
    }
  }
}
`

export const eventPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?event) as ?instanceCount)
  WHERE {
    <FILTER>
    ?id foaf:focus ?plc .
    ?event crm:P7_took_place_at ?plc .
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

//  https://api.triplydb.com/s/MxNLRmBmm
export const sentReceivedByPlaceQuery = `
  SELECT DISTINCT (STR(?year) as ?category)
    (count(distinct ?sent_letter) AS ?sentCount)
    (count(distinct ?received_letter) AS ?receivedCount)
    ((?sentCount + ?receivedCount) as ?allCount)
  WHERE {
    BIND(<ID> as ?id)
    ?id foaf:focus ?plc .
    ?sub crm:P89_falls_within* ?plc .
    {
      ?sent_letter lssc:was_sent_from ?sub ;
        a lssc:Letter ;
        crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time .
    BIND (STR(year(?time)) AS ?year)
    } 
    UNION 
    {
      ?received_letter lssc:was_sent_to ?sub ;
                      a lssc:Letter ;
                      crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time .
    BIND (STR(year(?time)) AS ?year)
    }
    FILTER (BOUND(?year))
  } GROUP BY ?year ORDER BY ?year 
`

export const placeTimeLineQuery = `
SELECT DISTINCT ?id ?to__label ?from__label (xsd:date(?_date) AS ?date) (year(?_date) AS ?year) ?type
WHERE {
  
  BIND( <ID> as ?id)
  ?id foaf:focus ?plc .
  ?sub crm:P89_falls_within* ?plc .
  
  {
    ?letter lssc:was_sent_from ?sub ;
      a lssc:Letter ;
      crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?_date .
    OPTIONAL { 
        ?letter lssc:was_sent_to/skos:prefLabel ?_to .
    }
    BIND ("from" AS ?type)
    BIND (COALESCE(?_to, '<Info missing>') AS ?from__label)
  }
  UNION
  {
    ?letter lssc:was_sent_to ?sub ;
                    a lssc:Letter ;
                    crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?_date .
    OPTIONAL { 
        ?letter lssc:was_sent_from/skos:prefLabel ?_from .
    }
    BIND ("to" AS ?type)
    BIND (COALESCE(?_from, '<Info missing>') AS ?to__label)
  }
  FILTER (BOUND(?_date))
}
`
