export const sahaUrl = '"http://demo.seco.tkk.fi/saha/project/resource.shtml?uri="'
export const sahaModel = '"&model=ckcc"'

export const sourcePropertiesInstancePage = `
BIND(?id as ?uri__id)
BIND(?id as ?uri__prefLabel)
BIND(?id as ?uri__dataProviderUrl)
{
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
}
UNION
{
  SELECT ?id (COUNT(DISTINCT ?ltr) AS ?numletters) {
    ?ltr lssc:source ?id
  } GROUPBY ?id
}
UNION
{ 
  ?letter__id lssc:source ?id .
  ?letter__id skos:prefLabel ?letter__prefLabel .
  BIND(CONCAT("/letters/page/", REPLACE(STR(?letter__id), "^.*\\\\/(.+)", "$1")) AS ?letter__dataProviderUrl)
}
`
