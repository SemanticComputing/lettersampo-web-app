import axios from 'axios'
import querystring from 'querystring'

export const runSelectQuery = async ({
  query,
  endpoint,
  resultMapper,
  previousSelections = null, // not in use
  resultFormat,
  useAuth = true
}) => {
  const MIMEtype = resultFormat === 'json'
    ? 'application/sparql-results+json; charset=utf-8'
    : 'text/csv; charset=utf-8'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: MIMEtype,
    Authorization: `Basic c2Vjbzpsb2dvczAz` //  TODO: remove this
  }
  if (useAuth) {
    // headers.Authorization = `Basic ${process.env.SPARQL_ENDPOINT_BASIC_AUTH}` // TODO remove
  }
  console.log('Query')
  query += " LIMIT 1000 " // TODO remove
  console.log(query)
  const q = querystring.stringify({ query })
  console.log("Basic")
  console.log(`Basic ${process.env.SPARQL_ENDPOINT_BASIC_AUTH}`)
  try {
    const response = await axios({
      method: 'post',
      headers: headers,
      url: endpoint,
      data: q
    })
    // console.log(response.data.results)
    if (resultFormat === 'json') {
      const mappedResults = resultMapper(response.data.results.bindings, previousSelections)
      return {
        data: mappedResults,
        sparqlQuery: query
      }
    } else {
      return response.data
    }
  } catch (error) {
    if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
      console.log(`Response status: ${error.response.status}\n`)
      console.log('Response data: \n')
      console.log(error.response.data)
      console.log('\n')
    // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
    // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    // console.log(error.config)
    return {
      data: null,
      sparqlQuery: query
    }
  }
}
