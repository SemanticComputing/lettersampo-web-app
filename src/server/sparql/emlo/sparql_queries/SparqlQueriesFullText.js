export const fullTextSearchProperties = `
{
    ?id a ?type__id .
    ?type__id rdfs:label|skos:prefLabel ?type__prefLabel_ .
    BIND(STR(?type__prefLabel_) AS ?type__prefLabel)  # ignore language tags
  }
  UNION
  {
    ?id dct:source ?source__id .
    ?source__id skos:prefLabel ?source__prefLabel .
    ?source__id mmm-schema:data_provider_url ?source__dataProviderUrl .
  }
  UNION
  {
    ?id mmm-schema:data_provider_url ?source__id .
    BIND(?source__id as ?source__dataProviderUrl)
    BIND(?source__id as ?source__prefLabel)
  }
  UNION
  {
    {
      ?id a crm:E21_Person 
    } UNION {
      ?d a crm:E74_Group 
    }
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("//perspective1/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id a crm:E53_Place .
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id a eschema:Letter .
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/collections/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  `
