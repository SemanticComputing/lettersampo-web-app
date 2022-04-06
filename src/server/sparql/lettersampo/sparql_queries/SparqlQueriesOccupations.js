export const occupationPropertiesInstancePage = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(?id as ?uri__dataProviderUrl)
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
  }
  UNION
  {
    ?id skos:altLabel ?altLabel
  }
  UNION
  { 
    ?actor__id foaf:focus/lssc:occupation ?id .
    ?actor__id skos:prefLabel ?actor__prefLabel .
    BIND(CONCAT("/actors/page/", REPLACE(STR(?actor__id), "^.*\\\\/(.+)", "$1")) AS ?actor__dataProviderUrl) .
  }
  UNION
  { 
    { SELECT ?id ?related__id 
      (CONCAT("/occupations/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
      (CONCAT(?_label, ' (', STR(COUNT(DISTINCT ?act)),')') AS ?related__prefLabel)
      WHERE {
        ?act lssc:occupation ?id ; lssc:occupation ?related__id .
        FILTER (?id!=?related__id)
        ?related__id skos:prefLabel ?_label 
      } GROUP BY ?id ?related__id ?_label ORDER BY DESC(COUNT(DISTINCT ?act))
    }
  }
  UNION
  { 
    ?id lssc:is_related_to ?external__id .
    ?external__id a/skos:prefLabel ?external__prefLabel .
    BIND((REPLACE(STR(?external__id), '^https:' ,'http:')) AS ?external__dataProviderUrl)
  }
`
