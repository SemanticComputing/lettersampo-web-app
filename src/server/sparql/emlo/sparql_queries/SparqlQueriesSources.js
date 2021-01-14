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
  ?letter__id ckccs:source ?id .
  ?letter__id skos:prefLabel ?letter__prefLabel .
  BIND (?letter__id AS ?letter__dataProviderUrl)
}
`
