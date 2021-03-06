// const perspectiveID = 'ties'
export const sahaUrl = '"http://demo.seco.tkk.fi/saha/project/resource.shtml?uri="'
export const sahaModel = '"&model=ckcc"'

//  http://demo.seco.tkk.fi/saha/project/resource.shtml?uri=http%3A%2F%2Femlo.bodleian.ox.ac.uk%2Fid%2F822ba92b-3ccf-4f1e-b776-e87aca45c866&model=emlo
//  TODO: add suitable letter properties, e.g. subject etc.
//  TODO: fix node links, e.g. copy and change url in networkNodesQuery
export const tiePropertiesInstancePage = `

?id ckccs:actor1 ?ego__id ;
  ckccs:actor2 ?alter__id ;
  ckccs:num_letters ?num_letters ;
  skos:prefLabel ?prefLabel .

BIND(?ego__id as ?ego__prefLabel)
BIND(?ego__id AS ?ego__dataProviderUrl)

BIND(?alter__id as ?alter__prefLabel)
BIND(?alter__id AS ?alter__dataProviderUrl)

OPTIONAL
{
  ?ego__id skos:prefLabel ?prefLabel1__id .
  BIND (?prefLabel1__id as ?prefLabel1__prefLabel)
  BIND(CONCAT("/actors/page/", REPLACE(STR(?ego__id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel1__dataProviderUrl)
}

OPTIONAL
{
  ?alter__id skos:prefLabel ?prefLabel2__id .
  BIND (?prefLabel2__id as ?prefLabel2__prefLabel)
  BIND(CONCAT("/actors/page/", REPLACE(STR(?alter__id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel2__dataProviderUrl)
} 

OPTIONAL
{
  [] ckccs:actor1|ckccs:actor2 ?ego__id ; ckccs:actor1|ckccs:actor2 ?other__id .
  [] ckccs:actor1|ckccs:actor2 ?alter__id ; ckccs:actor1|ckccs:actor2 ?other__id .
  FILTER (?other__id!=?ego__id && ?other__id!=?alter__id)

  ?other__id skos:prefLabel ?other__prefLabel .
  BIND(CONCAT("/actors/page/", REPLACE(STR(?other__id), "^.*\\\\/(.+)", "$1")) AS ?other__dataProviderUrl)
} 

OPTIONAL
{
  SELECT DISTINCT ?id ?letter__id ?letter__prefLabel ?letter__dataProviderUrl  WHERE {
    ?letter__id ckccs:in_tie ?id ;
                skos:prefLabel ?letter__prefLabel . 

    BIND(CONCAT("/letters/page/", REPLACE(STR(?letter__id), "^.*\\\\/(.+)", "$1")) AS ?letter__dataProviderUrl)

    OPTIONAL { ?letter__id (crm:P4_has_time-span|ckccs:inferredDate|ckccs:approximateDate|ckccs:possibleDate)/crm:P82a_begin_of_the_begin ?letter__timespan }
  } 
  ORDER BY COALESCE(STR(?letter__timespan), CONCAT("9999", ?letter__prefLabel))
}
`

//  https://api.triplydb.com/s/ILhzAxhyr
export const tieLettersQuery = `
SELECT DISTINCT (STR(?year) as ?category) 
    (count(distinct ?sent_letter) AS ?sentCount) 
    (count(distinct ?received_letter) AS ?receivedCount) 
    ((?sentCount + ?receivedCount) as ?allCount)
  WHERE {
  
  BIND(<ID> as ?id)
  
  ?letter ckccs:in_tie ?id ;
          crm:P4_has_time-span/crm:P82a_begin_of_the_begin ?time_0 .
  BIND (year(?time_0) AS ?year)
  FILTER (BOUND(?year))
  
  {
    ?id ckccs:actor1/ckccs:created ?letter .
    BIND (?letter AS ?sent_letter)
  }
  UNION
  {
    ?id ckccs:actor2/ckccs:created ?letter .
    BIND (?letter AS ?received_letter)
  }
  } 
  GROUP BY ?year 
  ORDER BY ?year 
`

export const tieLinksQuery = `
SELECT DISTINCT ?source ?target 
  ?weight (STR(?weight) AS ?prefLabel)
WHERE {
  { VALUES ?id { <ID> }
    VALUES ?class { crm:E21_Person crm:E74_Group }
    ?id a ?class .
  } UNION { 
    VALUES ?_tie { <ID> }
    ?_tie ckccs:actor1|ckccs:actor2 ?id 
  } 
      
  FILTER (BOUND(?id))
  
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
  FILTER (!REGEX(?source__label, '(unknown|no_recipient_given)', 'i'))
  ?target skos:prefLabel ?target__label . 
  FILTER (!REGEX(?target__label, '(unknown|no_recipient_given)', 'i'))

  FILTER (?source!=?target) 
}
`

export const tieNodesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
  WHERE {
    VALUES ?class { crm:E21_Person crm:E74_Group }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
     skos:prefLabel ?_label .
    BIND(REPLACE(?_label, ',[^,A-ZÜÅÄÖ]+$', '')AS ?prefLabel)
    BIND(CONCAT("../../../actors/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),"/letterNetwork") AS ?href)
  }
`
