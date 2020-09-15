// const perspectiveID = 'correspondences'
export const sahaUrl = '"http://demo.seco.tkk.fi/saha/project/resource.shtml?uri="'
export const sahaModel = '"&model=emlo"'

//  http://demo.seco.tkk.fi/saha/project/resource.shtml?uri=http%3A%2F%2Femlo.bodleian.ox.ac.uk%2Fid%2F822ba92b-3ccf-4f1e-b776-e87aca45c866&model=emlo
export const tiePropertiesInstancePage = `
  BIND (URI(STRBEFORE(STR(?id),'__')) AS ?person1)
  BIND (URI(CONCAT("http://emlo.bodleian.ox.ac.uk/id/",STRAFTER(STR(?id),'__'))) AS ?person2)

  BIND(?person1 as ?uri1__id)
  BIND(?person1 as ?uri1__prefLabel)
  BIND(CONCAT(${sahaUrl}, STR(?person1), ${sahaModel}) AS ?uri1__dataProviderUrl)

  ?person1 skos:prefLabel ?prefLabel1__id .
  BIND (?prefLabel1__id as ?prefLabel1__prefLabel)

  ?person2 skos:prefLabel ?prefLabel2__id .
  BIND (?prefLabel2__id as ?prefLabel2__prefLabel)

  BIND (CONCAT(?prefLabel1__id, " <---> ", ?prefLabel2__id) as ?prefLabel)
`
